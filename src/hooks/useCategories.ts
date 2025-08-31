import { useState, useEffect } from 'react';
import ERPNextService from '../services/erpnext';

export interface Category {
  id: string;
  name: string;
  displayName: string;
  image?: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const itemGroups = await ERPNextService.getItemGroups();
      
      // Transform ERPNext item groups to categories
      const transformedCategories: Category[] = [
        { id: 'all', name: 'all', displayName: 'All Products' },
        ...itemGroups.map(group => ({
          id: group.name.toLowerCase().replace(/\s+/g, '_'),
          name: group.name,
          displayName: group.item_group_name || group.name,
          image: group.image
        }))
      ];
      
      setCategories(transformedCategories);
    } catch (err) {
      setError('Failed to fetch categories from ERPNext');
      console.error('Error fetching categories:', err);
      
      // Fallback to static categories
      setCategories(getFallbackCategories());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refetchCategories: fetchCategories
  };
};

// Fallback categories
const getFallbackCategories = (): Category[] => [
  { id: 'all', name: 'all', displayName: 'All Products' },
  { id: 'wigs', name: 'Wigs', displayName: 'Wig Caps' },
  { id: 'adhesives', name: 'Adhesives', displayName: 'Lace Glue' },
  { id: 'haircare', name: 'Hair Care', displayName: 'Hair Care' },
  { id: 'styling', name: 'Styling', displayName: 'Styling Products' },
  { id: 'tools', name: 'Tools', displayName: 'Tools & Accessories' }
];

export default useCategories;
