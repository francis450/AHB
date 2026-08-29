import { useEffect, useState } from 'react';
import { getWebsiteProducts } from '../services/products';

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

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x300?text=No+Image';

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const rows = await getWebsiteProducts();
      setProducts(
        rows.slice(0, 8).map((row, index) => ({
          id: row.item_code,
          itemCode: row.item_code,
          name: row.name,
          price: row.price,
          rating: 4.7,
          image: row.image || PLACEHOLDER_IMAGE,
          category: row.category || 'Products',
          description: row.description,
          inStock: row.in_stock,
          stockQuantity: 0,
          bestseller: index < 2,
        })),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load featured products.');
      setProducts(getFallbackFeaturedProducts());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return { products, loading, error, refetch: fetchFeaturedProducts };
};

const getFallbackFeaturedProducts = (): FeaturedProduct[] => [
  {
    id: 'WIG-CAP-001',
    name: 'Premium Wig Cap',
    price: 50,
    rating: 5,
    image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Accessories',
    description: 'High-quality wig cap for secure and comfortable wig application.',
    inStock: true,
    stockQuantity: 0,
    itemCode: 'WIG-CAP-001',
    bestseller: true,
  },
  {
    id: 'LACE-GLUE-001',
    name: 'Professional Lace Glue',
    price: 1500,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/5240834/pexels-photo-5240834.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Adhesives',
    description: 'Strong-hold adhesive for lace front wigs with waterproof formula.',
    inStock: true,
    stockQuantity: 0,
    itemCode: 'LACE-GLUE-001',
    bestseller: true,
  },
];

export default useFeaturedProducts;
