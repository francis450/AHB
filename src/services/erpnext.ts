import axios from 'axios';

// ERPNext API Configuration
const ERPNEXT_CONFIG = {
  // Always use the full ERPNext URL (no proxy)
  baseURL: import.meta.env.VITE_ERPNEXT_URL || 'https://your-erpnext-site.com',
  apiKey: import.meta.env.VITE_ERPNEXT_API_KEY || '',
  apiSecret: import.meta.env.VITE_ERPNEXT_API_SECRET || '',
};

console.log('ERPNext Config:', {
  isDev: import.meta.env.DEV,
  baseURL: ERPNEXT_CONFIG.baseURL,
  hasApiKey: !!ERPNEXT_CONFIG.apiKey,
  hasApiSecret: !!ERPNEXT_CONFIG.apiSecret
});

// Create axios instance with default configuration
const erpnextAPI = axios.create({
  baseURL: ERPNEXT_CONFIG.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for better error handling
erpnextAPI.interceptors.request.use(
  (config) => {
    // Add authorization header for all requests if credentials are available
    if (ERPNEXT_CONFIG.apiKey && ERPNEXT_CONFIG.apiSecret) {
      config.headers.Authorization = `token ${ERPNEXT_CONFIG.apiKey}:${ERPNEXT_CONFIG.apiSecret}`;
    }
    
    // Log request for debugging
    console.log('ERPNext API Request:', config.method?.toUpperCase(), config.url);
    console.log('Request headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
erpnextAPI.interceptors.response.use(
  (response) => {
    console.log('ERPNext API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('ERPNext API Error:', error);
    
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Network error: Please check your ERPNext server connection and CORS settings.');
    }
    
    if (error.response?.status === 401) {
      throw new Error('Authentication failed: Please check your API key and secret.');
    }
    
    if (error.response?.status === 403) {
      throw new Error('Access forbidden: Please check your API permissions.');
    }
    
    if (error.response?.status === 404) {
      throw new Error('ERPNext endpoint not found: Please check your ERPNext URL.');
    }
    
    throw error;
  }
);

// Types for ERPNext entities
export interface ERPNextWebsiteItem {
  name: string;
  item_name: string;
  item_code: string;
  web_item_name: string;
  description?: string;
  website_image?: string;
  website_warehouse?: string;
  item_group: string;
  brand?: string;
  route?: string;
  published: boolean;
  on_backorder: boolean;
  website_specification?: any;
  web_long_description?: string;
  short_description?: string;
  slideshow?: string;
  thumbnail?: string;
  website_item_groups?: any[];
}

export interface ERPNextBin {
  name: string;
  item_code: string;
  warehouse: string;
  actual_qty: number;
  reserved_qty: number;
  ordered_qty: number;
  indented_qty: number;
  projected_qty: number;
}

export interface ERPNextItemPrice {
  name: string;
  item_code: string;
  price_list: string;
  price_list_rate: number;
  currency: string;
  valid_from?: string;
  valid_upto?: string;
}

export interface ERPNextCustomer {
  name: string;
  customer_name: string;
  customer_type: string;
  customer_group: string;
  territory: string;
  email_id?: string;
  mobile_no?: string;
  address?: string;
}

export interface ERPNextSalesOrder {
  customer: string;
  items: Array<{
    item_code: string;
    item_name: string;
    qty: number;
    rate: number;
    amount: number;
  }>;
  company: string;
  currency: string;
  delivery_date: string;
  customer_address?: string;
  shipping_address_name?: string;
  contact_person?: string;
  contact_mobile?: string;
  contact_email?: string;
  grand_total: number;
}

export interface ERPNextQuotation {
  party_name: string;
  quotation_to: string;
  items: Array<{
    item_code: string;
    item_name: string;
    qty: number;
    rate: number;
    amount: number;
  }>;
  company: string;
  currency: string;
  valid_till: string;
  grand_total: number;
}

// ERPNext API Service Class
export class ERPNextService {
  
  // Fetch all website items/products with prices and stock
  static async getWebsiteItems(filters?: any): Promise<(ERPNextWebsiteItem & { price?: number; actualQty?: number; inStock?: boolean })[]> {
    try {
      const params = new URLSearchParams();
      
      // Default fields for Website Item (removed stock-related fields)
      params.append('fields', JSON.stringify([
        'name', 'item_name', 'item_code', 'web_item_name', 'description',
        'website_image', 'website_warehouse', 'item_group', 'brand', 'route',
        'published', 'on_backorder', 'web_long_description',
        'short_description', 'slideshow', 'thumbnail'
      ]));
      
      // Default filters for published items only
      params.append('filters', JSON.stringify({
        published: 1,
        ...filters
      }));
      
      params.append('limit_page_length', '100');
      
      const response = await erpnextAPI.get(`/api/resource/Website Item?${params.toString()}`);
      const items = response.data.data;
      
      // Get item codes for batch operations
      const itemCodes = items.map((item: any) => item.item_code);
      
      // Fetch prices and stock in parallel
      const [priceMap, stockMap] = await Promise.all([
        this.getItemPrices(itemCodes, 'Website Price'),
        this.getItemsStock(itemCodes)
      ]);
      
      // Combine items with their prices and stock
      return items.map((item: any) => ({
        ...item,
        price: priceMap[item.item_code] || 0,
        actualQty: stockMap[item.item_code]?.actualQty || 0,
        inStock: stockMap[item.item_code]?.inStock || false,
        website_image: this.getAbsoluteImageUrl(item.website_image),
        thumbnail: this.getAbsoluteImageUrl(item.thumbnail),
        slideshow: item.slideshow ? this.getAbsoluteImageUrl(item.slideshow) : undefined,
        web_long_description: this.cleanHtmlContent(item.web_long_description),
        short_description: this.cleanHtmlContent(item.short_description),
        description: this.cleanHtmlContent(item.description)
      }));
    } catch (error) {
      console.error('Error fetching website items from ERPNext:', error);
      throw error;
    }
  }

  // Fetch single website item by item_code with price and stock
  static async getWebsiteItem(itemCode: string): Promise<ERPNextWebsiteItem & { price?: number; actualQty?: number; inStock?: boolean }> {
    try {
      const response = await erpnextAPI.get(`/api/resource/Website Item/${itemCode}`);
      const item = response.data.data;
      
      // Fetch price and stock for this item in parallel
      const [price, stockInfo] = await Promise.all([
        this.getItemPrice(item.item_code, 'Website Price'),
        this.getItemStock(item.item_code)
      ]);
      
      return {
        ...item,
        price,
        actualQty: stockInfo.actualQty,
        inStock: stockInfo.inStock,
        website_image: this.getAbsoluteImageUrl(item.website_image),
        thumbnail: this.getAbsoluteImageUrl(item.thumbnail),
        slideshow: item.slideshow ? this.getAbsoluteImageUrl(item.slideshow) : undefined,
        web_long_description: this.cleanHtmlContent(item.web_long_description),
        short_description: this.cleanHtmlContent(item.short_description),
        description: this.cleanHtmlContent(item.description)
      };
    } catch (error) {
      console.error('Error fetching website item from ERPNext:', error);
      throw error;
    }
  }

  // Create or update customer
  static async createCustomer(customerData: Partial<ERPNextCustomer>): Promise<ERPNextCustomer> {
    try {
      const response = await erpnextAPI.post('/api/resource/Customer', customerData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  }

  // Get customer by email
  static async getCustomerByEmail(email: string): Promise<ERPNextCustomer | null> {
    try {
      const params = new URLSearchParams();
      params.append('filters', JSON.stringify({ email_id: email }));
      
      const response = await erpnextAPI.get(`/api/resource/Customer?${params.toString()}`);
      const customers = response.data.data;
      
      return customers.length > 0 ? customers[0] : null;
    } catch (error) {
      console.error('Error fetching customer:', error);
      return null;
    }
  }

  // Create sales order
  static async createSalesOrder(orderData: Partial<ERPNextSalesOrder>): Promise<any> {
    try {
      const response = await erpnextAPI.post('/api/resource/Sales Order', orderData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating sales order:', error);
      throw error;
    }
  }

  // Create and submit sales order in one operation
  static async createAndSubmitSalesOrder(orderData: Partial<ERPNextSalesOrder>): Promise<any> {
    try {
      // First create the sales order
      const salesOrder = await this.createSalesOrder(orderData);
      
      // Then submit it
      await this.submitSalesOrder(salesOrder.name);
      
      // Return the updated sales order
      return await this.getSalesOrder(salesOrder.name);
    } catch (error) {
      console.error('Error creating and submitting sales order:', error);
      throw error;
    }
  }

  // Get sales order details
  static async getSalesOrder(salesOrderId: string): Promise<any> {
    try {
      const response = await erpnextAPI.get(`/api/resource/Sales Order/${salesOrderId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching sales order:', error);
      throw error;
    }
  }

  // Update sales order status
  static async updateSalesOrderStatus(salesOrderId: string, status: string): Promise<any> {
    try {
      const response = await erpnextAPI.put(`/api/resource/Sales Order/${salesOrderId}`, {
        status: status
      });
      return response.data.data;
    } catch (error) {
      console.error('Error updating sales order status:', error);
      throw error;
    }
  }

  // Submit sales order (to confirm it)
  static async submitSalesOrder(salesOrderId: string): Promise<any> {
    try {
      // ERPNext requires a specific endpoint format for document submission
      const response = await erpnextAPI.put(`/api/resource/Sales Order/${salesOrderId}`, {
        docstatus: 1 // Setting docstatus to 1 submits the document
      });
      return response.data.data;
    } catch (error) {
      console.error('Error submitting sales order:', error);
      
      // If the PUT method doesn't work, try the alternative submit endpoint
      try {
        const submitResponse = await erpnextAPI.post(`/api/method/frappe.client.submit_doc`, {
          doctype: 'Sales Order',
          name: salesOrderId
        });
        return submitResponse.data;
      } catch (alternativeError) {
        console.error('Alternative submit method also failed:', alternativeError);
        throw error; // Throw the original error
      }
    }
  }

  // Create customer address
  static async createAddress(addressData: {
    address_title: string;
    address_line1: string;
    city: string;
    state?: string;
    country?: string;
    address_type: string;
    links: Array<{
      link_doctype: string;
      link_name: string;
    }>;
  }): Promise<any> {
    try {
      const response = await erpnextAPI.post('/api/resource/Address', addressData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating address:', error);
      throw error;
    }
  }

  // Create quotation
  static async createQuotation(quotationData: Partial<ERPNextQuotation>): Promise<any> {
    try {
      const response = await erpnextAPI.post('/api/resource/Quotation', quotationData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating quotation:', error);
      throw error;
    }
  }

  // Get item groups/categories that have published website items
  static async getItemGroups(): Promise<any[]> {
    try {
      // First, get all published website items to see which item groups are actually used
      const websiteItemsParams = new URLSearchParams();
      websiteItemsParams.append('fields', JSON.stringify(['item_group']));
      websiteItemsParams.append('filters', JSON.stringify({ published: 1 }));
      websiteItemsParams.append('limit_page_length', '1000');
      
      const websiteItemsResponse = await erpnextAPI.get(`/api/resource/Website Item?${websiteItemsParams.toString()}`);
      const websiteItems = websiteItemsResponse.data.data;
      
      // Get unique item groups from website items
      const usedItemGroups = [...new Set(websiteItems.map((item: any) => item.item_group))];
      
      if (usedItemGroups.length === 0) {
        return [];
      }
      
      // Now fetch only the item groups that are actually used by website items
      const itemGroupsParams = new URLSearchParams();
      itemGroupsParams.append('fields', JSON.stringify(['name', 'item_group_name', 'parent_item_group', 'image']));
      itemGroupsParams.append('filters', JSON.stringify({ 
        name: ['in', usedItemGroups],
        is_group: 0 
      }));
      
      const itemGroupsResponse = await erpnextAPI.get(`/api/resource/Item Group?${itemGroupsParams.toString()}`);
      const itemGroups = itemGroupsResponse.data.data;
      
      // Transform image URLs for item groups as well
      return itemGroups.map((group: any) => ({
        ...group,
        image: this.getAbsoluteImageUrl(group.image)
      }));
    } catch (error) {
      console.error('Error fetching item groups:', error);
      throw error;
    }
  }

  // Search website items with prices and stock
  static async searchWebsiteItems(query: string): Promise<(ERPNextWebsiteItem & { price?: number; actualQty?: number; inStock?: boolean })[]> {
    try {
      const params = new URLSearchParams();
      params.append('fields', JSON.stringify([
        'name', 'item_name', 'item_code', 'web_item_name', 'description',
        'website_image', 'item_group', 'brand'
      ]));
      
      params.append('filters', JSON.stringify({
        published: 1,
        web_item_name: ['like', `%${query}%`]
      }));
      
      const response = await erpnextAPI.get(`/api/resource/Website Item?${params.toString()}`);
      const items = response.data.data;
      
      // Get item codes for batch operations
      const itemCodes = items.map((item: any) => item.item_code);
      
      // Fetch prices and stock for search results in parallel
      const [priceMap, stockMap] = await Promise.all([
        this.getItemPrices(itemCodes, 'Website Price'),
        this.getItemsStock(itemCodes)
      ]);
      
      // Combine items with their prices and stock
      return items.map((item: any) => ({
        ...item,
        price: priceMap[item.item_code] || 0,
        actualQty: stockMap[item.item_code]?.actualQty || 0,
        inStock: stockMap[item.item_code]?.inStock || false,
        website_image: this.getAbsoluteImageUrl(item.website_image),
        thumbnail: this.getAbsoluteImageUrl(item.thumbnail),
        slideshow: item.slideshow ? this.getAbsoluteImageUrl(item.slideshow) : undefined,
        web_long_description: this.cleanHtmlContent(item.web_long_description),
        short_description: this.cleanHtmlContent(item.short_description),
        description: this.cleanHtmlContent(item.description)
      }));
    } catch (error) {
      console.error('Error searching website items:', error);
      throw error;
    }
  }

  // Get featured products (limit to 5 items for homepage)
  static async getFeaturedWebsiteItems(): Promise<(ERPNextWebsiteItem & { price?: number; actualQty?: number; inStock?: boolean })[]> {
    try {
      const params = new URLSearchParams();
      
      // Default fields for Website Item
      params.append('fields', JSON.stringify([
        'name', 'item_name', 'item_code', 'web_item_name', 'description',
        'website_image', 'website_warehouse', 'item_group', 'brand', 'route',
        'published', 'on_backorder', 'web_long_description',
        'short_description', 'slideshow', 'thumbnail'
      ]));
      
      // Filter for published items only, limit to 5
      params.append('filters', JSON.stringify({
        published: 1
      }));
      
      params.append('limit_page_length', '5');
      params.append('order_by', 'creation desc'); // Get newest items first
      
      const response = await erpnextAPI.get(`/api/resource/Website Item?${params.toString()}`);
      const items = response.data.data;
      
      // Get item codes for batch operations
      const itemCodes = items.map((item: any) => item.item_code);
      
      // Fetch prices and stock in parallel
      const [priceMap, stockMap] = await Promise.all([
        ERPNextService.getItemPrices(itemCodes, 'Website Price'),
        ERPNextService.getItemsStock(itemCodes)
      ]);
      
      // Combine items with their prices and stock
      return items.map((item: any) => ({
        ...item,
        price: priceMap[item.item_code] || 0,
        actualQty: stockMap[item.item_code]?.actualQty || 0,
        inStock: stockMap[item.item_code]?.inStock || false,
        website_image: ERPNextService.getAbsoluteImageUrl(item.website_image),
        thumbnail: ERPNextService.getAbsoluteImageUrl(item.thumbnail),
        slideshow: item.slideshow ? ERPNextService.getAbsoluteImageUrl(item.slideshow) : undefined,
        web_long_description: ERPNextService.cleanHtmlContent(item.web_long_description),
        short_description: ERPNextService.cleanHtmlContent(item.short_description),
        description: ERPNextService.cleanHtmlContent(item.description)
      }));
    } catch (error) {
      console.error('Error fetching featured website items from ERPNext:', error);
      throw error;
    }
  }

  // Get company details
  static async getCompany(): Promise<any> {
    try {
      const response = await erpnextAPI.get('/api/resource/Company');
      const companies = response.data.data;
      return companies.length > 0 ? companies[0] : null;
    } catch (error) {
      console.error('Error fetching company:', error);
      throw error;
    }
  }

  // Fetch item price from Item Price doctype
  static async getItemPrice(itemCode: string, priceList: string = 'Website Price'): Promise<number> {
    try {
      const params = new URLSearchParams();
      params.append('fields', JSON.stringify(['price_list_rate', 'currency']));
      params.append('filters', JSON.stringify({
        item_code: itemCode,
        price_list: priceList,
        selling: 1
      }));
      params.append('limit_page_length', '1');
      
      const response = await erpnextAPI.get(`/api/resource/Item Price?${params.toString()}`);
      const priceData = response.data.data;
      
      return priceData.length > 0 ? priceData[0].price_list_rate : 0;
    } catch (error) {
      console.error('Error fetching item price:', error);
      return 0;
    }
  }

  // Fetch multiple item prices in batch
  static async getItemPrices(itemCodes: string[], priceList: string = 'Website Price'): Promise<Record<string, number>> {
    try {
      const params = new URLSearchParams();
      params.append('fields', JSON.stringify(['item_code', 'price_list_rate']));
      params.append('filters', JSON.stringify({
        item_code: ['in', itemCodes],
        price_list: priceList,
        selling: 1
      }));
      params.append('limit_page_length', '500');
      
      const response = await erpnextAPI.get(`/api/resource/Item Price?${params.toString()}`);
      const priceData = response.data.data;
      
      // Create a map of item_code to price
      const priceMap: Record<string, number> = {};
      priceData.forEach((price: any) => {
        priceMap[price.item_code] = price.price_list_rate || 0;
      });
      
      return priceMap;
    } catch (error) {
      console.error('Error fetching item prices:', error);
      return {};
    }
  }

  // Fetch stock information from Bin doctype
  static async getItemStock(itemCode: string, warehouse?: string): Promise<{ actualQty: number; inStock: boolean }> {
    try {
      const params = new URLSearchParams();
      params.append('fields', JSON.stringify(['actual_qty', 'warehouse']));
      
      const filters: any = { item_code: itemCode };
      if (warehouse) {
        filters.warehouse = warehouse;
      }
      params.append('filters', JSON.stringify(filters));
      
      const response = await erpnextAPI.get(`/api/resource/Bin?${params.toString()}`);
      const stockData = response.data.data;
      
      const totalStock = stockData.reduce((total: number, bin: any) => total + (bin.actual_qty || 0), 0);
      
      return {
        actualQty: totalStock,
        inStock: totalStock > 0
      };
    } catch (error) {
      console.error('Error fetching item stock:', error);
      return { actualQty: 0, inStock: false };
    }
  }

  // Fetch stock for multiple items in batch
  static async getItemsStock(itemCodes: string[], warehouse?: string): Promise<Record<string, { actualQty: number; inStock: boolean }>> {
    try {
      const params = new URLSearchParams();
      params.append('fields', JSON.stringify(['item_code', 'actual_qty', 'warehouse']));
      
      const filters: any = { item_code: ['in', itemCodes] };
      if (warehouse) {
        filters.warehouse = warehouse;
      }
      params.append('filters', JSON.stringify(filters));
      params.append('limit_page_length', '1000');
      
      const response = await erpnextAPI.get(`/api/resource/Bin?${params.toString()}`);
      const stockData = response.data.data;
      
      // Group by item_code and sum actual_qty
      const stockMap: Record<string, { actualQty: number; inStock: boolean }> = {};
      
      stockData.forEach((bin: any) => {
        const itemCode = bin.item_code;
        const qty = bin.actual_qty || 0;
        
        if (!stockMap[itemCode]) {
          stockMap[itemCode] = { actualQty: 0, inStock: false };
        }
        
        stockMap[itemCode].actualQty += qty;
      });
      
      // Set inStock status
      Object.keys(stockMap).forEach(itemCode => {
        stockMap[itemCode].inStock = stockMap[itemCode].actualQty > 0;
      });
      
      // Add entries for items with no stock records
      itemCodes.forEach(itemCode => {
        if (!stockMap[itemCode]) {
          stockMap[itemCode] = { actualQty: 0, inStock: false };
        }
      });
      
      return stockMap;
    } catch (error) {
      console.error('Error fetching items stock:', error);
      return {};
    }
  }

  // Helper method to convert ERPNext file paths to absolute URLs
  static getAbsoluteImageUrl(imagePath?: string): string {
    if (!imagePath) {
      return 'https://via.placeholder.com/400x300?text=No+Image';
    }
    
    // If it's already an absolute URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If it's a relative path starting with /files/, convert to absolute URL
    if (imagePath.startsWith('/files/')) {
      return `${ERPNEXT_CONFIG.baseURL}${imagePath}`;
    }
    
    // If it doesn't start with /files/, add the full path
    if (!imagePath.startsWith('/')) {
      return `${ERPNEXT_CONFIG.baseURL}/files/${imagePath}`;
    }
    
    // For other relative paths, prepend the base URL
    return `${ERPNEXT_CONFIG.baseURL}${imagePath}`;
  }
  
  // Helper method to strip HTML tags and decode HTML entities
  static cleanHtmlContent(htmlContent?: string): string {
    if (!htmlContent) {
      return '';
    }
    
    // Remove HTML tags
    let cleanText = htmlContent.replace(/<[^>]*>/g, '');
    
    // Decode common HTML entities
    cleanText = cleanText
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/&copy;/g, '©')
      .replace(/&reg;/g, '®')
      .replace(/&trade;/g, '™');
    
    // Remove extra whitespace and normalize
    cleanText = cleanText.replace(/\s+/g, ' ').trim();
    
    return cleanText;
  }
}

export default ERPNextService;
