import { useState, useEffect } from 'react';
import ERPNextService, { ERPNextWebsiteItem } from '../services/erpnext';

export interface FeaturedProduct {
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

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transformWebsiteItem = (item: ERPNextWebsiteItem & { price?: number; actualQty?: number; inStock?: boolean }, index: number): FeaturedProduct => {
    return {
      id: item.item_code,
      name: item.web_item_name || item.item_name,
      price: item.price || 0,
      rating: 4.5 + (Math.random() * 0.5), // Random rating between 4.5-5.0
      image: item.website_image || item.thumbnail || 'https://via.placeholder.com/400x300?text=No+Image',
      category: item.item_group || 'Uncategorized',
      description: item.short_description || item.description || '',
      inStock: true, // Always mark as in stock to allow ordering
      stockQuantity: item.actualQty || 0,
      itemCode: item.item_code,
      bestseller: index < 2 // Mark first 2 items as bestsellers
    };
  };

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if ERPNext is configured
      if (!import.meta.env.VITE_ERPNEXT_URL || 
          !import.meta.env.VITE_ERPNEXT_API_KEY || 
          !import.meta.env.VITE_ERPNEXT_API_SECRET) {
        console.warn('ERPNext not configured, using fallback featured products');
        setProducts(getFallbackFeaturedProducts());
        return;
      }
      
      const items = await ERPNextService.getFeaturedWebsiteItems();
      const transformedProducts = items.map((item, index) => transformWebsiteItem(item, index));
      setProducts(transformedProducts);
    } catch (err: any) {
      console.error('Error fetching featured products:', err);
      
      // Set user-friendly error message
      if (err.message?.includes('Network error')) {
        setError('Unable to connect to product database. Using offline catalog.');
      } else if (err.message?.includes('Authentication failed')) {
        setError('Product database authentication error. Using offline catalog.');
      } else {
        setError('Unable to load featured products. Using offline catalog.');
      }
      
      // Fallback to static data
      setProducts(getFallbackFeaturedProducts());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchFeaturedProducts
  };
};

// Fallback featured products in case ERPNext is not available
const getFallbackFeaturedProducts = (): FeaturedProduct[] => [
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
    itemCode: "LACE-GLUE-001",
    bestseller: true
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
  },
  {
    id: "5",
    name: "Hair Growth Oil",
    price: 800,
    originalPrice: 1000,
    rating: 4.7,
    image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Hair Care",
    description: "Natural hair growth oil with essential vitamins and nutrients.",
    inStock: true,
    stockQuantity: 12,
    itemCode: "GROWTH-OIL-001"
  }
];

export default useFeaturedProducts;
