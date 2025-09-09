import { useState, useEffect } from 'react';
import ERPNextService, { ERPNextWebsiteItem } from '../services/erpnext';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  category: string;
  description?: string;
  inStock: boolean;
  stockQuantity: number;
  itemCode: string;
  bestseller?: boolean;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transformWebsiteItem = (item: ERPNextWebsiteItem & { price?: number; actualQty?: number; inStock?: boolean }): Product => {
    return {
      id: item.item_code,
      name: item.web_item_name || item.item_name,
      price: item.price || 0,
      rating: 4.5, // You can implement a rating system in ERPNext custom fields
      image: item.website_image || item.thumbnail || 'https://via.placeholder.com/400x300?text=No+Image',
      category: item.item_group || 'Uncategorized',
      description: item.short_description || item.short_description || item.description || '',
      inStock: true, // Always mark as in stock to allow ordering
      stockQuantity: item.actualQty || 0,
      itemCode: item.item_code,
      bestseller: false // You can implement this logic based on sales data
    };
  };

  const fetchProducts = async (filters?: any) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if ERPNext is configured
      if (!import.meta.env.VITE_ERPNEXT_URL || 
          !import.meta.env.VITE_ERPNEXT_API_KEY || 
          !import.meta.env.VITE_ERPNEXT_API_SECRET) {
        console.warn('ERPNext not configured, using fallback products');
        setProducts(getFallbackProducts());
        return;
      }
      
      const items = await ERPNextService.getWebsiteItems(filters);
      const transformedProducts = items.map(transformWebsiteItem);
      setProducts(transformedProducts);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      
      // Set user-friendly error message
      if (err.message?.includes('Network error')) {
        setError('Unable to connect to product database. Using offline catalog.');
      } else if (err.message?.includes('Authentication failed')) {
        setError('Product database authentication error. Using offline catalog.');
      } else {
        setError('Unable to load products. Using offline catalog.');
      }
      
      // Fallback to static data
      setProducts(getFallbackProducts());
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const items = await ERPNextService.searchWebsiteItems(query);
      const transformedProducts = items.map(transformWebsiteItem);
      setProducts(transformedProducts);
    } catch (err) {
      setError('Failed to search products');
      console.error('Error searching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      const filters = category !== 'all' ? { item_group: category } : {};
      const items = await ERPNextService.getWebsiteItems(filters);
      const transformedProducts = items.map(transformWebsiteItem);
      setProducts(transformedProducts);
    } catch (err) {
      setError('Failed to fetch products by category');
      console.error('Error fetching products by category:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    searchProducts,
    getProductsByCategory
  };
};

// Fallback products in case ERPNext is not available
const getFallbackProducts = (): Product[] => [
  {
    id: "1",
    name: "Premium Wig Cap",
    price: 50,
    originalPrice: 80,
    rating: 5,
    image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Accessories",
    description: "High-quality wig cap for secure and comfortable wig application.",
    inStock: true,
    stockQuantity: 25,
    itemCode: "WIG-CAP-001",
    bestseller: true
  },
  {
    id: "2",
    name: "Professional Lace Glue",
    price: 1500,
    rating: 4.8,
    image: "https://images.pexels.com/photos/5240834/pexels-photo-5240834.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Adhesives",
    description: "Strong-hold adhesive for lace front wigs with waterproof formula.",
    inStock: true,
    stockQuantity: 15,
    itemCode: "LACE-GLUE-001"
  },
  {
    id: "3",
    name: "Nourishing Hair Serum",
    price: 400,
    originalPrice: 600,
    rating: 4.9,
    image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Hair Care",
    description: "Intensive nourishing serum for damaged and dry hair.",
    inStock: true,
    stockQuantity: 30,
    itemCode: "SERUM-001"
  },
  {
    id: "4",
    name: "Luxury Shampoo Set",
    price: 1200,
    rating: 5,
    image: "https://images.pexels.com/photos/4465830/pexels-photo-4465830.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Hair Care",
    description: "Professional grade shampoo and conditioner set.",
    inStock: true,
    stockQuantity: 20,
    itemCode: "SHAMPOO-SET-001"
  }
];

export default useProducts;
