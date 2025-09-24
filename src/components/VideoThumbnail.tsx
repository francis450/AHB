import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Video } from 'lucide-react';

interface VideoThumbnailProps {
  videoSrc: string;
  fallbackImage?: string;
  title: string;
  className?: string;
  onThumbnailGenerated?: (thumbnailUrl: string) => void;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  videoSrc,
  fallbackImage,
  title,
  className = "",
  onThumbnailGenerated
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const generateThumbnailFromVideo = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      if (!video || !canvas) {
        console.error('❌ Video or canvas element not found');
        return;
      }

      console.log('🎬 Starting video thumbnail generation...');

      const handleSeeked = async () => {
        try {
          console.log('⚡ Video seeked, generating thumbnail...');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            console.error('❌ Could not get canvas 2d context');
            return;
          }

          // Set canvas dimensions to match video
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          console.log(`📐 Canvas dimensions: ${canvas.width}x${canvas.height}`);

          // Draw video frame to canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Convert canvas to data URL
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setThumbnailUrl(dataUrl);
          setIsLoading(false);
          
          console.log('🖼️ Thumbnail generated successfully');
          
          // Call callback with the generated thumbnail
          onThumbnailGenerated?.(dataUrl);
          
          video.removeEventListener('seeked', handleSeeked);
        } catch (error) {
          console.error('❌ Error generating thumbnail:', error);
          setHasError(true);
          setIsLoading(false);
        }
      };

      const handleLoadedMetadata = () => {
        console.log('📹 Video metadata loaded, duration:', video.duration);
        // Seek to 1 second to avoid black frames
        const seekTime = Math.min(1, video.duration * 0.1);
        console.log('⏰ Seeking to time:', seekTime);
        video.currentTime = seekTime;
        video.addEventListener('seeked', handleSeeked);
      };

      const handleError = (event: Event) => {
        console.error('❌ Error loading video for thumbnail generation:', event);
        console.error('Video src:', videoSrc);
        setHasError(true);
        setIsLoading(false);
      };

      if (!videoSrc) {
        setHasError(true);
        setIsLoading(false);
        return;
      }

      console.log('🎥 Setting up video event listeners...');
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('error', handleError);

      // Set video source
      console.log('📡 Loading video source:', videoSrc);
      video.src = videoSrc;
      video.preload = 'metadata';

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('error', handleError);
      };
    };

    generateThumbnailFromVideo();
  }, [videoSrc, onThumbnailGenerated]);

  // Determine what to display
  const getDisplayImage = () => {
    if (thumbnailUrl) return thumbnailUrl;
    if (fallbackImage) return fallbackImage;
    return null;
  };

  const displayImage = getDisplayImage();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Hidden video and canvas for thumbnail generation */}
      <video
        ref={videoRef}
        className="hidden"
        muted
        playsInline
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Display thumbnail, fallback, or placeholder */}
      {displayImage ? (
        <motion.img
          src={displayImage}
          alt={title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      ) : (
        // Fallback placeholder when no image is available
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          {isLoading ? (
            <motion.div
              className="flex flex-col items-center space-y-3 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-sm">Loading preview...</span>
            </motion.div>
          ) : hasError ? (
            <motion.div
              className="flex flex-col items-center space-y-3 text-gray-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Video size={40} className="text-gray-400" />
              <span className="text-sm text-center px-4">Video Preview</span>
              <span className="text-xs text-gray-500 text-center px-4">
                Click to play
              </span>
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col items-center space-y-3 text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Video size={40} className="text-yellow-400" />
              <span className="text-sm text-center px-4">{title}</span>
            </motion.div>
          )}
        </div>
      )}

      {/* Video play overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <motion.div
          className="bg-white bg-opacity-90 rounded-full p-4"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Play className="text-yellow-600" size={24} fill="currentColor" />
        </motion.div>
      </div>

      {/* Loading overlay for initial generation */}
      {isLoading && !displayImage && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoThumbnail;
