import ERPNextService, { ERPNextCustomer, ERPNextSalesOrder } from './erpnext';
import { CartItem } from '../context/CartContext';

export interface CheckoutData {
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  cartItems: CartItem[];
  totalAmount: number;
  deliveryDate?: string;
  notes?: string;
}

export interface OrderResult {
  success: boolean;
  salesOrderId?: string;
  message: string;
  error?: any;
}

export class CheckoutService {
  
  /**
   * Process checkout and create sales order in ERPNext
   */
  static async processCheckout(checkoutData: CheckoutData): Promise<OrderResult> {
    try {
      // Step 1: Create or get customer
      const customer = await this.createOrGetCustomer(checkoutData.customerInfo);
      
      // Step 2: Prepare sales order data
      const salesOrderData: Partial<ERPNextSalesOrder> = {
        customer: customer.name,
        company: import.meta.env.VITE_DEFAULT_COMPANY || 'Alicia Hairline & Beauty',
        currency: 'KES',
        delivery_date: checkoutData.deliveryDate || this.getDefaultDeliveryDate(),
        contact_email: checkoutData.customerInfo.email,
        contact_mobile: checkoutData.customerInfo.phone,
        items: checkoutData.cartItems.map(item => ({
          item_code: this.getItemCodeFromId(item.id.toString()),
          item_name: item.name,
          qty: item.quantity,
          rate: item.price,
          amount: item.price * item.quantity
        })),
        grand_total: checkoutData.totalAmount
      };

      // Step 3: Create sales order
      const salesOrder = await ERPNextService.createSalesOrder(salesOrderData);
      
      return {
        success: true,
        salesOrderId: salesOrder.name,
        message: `Order ${salesOrder.name} created successfully!`
      };
      
    } catch (error) {
      console.error('Checkout error:', error);
      return {
        success: false,
        message: 'Failed to process order. Please try again.',
        error
      };
    }
  }

  /**
   * Create quotation for potential customers
   */
  static async createQuotation(checkoutData: CheckoutData): Promise<OrderResult> {
    try {
      const quotationData = {
        party_name: checkoutData.customerInfo.name,
        quotation_to: 'Customer',
        company: import.meta.env.VITE_DEFAULT_COMPANY || 'Alicia Hairline & Beauty',
        currency: 'KES',
        valid_till: this.getQuotationValidTill(),
        items: checkoutData.cartItems.map(item => ({
          item_code: this.getItemCodeFromId(item.id.toString()),
          item_name: item.name,
          qty: item.quantity,
          rate: item.price,
          amount: item.price * item.quantity
        })),
        grand_total: checkoutData.totalAmount
      };

      const quotation = await ERPNextService.createQuotation(quotationData);
      
      return {
        success: true,
        salesOrderId: quotation.name,
        message: `Quotation ${quotation.name} created successfully!`
      };
      
    } catch (error) {
      console.error('Quotation error:', error);
      return {
        success: false,
        message: 'Failed to create quotation. Please try again.',
        error
      };
    }
  }

  /**
   * Create or get existing customer
   */
  private static async createOrGetCustomer(customerInfo: CheckoutData['customerInfo']): Promise<ERPNextCustomer> {
    try {
      // Try to find existing customer by email
      const existingCustomer = await ERPNextService.getCustomerByEmail(customerInfo.email);
      
      if (existingCustomer) {
        return existingCustomer;
      }

      // Create new customer
      const customerData: Partial<ERPNextCustomer> = {
        customer_name: customerInfo.name,
        customer_type: 'Individual',
        customer_group: 'Individual',
        territory: 'Kenya',
        email_id: customerInfo.email,
        mobile_no: customerInfo.phone,
        // You can create a custom address field or handle addresses separately
      };

      return await ERPNextService.createCustomer(customerData);
      
    } catch (error) {
      console.error('Error handling customer:', error);
      throw error;
    }
  }

  /**
   * Convert product ID to ERPNext item code
   * This assumes your product IDs are either item codes or can be mapped to them
   */
  private static getItemCodeFromId(productId: string): string {
    // If your product IDs are already item codes, return as is
    // Otherwise, implement mapping logic here
    return productId;
  }

  /**
   * Get default delivery date (7 days from now)
   */
  private static getDefaultDeliveryDate(): string {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toISOString().split('T')[0];
  }

  /**
   * Get quotation validity (30 days from now)
   */
  private static getQuotationValidTill(): string {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  }

  /**
   * Validate stock availability before checkout
   */
  static async validateStock(cartItems: CartItem[]): Promise<{ valid: boolean; issues: string[] }> {
    const issues: string[] = [];
    
    try {
      for (const item of cartItems) {
        const itemCode = this.getItemCodeFromId(item.id.toString());
        const stockQty = await ERPNextService.getItemStock(itemCode);
        
        if (stockQty < item.quantity) {
          issues.push(`${item.name}: Only ${stockQty} items available, but ${item.quantity} requested`);
        }
      }
      
      return {
        valid: issues.length === 0,
        issues
      };
      
    } catch (error) {
      console.error('Stock validation error:', error);
      return {
        valid: false,
        issues: ['Unable to validate stock. Please try again.']
      };
    }
  }
}

export default CheckoutService;
