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
  tags: string[];
  uploadDate: string;
}

// Gallery data configuration
//
// IMPORTANT: only list items here whose video/image files actually exist under
// public/gallery/. Referencing a file that was never uploaded renders as a
// broken/unplayable video on the live site (see public/gallery/videos/PLACEHOLDER_FILES.md
// and public/gallery/PLACEHOLDER_FILES.md for what's still outstanding).
export const galleryItems: GalleryItem[] = [
  // NOTE: '13x4 BODY WAVE WIGS GLUELESS&GLUE.mp4' (formerly id '3') was removed —
  // the file itself is corrupted (fails to decode even in real Chrome/Edge, not
  // just a codec-support quirk) and needs to be re-exported/re-uploaded by the
  // client before it can go back in the gallery.
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
