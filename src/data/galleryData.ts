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
    title: '12" Deep Wave Frontal Glueless & Glue Method',
    description: 'Versatile 13x4 frontal installation tutorial showing both glueless and glue application techniques for 12-inch deep wave human hair.',
    thumbnail: '/gallery/images/hair-styling/tutorial-thumb.jpg',
    fullSize: '/gallery/images/hair-styling/tutorial-full.jpg',
    videoUrl: '/gallery/videos/human-hair/12" D.D HUMAN HAIR 13x4 FRONTAL GLUELESS&GLUE.mp4',
    isVertical: true, // Instagram Reels format
    duration: '3:45',
    tags: ['deep-wave', 'frontal', '12-inch', 'glueless', 'glue-method', '13x4'],
    uploadDate: '2025-09-06'
  },
  {
    id: '2',
    type: 'video',
    category: 'wig-installation',
    title: '13x4 Body Wave Glueless & Glue Installation',
    description: 'Complete tutorial for installing 13x4 body wave wigs using both glueless and glue methods for maximum versatility.',
    thumbnail: '/gallery/images/wig-installation/lace-front-thumb.jpg',
    fullSize: '/gallery/images/wig-installation/lace-front-full.jpg',
    videoUrl: '/gallery/videos/human-hair/13x4 BODY WAVE WIGS GLUELESS&GLUE.mp4',
    isVertical: true, // Instagram Reels format
    duration: '4:20',
    tags: ['body-wave', 'glueless', 'glue-method', '13x4', 'lace-front'],
    uploadDate: '2025-09-06'
  },
  {
    id: '3',
    type: 'video',
    category: 'wig-installation',
    title: '14" Deep Wave Frontal Installation',
    description: 'Professional installation of 14-inch deep wave human hair with 13x4 frontal using both glueless and glue techniques.',
    thumbnail: '/gallery/images/treatments/keratin-thumb.jpg',
    fullSize: '/gallery/images/treatments/keratin-full.jpg',
    videoUrl: '/gallery/videos/human-hair/14" D.D HUMAN HAIR 13x4 FRONTAL GLUELESS&GLUE.mp4',
    isVertical: true,
    duration: '3:30',
    tags: ['deep-wave', '14-inch', 'frontal', 'glueless', 'glue-method'],
    uploadDate: '2025-09-06'
  },
  {
    id: '4',
    type: 'video',
    category: 'wig-installation',
    title: '16" Vietnamese Hair 5x5 Closure',
    description: 'Beautiful 16-inch Vietnamese human hair with 5x5 closure installation showcasing natural texture and volume.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/16" 5x5 closure vietnamese hair.mp4',
    isVertical: true,
    duration: '2:45',
    tags: ['vietnamese-hair', '16-inch', '5x5-closure', 'natural-texture'],
    uploadDate: '2025-09-06'
  },
  {
    id: '5',
    type: 'video',
    category: 'wig-installation',
    title: '16" Vietnamese Hair Styling',
    description: 'Styling demonstration with premium 16-inch Vietnamese human hair, showing versatile looks and natural movement.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/16" 5x5 vietnamese hair.mp4',
    isVertical: true,
    duration: '1:50',
    tags: ['vietnamese-hair', '16-inch', 'styling', 'natural-hair'],
    uploadDate: '2025-09-06'
  },
  {
    id: '6',
    type: 'video',
    category: 'wig-installation',
    title: '16" Deep Wave Frontal Glueless & Glue',
    description: 'Complete installation guide for 16-inch deep wave human hair with 13x4 frontal using dual application methods.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/16" D.D HUMAN HAIR 13x4 FRONTAL GLUELESS&GLUE.mp4',
    isVertical: true,
    duration: '4:10',
    tags: ['deep-wave', '16-inch', 'frontal', 'glueless', 'glue-method'],
    uploadDate: '2025-09-06'
  },
  {
    id: '7',
    type: 'video',
    category: 'wig-installation',
    title: '18" Deep Wave Frontal Installation',
    description: 'Long-length 18-inch deep wave human hair installation with 13x4 frontal for glamorous, voluminous looks.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/18" D.D HUMAN HAIR 13X4 FRONTAL.mp4',
    isVertical: true,
    duration: '5:25',
    tags: ['deep-wave', '18-inch', 'long-hair', 'frontal', 'glamorous'],
    uploadDate: '2025-09-06'
  },
  {
    id: '8',
    type: 'video',
    category: 'hair-styling',
    title: '18" Pixie Curly Human Hair Style',
    description: 'Stunning pixie curly human hair styling showcasing texture, volume, and natural curl pattern definition.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/18" HUMAN HAIR PIXIE CURLY .mp4',
    isVertical: true,
    duration: '3:15',
    tags: ['pixie-cut', 'curly', '18-inch', 'texture', 'natural-curls'],
    uploadDate: '2025-09-06'
  },
  {
    id: '9',
    type: 'video',
    category: 'hair-styling',
    title: '18" Pixie Curly Human Hair (Alternative Style)',
    description: 'Another styling approach for 18-inch pixie curly human hair, demonstrating versatile curl manipulation techniques.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/18" HUMAN HAIR PIXIE CURLY.mp4',
    isVertical: true,
    duration: '2:30',
    tags: ['pixie-cut', 'curly', '18-inch', 'styling-variations', 'curl-definition'],
    uploadDate: '2025-09-06'
  },
  {
    id: '10',
    type: 'video',
    category: 'wig-installation',
    title: '20" Deep Wave Frontal Glueless & Glue',
    description: 'Premium 20-inch deep wave human hair installation with 13x4 frontal using both glueless and glue application methods.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/20" D.D HUMAN HAIR 13x4 FRONTAL GLUELESS&GLUE.mp4',
    isVertical: true,
    duration: '6:40',
    tags: ['deep-wave', '20-inch', 'extra-long', 'frontal', 'glueless', 'glue-method'],
    uploadDate: '2025-09-06'
  },
  {
    id: '11',
    type: 'video',
    category: 'hair-styling',
    title: '20" Fumi Curly Human Hair',
    description: 'Beautiful 20-inch Fumi curly human hair styling demonstration showcasing natural African texture and curl patterns.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/20" HUMAN HAIR FUMI CURLY .mp4',
    isVertical: true,
    duration: '4:35',
    tags: ['fumi-curly', '20-inch', 'african-texture', 'natural-curls', 'long-hair'],
    uploadDate: '2025-09-06'
  },
  {
    id: '12',
    type: 'video',
    category: 'wig-installation',
    title: '22" Deep Wave Frontal Installation',
    description: 'Ultra-long 22-inch deep wave human hair with 13x4 frontal installation for dramatic, glamorous looks.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/22" D.D HUMAN HAIR 13x4 FRONTAL GLUELESS&GLUE.mp4',
    isVertical: true,
    duration: '7:20',
    tags: ['deep-wave', '22-inch', 'ultra-long', 'frontal', 'dramatic-length'],
    uploadDate: '2025-09-06'
  },
  {
    id: '13',
    type: 'video',
    category: 'wig-installation',
    title: 'Blended Wigs Installation',
    description: 'Professional blended wig installation technique showing seamless color and texture blending for natural looks.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/BLENDED WIGS .mp4',
    isVertical: true,
    duration: '5:10',
    tags: ['blended-wigs', 'color-blending', 'texture-mixing', 'natural-look'],
    uploadDate: '2025-09-06'
  },
  {
    id: '14',
    type: 'video',
    category: 'wig-installation',
    title: 'Fringe Water Wave Glueless Installation',
    description: 'Trendy fringe water wave wig installation using glueless method for comfortable, natural-looking results.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/FRINGE WATER WAVE GLUELESS.mp4',
    isVertical: true,
    duration: '3:25',
    tags: ['fringe', 'water-wave', 'glueless', 'trendy', 'bangs'],
    uploadDate: '2025-09-06'
  },
  {
    id: '15',
    type: 'video',
    category: 'wig-installation',
    title: '10" Double Drawn Frontal Installation',
    description: 'Professional 10-inch double drawn human hair with 13x4 frontal using both glueless and glue methods.',
    thumbnail: '', // No thumbnail provided - will auto-generate
    fullSize: '', // Not needed for videos without custom thumbnails
    videoUrl: '/gallery/videos/human-hair/10" D.D DOUBLE DRAWN HUMAN HAIR 13x4 FRONTAL GLUELESS&GLUE.mp4',
    isVertical: true,
    duration: '3:55',
    tags: ['double-drawn', '10-inch', 'frontal', 'glueless', 'glue-method'],
    uploadDate: '2025-09-06'
  }
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

// Additional helper functions for enhanced gallery functionality
export const getItemsByDuration = (minDuration?: number, maxDuration?: number): GalleryItem[] => {
  return galleryItems.filter(item => {
    if (item.type !== 'video' || !item.duration) return false;
    
    const durationInSeconds = parseDurationToSeconds(item.duration);
    if (minDuration && durationInSeconds < minDuration) return false;
    if (maxDuration && durationInSeconds > maxDuration) return false;
    
    return true;
  });
};

export const parseDurationToSeconds = (duration: string): number => {
  const parts = duration.split(':').map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1]; // mm:ss format
  }
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2]; // hh:mm:ss format
  }
  return 0;
};

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getVideosByLength = (type: 'short' | 'medium' | 'long'): GalleryItem[] => {
  const videos = galleryItems.filter(item => item.type === 'video' && item.duration);
  
  return videos.filter(video => {
    const seconds = parseDurationToSeconds(video.duration!);
    switch (type) {
      case 'short': return seconds <= 180; // 3 minutes or less
      case 'medium': return seconds > 180 && seconds <= 360; // 3-6 minutes
      case 'long': return seconds > 360; // over 6 minutes
      default: return false;
    }
  });
};

export const getTotalGalleryStats = () => {
  const videos = galleryItems.filter(item => item.type === 'video');
  const images = galleryItems.filter(item => item.type === 'image');
  const categories = [...new Set(galleryItems.map(item => item.category))];
  const tags = [...new Set(galleryItems.flatMap(item => item.tags))];
  
  const totalDuration = videos
    .filter(video => video.duration)
    .reduce((total, video) => total + parseDurationToSeconds(video.duration!), 0);
  
  return {
    totalItems: galleryItems.length,
    videos: videos.length,
    images: images.length,
    categories: categories.length,
    uniqueTags: tags.length,
    totalDuration: formatDuration(totalDuration),
    averageVideoLength: videos.length > 0 ? formatDuration(Math.round(totalDuration / videos.length)) : '0:00'
  };
};