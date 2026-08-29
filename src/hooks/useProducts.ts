import { useCallback, useEffect, useMemo, useState } from 'react';
import { getWebsiteProducts, WebsiteProduct } from '../services/products';

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

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x300?text=No+Image';

const toProduct = (row: WebsiteProduct): Product => ({
  id: row.item_code,
  itemCode: row.item_code,
  name: row.name,
  price: row.price,
  rating: 4.5,
  image: row.image || PLACEHOLDER_IMAGE,
  category: row.category || 'Products',
  description: row.description,
  inStock: row.in_stock,
  stockQuantity: 0,
  bestseller: false,
});

export const useProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const rows = await getWebsiteProducts();
      setAllProducts(rows.map(toProduct));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load products.');
      setAllProducts(getFallbackProducts());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allProducts.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        (product.description || '').toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [allProducts, query, category]);

  const searchProducts = useCallback(async (value: string) => setQuery(value), []);
  const getProductsByCategory = useCallback(async (value: string) => setCategory(value), []);

  return {
    products,
    allProducts,
    loading,
    error,
    fetchProducts,
    searchProducts,
    getProductsByCategory,
  };
};

// Shown only if the products API is unreachable.
const getFallbackProducts = (): Product[] => [
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
  },
];

export default useProducts;
