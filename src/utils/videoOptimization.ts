/**
 * Video optimization utilities for the gallery
 * These utilities help with video compression, thumbnail generation, and performance optimization
 */

export interface VideoInfo {
  duration: number;
  width: number;
  height: number;
  size: number;
  aspectRatio: number;
  isVertical: boolean;
}

export interface VideoOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'webm' | 'mp4';
  targetSizeKB?: number;
}

/**
 * Get video information without fully loading the video
 */
export const getVideoInfo = (videoElement: HTMLVideoElement): Promise<VideoInfo> => {
  return new Promise((resolve, reject) => {
    const handleMetadata = () => {
      const duration = videoElement.duration;
      const width = videoElement.videoWidth;
      const height = videoElement.videoHeight;
      const aspectRatio = width / height;
      const isVertical = aspectRatio < 1;

      // Estimate file size (rough calculation)
      const bitrate = 1000; // kbps estimate
      const size = (duration * bitrate * 1000) / 8; // bytes

      resolve({
        duration,
        width,
        height,
        size,
        aspectRatio,
        isVertical
      });

      videoElement.removeEventListener('loadedmetadata', handleMetadata);
    };

    const handleError = () => {
      reject(new Error('Failed to load video metadata'));
      videoElement.removeEventListener('error', handleError);
    };

    videoElement.addEventListener('loadedmetadata', handleMetadata);
    videoElement.addEventListener('error', handleError);
  });
};

/**
 * Generate optimized thumbnail from video
 */
export const generateOptimizedThumbnail = async (
  videoSrc: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    seekTime?: number;
  } = {}
): Promise<string> => {
  const {
    width = 400,
    height = 300,
    quality = 0.8,
    seekTime = 1
  } = options;

  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas 2d context'));
      return;
    }

    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;

    const handleSeeked = () => {
      try {
        // Calculate optimal canvas size maintaining aspect ratio
        const videoAspectRatio = video.videoWidth / video.videoHeight;
        let canvasWidth = width;
        let canvasHeight = height;

        if (videoAspectRatio > (width / height)) {
          canvasHeight = width / videoAspectRatio;
        } else {
          canvasWidth = height * videoAspectRatio;
        }

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Draw video frame to canvas
        ctx.drawImage(video, 0, 0, canvasWidth, canvasHeight);

        // Convert to data URL with specified quality
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        
        resolve(dataUrl);
      } catch (error) {
        reject(error);
      } finally {
        video.removeEventListener('seeked', handleSeeked);
        video.src = '';
        video.load();
      }
    };

    const handleLoadedMetadata = () => {
      // Smart seek time calculation
      const safeSeekmTime = Math.max(0.1, Math.min(seekTime, video.duration * 0.1));
      video.currentTime = safeSeekmTime;
      video.addEventListener('seeked', handleSeeked);
    };

    const handleError = () => {
      reject(new Error(`Failed to load video: ${videoSrc}`));
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);
    video.src = videoSrc;
  });
};

/**
 * Format duration in seconds to human readable format
 */
export const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  
  if (minutes < 60) {
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  return `${hours}h ${remainingMinutes}m`;
};

/**
 * Format file size in bytes to human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * Check if device has limited bandwidth (mobile/slow connection)
 */
export const isLowBandwidth = (): boolean => {
  // Check network information if available
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (connection) {
    // Consider 2G or slow-2g as low bandwidth
    const slowConnections = ['slow-2g', '2g'];
    return slowConnections.includes(connection.effectiveType);
  }
  
  // Fallback: assume mobile devices have limited bandwidth
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Get optimal video quality based on device capabilities
 */
export const getOptimalVideoSettings = (): {
  preload: 'none' | 'metadata' | 'auto';
  quality: 'low' | 'medium' | 'high';
  thumbnailQuality: number;
} => {
  const isMobile = window.innerWidth < 768;
  const isLowBw = isLowBandwidth();
  
  if (isMobile || isLowBw) {
    return {
      preload: 'none',
      quality: 'low',
      thumbnailQuality: 0.6
    };
  }
  
  if (window.innerWidth < 1200) {
    return {
      preload: 'metadata',
      quality: 'medium',
      thumbnailQuality: 0.75
    };
  }
  
  return {
    preload: 'metadata',
    quality: 'high',
    thumbnailQuality: 0.85
  };
};

/**
 * Preload critical videos based on viewport and user behavior
 */
export const preloadCriticalVideos = (videoElements: NodeListOf<HTMLVideoElement>, maxCount: number = 3) => {
  const observer = new IntersectionObserver(
    (entries) => {
      let preloadedCount = 0;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting && preloadedCount < maxCount) {
          const video = entry.target as HTMLVideoElement;
          if (video.preload === 'none') {
            video.preload = 'metadata';
            preloadedCount++;
          }
        }
      });
    },
    {
      rootMargin: '200px' // Start preloading 200px before entering viewport
    }
  );
  
  videoElements.forEach((video) => observer.observe(video));
  
  return () => {
    videoElements.forEach((video) => observer.unobserve(video));
  };
};

/**
 * Video compression recommendations for future server-side processing
 */
export const getCompressionRecommendations = (fileSize: number, duration: number) => {
  const fileSizeMB = fileSize / (1024 * 1024);
  const bitrateKbps = (fileSizeMB * 8 * 1024) / duration;
  
  const recommendations = {
    current: {
      size: formatFileSize(fileSize),
      bitrate: `${Math.round(bitrateKbps)} kbps`
    },
    mobile: {
      targetBitrate: '500 kbps',
      expectedReduction: '70-80%',
      resolution: '480p or lower'
    },
    web: {
      targetBitrate: '1000 kbps', 
      expectedReduction: '40-60%',
      resolution: '720p'
    },
    formats: {
      recommended: ['WebM (VP9)', 'MP4 (H.264)'],
      fallback: 'MP4 (H.264)'
    }
  };
  
  return recommendations;
};