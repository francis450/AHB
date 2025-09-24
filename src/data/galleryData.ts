export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  category: 'hair-styling' | 'wig-installation' | 'treatments' | 'before-after';
  title: string;
  description: string;
  thumbnail: string; // For images: always required. For videos: optional (will auto-generate if missing)
  fullSize: string;
  videoUrl?: string;
  isVertical?: boolean; // for videos - true if portrait/vertical orientation
  duration?: string; // video duration in human readable format
  tags: string[];
  uploadDate: string;
}

// Gallery data configuration
export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    type: 'video',
    category: 'wig-installation',
    title: '16" Vietnamese Hair 5x5 Closure',
    description: 'Beautiful 16-inch Vietnamese human hair with 5x5 closure installation showcasing natural texture and volume.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/16" 5x5 closure vietnamese hair.mp4',
    isVertical: true,
    tags: ['vietnamese-hair', '16-inch', '5x5-closure', 'natural-texture'],
    uploadDate: '2025-09-06'
  },
  {
    id: '2',
    type: 'video',
    category: 'wig-installation',
    title: '12" Deep Wave Frontal Glueless & Glue Method',
    description: 'Versatile 13x4 frontal installation tutorial showing both glueless and glue application techniques for 12-inch deep wave human hair.',
    thumbnail: '/gallery/images/hair-styling/tutorial-thumb.jpg',
    fullSize: '/gallery/images/hair-styling/tutorial-full.jpg',
    videoUrl: '/gallery/videos/human-hair/12" D.D HUMAN HAIR 13x4 FRONTAL GLUELESS&GLUE.mp4',
    isVertical: true, // Assuming this is also Instagram Reels format
    tags: ['deep-wave', 'frontal', '12-inch', 'glueless', 'glue-method', '13x4'],
    uploadDate: '2025-09-06'
  },
  {
    id: '3',
    type: 'video',
    category: 'wig-installation',
    title: '13x4 Body Wave Glueless & Glue Installation',
    description: 'Complete tutorial for installing 13x4 body wave wigs using both glueless and glue methods for maximum versatility.',
    thumbnail: '/gallery/images/wig-installation/lace-front-thumb.jpg',
    fullSize: '/gallery/images/wig-installation/lace-front-full.jpg',
    videoUrl: '/gallery/videos/human-hair/13x4 BODY WAVE WIGS GLUELESS&GLUE.mp4',
    isVertical: true, // Assuming Instagram Reels format
    tags: ['body-wave', 'glueless', 'glue-method', '13x4', 'lace-front'],
    uploadDate: '2025-09-06'
  },
  {
    id: '4',
    type: 'video',
    category: 'wig-installation',
    title: '14" Deep Wave Frontal Installation',
    description: 'Professional installation of 14-inch deep wave human hair with 13x4 frontal using both glueless and glue techniques.',
    thumbnail: '/gallery/images/treatments/keratin-thumb.jpg',
    fullSize: '/gallery/images/treatments/keratin-full.jpg',
    videoUrl: '/gallery/videos/human-hair/14" D.D HUMAN HAIR 13x4 FRONTAL GLUELESS&GLUE.mp4',
    isVertical: true,
    tags: ['deep-wave', '14-inch', 'frontal', 'glueless', 'glue-method'],
    uploadDate: '2025-09-06'
  },
  {
    id: '5',
    type: 'video',
    category: 'wig-installation',
    title: '10" Double Drawn Frontal Installation',
    description: 'Professional 10-inch double drawn human hair with 13x4 frontal using both glueless and glue methods.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/10" D.D DOUBLE DRAWN HUMAN HAIR 13x4 FRONTAL GLUELESS&GLUE.mp4',
    isVertical: true,
    tags: ['double-drawn', '10-inch', 'frontal', 'glueless', 'glue-method'],
    uploadDate: '2025-09-06'
  },
  {
    id: '6',
    type: 'video',
    category: 'wig-installation',
    title: '16" Vietnamese Hair Styling',
    description: 'Styling demonstration with premium 16-inch Vietnamese human hair, showing versatile looks and natural movement.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/16" 5x5 vietnamese hair.mp4',
    isVertical: true,
    tags: ['vietnamese-hair', '16-inch', 'styling', 'natural-hair'],
    uploadDate: '2025-09-06'
  },
  {
    id: '7',
    type: 'video',
    category: 'wig-installation',
    title: '16" Deep Wave Frontal Glueless & Glue',
    description: 'Complete installation guide for 16-inch deep wave human hair with 13x4 frontal using dual application methods.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/16" D.D HUMAN HAIR 13x4 FRONTAL GLUELESS&GLUE.mp4',
    isVertical: true,
    tags: ['deep-wave', '16-inch', 'frontal', 'glueless', 'glue-method'],
    uploadDate: '2025-09-06'
  },
  {
    id: '8',
    type: 'video',
    category: 'wig-installation',
    title: '18" Deep Wave Frontal Installation',
    description: 'Long-length 18-inch deep wave human hair installation with 13x4 frontal for glamorous, voluminous looks.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/18" D.D HUMAN HAIR 13X4 FRONTAL.mp4',
    isVertical: true,
    tags: ['deep-wave', '18-inch', 'long-hair', 'frontal', 'glamorous'],
    uploadDate: '2025-09-06'
  },
  {
    id: '9',
    type: 'video',
    category: 'hair-styling',
    title: '18" Pixie Curly Human Hair Style',
    description: 'Stunning pixie curly human hair styling showcasing texture, volume, and natural curl pattern definition.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/18" HUMAN HAIR PIXIE CURLY .mp4',
    isVertical: true,
    tags: ['pixie-cut', 'curly', '18-inch', 'texture', 'natural-curls'],
    uploadDate: '2025-09-06'
  },
  {
    id: '10',
    type: 'video',
    category: 'hair-styling',
    title: '18" Pixie Curly Human Hair (Alternative Style)',
    description: 'Another styling approach for 18-inch pixie curly human hair, demonstrating versatile curl manipulation techniques.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/18" HUMAN HAIR PIXIE CURLY.mp4',
    isVertical: true,
    tags: ['pixie-cut', 'curly', '18-inch', 'styling-variations', 'curl-definition'],
    uploadDate: '2025-09-06'
  },
  {
    id: '11',
    type: 'video',
    category: 'wig-installation',
    title: '20" Deep Wave Frontal Glueless & Glue',
    description: 'Premium 20-inch deep wave human hair installation with 13x4 frontal using both glueless and glue application methods.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/20" D.D HUMAN HAIR 13x4 FRONTAL GLUELESS&GLUE.mp4',
    isVertical: true,
    tags: ['deep-wave', '20-inch', 'extra-long', 'frontal', 'glueless', 'glue-method'],
    uploadDate: '2025-09-06'
  },
  {
    id: '12',
    type: 'video',
    category: 'hair-styling',
    title: '20" Fumi Curly Human Hair',
    description: 'Beautiful 20-inch Fumi curly human hair styling demonstration showcasing natural African texture and curl patterns.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/20" HUMAN HAIR FUMI CURLY .mp4',
    isVertical: true,
    tags: ['fumi-curly', '20-inch', 'african-texture', 'natural-curls', 'long-hair'],
    uploadDate: '2025-09-06'
  },
  {
    id: '13',
    type: 'video',
    category: 'wig-installation',
    title: '22" Deep Wave Frontal Installation',
    description: 'Ultra-long 22-inch deep wave human hair with 13x4 frontal installation for dramatic, glamorous looks.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/22" D.D HUMAN HAIR 13x4 FRONTAL GLUELESS&GLUE.mp4',
    isVertical: true,
    tags: ['deep-wave', '22-inch', 'ultra-long', 'frontal', 'dramatic-length'],
    uploadDate: '2025-09-06'
  },
  {
    id: '14',
    type: 'video',
    category: 'wig-installation',
    title: 'Blended Wigs Installation',
    description: 'Professional blended wig installation technique showing seamless color and texture blending for natural looks.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/BLENDED WIGS .mp4',
    isVertical: true,
    tags: ['blended-wigs', 'color-blending', 'texture-mixing', 'natural-look'],
    uploadDate: '2025-09-06'
  },
  {
    id: '15',
    type: 'video',
    category: 'wig-installation',
    title: 'Fringe Water Wave Glueless Installation',
    description: 'Trendy fringe water wave wig installation using glueless method for comfortable, natural-looking results.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/FRINGE WATER WAVE GLUELESS.mp4',
    isVertical: true,
    tags: ['fringe', 'water-wave', 'glueless', 'trendy', 'bangs'],
    uploadDate: '2025-09-06'
  },
];

// Helper functions for gallery management
export const getItemsByCategory = (category: string): GalleryItem[] => {
  if (category === 'all') return galleryItems;
  if (category === 'images') return galleryItems.filter(item => item.type === 'image');
  if (category === 'videos') return galleryItems.filter(item => item.type === 'video');
  return galleryItems.filter(item => item.category === category);
};

export const getItemsByTag = (tag: string): GalleryItem[] => {
  return galleryItems.filter(item => item.tags.includes(tag));
};

export const getRecentItems = (count: number = 6): GalleryItem[] => {
  return [...galleryItems]
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, count);
};

export const hasValidThumbnail = (item: GalleryItem): boolean => {
  return !!(item.thumbnail && item.thumbnail !== '' && !item.thumbnail.includes('placeholder'));
};

export const needsAutoThumbnail = (item: GalleryItem): boolean => {
  return item.type === 'video' && !hasValidThumbnail(item);
};
