# Video Optimization for Netlify Deployment

## Current Issue
The 105MB `.MOV` video file is too large for optimal web delivery and may cause loading issues.

## Solution Options

### Option 1: Manual Conversion (Recommended for immediate fix)
**Use online tools to convert the video before deployment:**

1. **CloudConvert** (https://cloudconvert.com/mov-to-mp4)
   - Upload `IMG_8923.MOV`
   - Convert to MP4 with these settings:
     - Resolution: 1920x1080 (or 1280x720 for smaller size)
     - Bitrate: 2-4 Mbps
     - Format: MP4 (H.264)
   - Target file size: 8-15MB

2. **Handbrake** (free desktop app)
   - Use "Web Optimized" preset
   - Set quality to RF 23-26
   - Enable "Web Optimized" checkbox

3. **Replace the file:**
   ```bash
   # Replace the current video file
   mv converted_video.mp4 public/gallery/videos/home-banner/IMG_8923.mp4
   ```

### Option 2: Cloudinary Integration (Best long-term solution)
**Automatic optimization with Cloudinary:**

```tsx
// Update HeroSection.tsx
<VideoBanner
  videoSrc="https://res.cloudinary.com/YOUR_CLOUD/video/upload/q_auto,f_auto/v1/videos/hero-video"
  fallbackImage="..."
  // ... other props
/>
```

Benefits:
- Automatic format optimization (MP4, WebM, etc.)
- Adaptive bitrate streaming
- Global CDN delivery
- Multiple quality variants

### Option 3: Netlify Build-time Conversion (Current implementation)
**Automatic conversion during Netlify build:**

The current setup attempts to convert videos during build, but requires FFmpeg:

```bash
# If FFmpeg is available on Netlify, videos will be optimized to:
public/gallery/videos/optimized/IMG_8923-web.mp4    # Desktop version
public/gallery/videos/optimized/IMG_8923-mobile.mp4 # Mobile version
```

If FFmpeg isn't available, the build continues with the original video and graceful fallbacks.

## Current Video Component Features

The `VideoBanner` component includes:
- ✅ Loading indicators
- ✅ Automatic fallback to background image
- ✅ 10-second timeout for large files
- ✅ Responsive source selection
- ✅ Progressive enhancement

## Immediate Action Needed

**For fastest resolution:**
1. Use CloudConvert or Handbrake to compress the video to ~10MB
2. Replace the current file
3. Deploy to Netlify

**Target specifications:**
- Format: MP4 (H.264)
- Resolution: 1920x1080 or 1280x720
- Bitrate: 2-4 Mbps
- File size: 8-15MB (down from 105MB)
- Enable "fast start" for web streaming

This will provide immediate performance improvements while maintaining video quality.