# Gallery Media Management

This document explains how to add and manage actual images and videos in the gallery.

## Directory Structure

The gallery uses the following directory structure in the `public` folder:

```
public/
├── gallery/
    ├── images/
    │   ├── hair-styling/
    │   ├── wig-installation/
    │   ├── treatments/
    │   └── before-after/
    └── videos/
        ├── hair-styling/
        ├── wig-installation/
        └── treatments/
```

## Adding Media Files

### 1. Images
Place your images in the appropriate category folders:
- **Thumbnails**: Should be optimized for web (recommended: 600x400px, WebP or JPEG)
- **Full-size**: Higher resolution versions for the modal view (recommended: 1200x800px max)
- **Naming convention**: Use descriptive names like `wedding-style-full.jpg`, `wedding-style-thumb.jpg`

### 2. Videos
Place your videos in the appropriate category folders:
- **Format**: MP4 is recommended for best browser compatibility
- **Resolution**: 
  - Portrait/Vertical (Instagram Reels): 464x832, 720x1280, or similar 9:16 ratio
  - Landscape/Horizontal: 1080p or 720p for web streaming
- **Compression**: Use web-optimized encoding (H.264 codec)
- **Size**: Keep files under 50MB for faster loading
- **Orientation**: The system automatically detects and handles both portrait and landscape videos
- **Thumbnails**: Optional! If no thumbnail is provided, the system will automatically generate one from the video

### 3. Automatic Video Thumbnails
When you don't provide a thumbnail image for videos, the system will:
- Automatically generate a thumbnail from the video (captures frame at 1 second)
- Show a loading state while generating
- Fall back to a styled placeholder with video icon if generation fails
- Cache the generated thumbnail for better performance

## Updating Gallery Data

Edit the file `/src/data/galleryData.ts` to add or modify gallery items:

```typescript
{
  id: 'unique-id',
  type: 'image' | 'video',
  category: 'hair-styling' | 'wig-installation' | 'treatments' | 'before-after',
  title: 'Display Title',
  description: 'Detailed description of the media',
  thumbnail: '/gallery/images/category/filename-thumb.jpg', // Optional for videos
  fullSize: '/gallery/images/category/filename-full.jpg',
  videoUrl: '/gallery/videos/category/filename.mp4', // Only for videos
  duration: '3:45', // Only for videos (format: MM:SS)
  isVertical: true, // Only for videos - set to true for portrait/vertical videos (Instagram Reels format)
  tags: ['tag1', 'tag2', 'tag3'],
  uploadDate: '2024-01-15' // YYYY-MM-DD format
}
```

## Image Optimization Tips

### 1. Image Compression
- Use tools like TinyPNG, ImageOptim, or online compressors
- Aim for thumbnails under 100KB and full images under 500KB
- Consider using WebP format with JPEG fallback

### 2. Responsive Images
The LazyImage component automatically handles:
- Lazy loading (images load when entering viewport)
- Loading states with placeholder
- Error handling for missing images

### 3. Video Optimization
- Use HandBrake or FFmpeg for video compression
- **Portrait Videos (Instagram Reels)**:
  - Target resolution: 720x1280 or 464x832
  - Bitrate: 800-1500 kbps for mobile-optimized content
  - Frame rate: 30fps (60fps for high-motion content)
- **Landscape Videos**:
  - Target bitrate: 1-3 Mbps for web streaming
  - Resolution: 720p or 1080p
- Include poster images (video thumbnails)
- The VideoPlayer automatically adapts layout based on video aspect ratio

## File Naming Convention

Use consistent naming:
- **Images**: `category-description-type.ext`
  - Example: `wedding-style-full.jpg`, `wedding-style-thumb.jpg`
- **Videos**: `category-description.mp4`
  - Example: `wig-installation-tutorial.mp4`

## Adding New Categories

To add a new category:

1. Create the directory structure:
   ```
   public/gallery/images/new-category/
   public/gallery/videos/new-category/
   ```

2. Update the TypeScript types in `/src/data/galleryData.ts`:
   ```typescript
   category: 'hair-styling' | 'wig-installation' | 'treatments' | 'before-after' | 'new-category'
   ```

3. Add the filter in `/src/pages/Gallery.tsx`:
   ```typescript
   { id: 'new-category', name: 'New Category' }
   ```

## Performance Considerations

### 1. Image Loading
- Thumbnails are loaded first in the grid
- Full-size images are loaded only when modal opens
- Lazy loading reduces initial page load time

### 2. Video Streaming
- Videos use HTML5 video player with custom controls
- **Responsive Design**: Automatically adapts to video orientation
  - Portrait videos (Instagram Reels): Display in centered, mobile-friendly format
  - Landscape videos: Display in full-width format
- Poster images show before video loads
- Videos are not auto-loaded until user interaction
- Custom controls include play/pause, volume, and fullscreen

### 3. Browser Compatibility
- WebP images with JPEG fallback
- MP4 videos with browser compatibility checks
- Responsive design for all screen sizes

## Testing Your Media

Before deploying:
1. Check all image paths are correct
2. Verify video files play in different browsers
3. Test on mobile devices for performance
4. Ensure all thumbnails and full-size images exist
5. Validate the gallery data structure

## Social Media Integration

The gallery includes a social media section. To connect with real social accounts:
1. Replace the placeholder links with actual social media URLs
2. Consider using social media APIs to dynamically load recent posts
3. Update the Instagram handle in the follow button

## Troubleshooting

### Common Issues:
1. **Images not loading**: Check file paths and ensure files exist in public folder
2. **Videos not playing**: Verify MP4 format and codec compatibility
3. **Slow loading**: Optimize image/video file sizes
4. **Layout issues**: Ensure consistent aspect ratios for thumbnails

### Error Handling:
- LazyImage component shows error placeholders for missing images
- VideoPlayer component includes fallback messaging
- Gallery gracefully handles missing media files
