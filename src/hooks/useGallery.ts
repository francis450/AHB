import { useState, useEffect } from 'react';
import { GalleryService, ERPNextGalleryItem, GalleryCategory } from '../services/gallery';

export const useGallery = () => {
  const [items, setItems] = useState<ERPNextGalleryItem[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [galleryItems, galleryCategories] = await Promise.all([
          GalleryService.getGalleryItems(),
          GalleryService.getGalleryCategories()
        ]);
        
        setItems(galleryItems);
        setCategories(galleryCategories);
      } catch (err) {
        console.error('Error fetching gallery data:', err);
        setError('Failed to load gallery content');
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [galleryItems, galleryCategories] = await Promise.all([
        GalleryService.getGalleryItems(),
        GalleryService.getGalleryCategories()
      ]);
      
      setItems(galleryItems);
      setCategories(galleryCategories);
    } catch (err) {
      console.error('Error refetching gallery data:', err);
      setError('Failed to refresh gallery content');
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    categories,
    loading,
    error,
    refetch
  };
};

export const useGalleryFilters = (items: ERPNextGalleryItem[], categories: GalleryCategory[]) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item => {
    // Filter by category/type
    const matchesFilter = 
      activeFilter === 'all' ||
      activeFilter === 'images' && item.media_type === 'Image' ||
      activeFilter === 'videos' && item.media_type === 'Video' ||
      item.category.toLowerCase().replace(/\s+/g, '-') === activeFilter;

    // Filter by search query
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Generate filter options
  const filters = [
    { id: 'all', name: 'All Media' },
    { id: 'images', name: 'Photos' },
    { id: 'videos', name: 'Videos' },
    ...categories.map(cat => ({
      id: cat.name,
      name: cat.category_name
    }))
  ];

  return {
    activeFilter,
    setActiveFilter,
    searchQuery,
    setSearchQuery,
    filteredItems,
    filters
  };
};

export const useFeaturedGallery = (limit: number = 6) => {
  const [featuredItems, setFeaturedItems] = useState<ERPNextGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const items = await GalleryService.getFeaturedGalleryItems(limit);
        setFeaturedItems(items);
      } catch (err) {
        console.error('Error fetching featured gallery items:', err);
        setError('Failed to load featured gallery content');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, [limit]);

  return {
    featuredItems,
    loading,
    error
  };
};
