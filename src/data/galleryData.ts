export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  category: 'wigs' | 'hair-styling' | 'wig-installation' | 'treatments' | 'before-after';
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
// broken image/unplayable video on the live site (see public/gallery/PLACEHOLDER_FILES.md).
//
// The client's phone videos would not play on the live site, so the gallery now
// shows photos of the wigs in stock instead — clients browse these (e.g. while
// leaving a review) to see what's available. Update the price in `description`
// whenever the client revises it, and add/remove entries as stock changes. Each
// `thumbnail`/`fullSize` path must point at a real file in public/gallery/wigs/.
export const galleryItems: GalleryItem[] = [
  {
    id: 'wig-12-water-wave',
    type: 'image',
    category: 'wigs',
    title: '12" Water Wave',
    description: 'Ksh 8,500 · Natural black water wave lace wig, shoulder length.',
    thumbnail: '/gallery/wigs/12in-water-wave.jpg',
    fullSize: '/gallery/wigs/12in-water-wave.jpg',
    tags: ['water-wave', '12-inch', 'lace-front', 'natural-black'],
    uploadDate: '2026-08-29'
  },
  {
    id: 'wig-14-fringe',
    type: 'image',
    category: 'wigs',
    title: '14" Fringe',
    description: 'Ksh 8,500 · Burgundy curly fringe wig — no lace, ready to wear.',
    thumbnail: '/gallery/wigs/14in-fringe.jpg',
    fullSize: '/gallery/wigs/14in-fringe.jpg',
    tags: ['fringe', 'bangs', '14-inch', 'burgundy', 'curly'],
    uploadDate: '2026-08-29'
  },
  {
    id: 'wig-18-pixie-curly-burgundy',
    type: 'image',
    category: 'wigs',
    title: '18" Pixie Curly (Burgundy)',
    description: 'Ksh 16,000 · Burgundy 99J pixie curls on a lace front.',
    thumbnail: '/gallery/wigs/18in-pixie-curly-burgundy.jpg',
    fullSize: '/gallery/wigs/18in-pixie-curly-burgundy.jpg',
    tags: ['pixie-curls', '18-inch', 'burgundy', 'lace-front'],
    uploadDate: '2026-08-29'
  },
  {
    id: 'wig-18-pixie-curly-highlight',
    type: 'image',
    category: 'wigs',
    title: '18" Pixie Curly (Brown Highlight)',
    description: 'Ksh 16,000 · Brown highlighted pixie curls on a lace front.',
    thumbnail: '/gallery/wigs/18in-pixie-curly-highlight.jpg',
    fullSize: '/gallery/wigs/18in-pixie-curly-highlight.jpg',
    tags: ['pixie-curls', '18-inch', 'highlight', 'lace-front'],
    uploadDate: '2026-08-29'
  },
  {
    id: 'wig-22-water-wave-natural',
    type: 'image',
    category: 'wigs',
    title: '22" Water Wave (Natural Black)',
    description: 'Ksh 20,000 · Long natural black water wave lace wig.',
    thumbnail: '/gallery/wigs/22in-water-wave-natural.jpg',
    fullSize: '/gallery/wigs/22in-water-wave-natural.jpg',
    tags: ['water-wave', '22-inch', 'lace-front', 'natural-black'],
    uploadDate: '2026-08-29'
  },
  {
    id: 'wig-22-water-wave-brown',
    type: 'image',
    category: 'wigs',
    title: '22" Water Wave (Dark Brown)',
    description: 'Ksh 20,000 · Long dark brown water wave lace wig.',
    thumbnail: '/gallery/wigs/22in-water-wave-brown.jpg',
    fullSize: '/gallery/wigs/22in-water-wave-brown.jpg',
    tags: ['water-wave', '22-inch', 'lace-front', 'brown'],
    uploadDate: '2026-08-29'
  },
  {
    id: 'wig-24-water-wave-highlight',
    type: 'image',
    category: 'wigs',
    title: '24" Water Wave (Brown Highlight)',
    description: 'Ksh 22,000 · Brown highlighted water wave lace wig, extra long.',
    thumbnail: '/gallery/wigs/24in-water-wave-highlight.jpg',
    fullSize: '/gallery/wigs/24in-water-wave-highlight.jpg',
    tags: ['water-wave', '24-inch', 'highlight', 'lace-front'],
    uploadDate: '2026-08-29'
  },
  {
    id: 'wig-30-water-wave',
    type: 'image',
    category: 'wigs',
    title: '30" Water Wave',
    description: 'Ksh 34,000 · Natural black water wave lace wig, full waist length.',
    thumbnail: '/gallery/wigs/30in-water-wave.jpg',
    fullSize: '/gallery/wigs/30in-water-wave.jpg',
    tags: ['water-wave', '30-inch', 'lace-front', 'natural-black'],
    uploadDate: '2026-08-29'
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
