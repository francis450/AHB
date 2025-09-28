import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoBannerProps {
  videoSrc: string;
  fallbackImage?: string;
  className?: string;
  children?: React.ReactNode;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  overlay?: boolean;
  overlayOpacity?: number;
  useOptimized?: boolean; // Use optimized videos from build process
}

const VideoBanner: React.FC<VideoBannerProps> = ({
  videoSrc,
  fallbackImage,
  className = '',
  children,
  autoPlay = true,
  muted = true,
  loop = true,
  overlay = true,
  overlayOpacity = 0.4,
  useOptimized = true
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = React.useState(false);
  const [videoLoaded, setVideoLoaded] = React.useState(false);

  // Generate optimized video paths
  const getOptimizedVideoSrc = (originalSrc: string, variant: 'web' | 'mobile') => {
    if (!useOptimized) return originalSrc;

    const pathParts = originalSrc.split('/');
    const fileName = pathParts.pop()?.replace(/\.(mov|mp4|avi|mkv)$/i, '');
    const directory = pathParts.join('/');

    return `${directory}/optimized/${fileName}-${variant}.mp4`;
  };

  useEffect(() => {
    if (videoRef.current && !videoError) {
      const video = videoRef.current;

      const handleLoad = () => {
        console.log('Video loaded successfully:', videoSrc);
        setVideoLoaded(true);
        if (autoPlay) {
          video.play().catch(error => {
            console.log('Video autoplay failed (this is normal on some browsers):', error);
          });
        }
      };

      const handleError = (error: any) => {
        console.error('Video failed to load:', videoSrc, error);
        setVideoError(true);
      };

      const handleCanPlay = () => {
        console.log('Video can start playing:', videoSrc);
        setVideoLoaded(true);
      };

      // Try to load the video manually
      const tryLoadVideo = () => {
        console.log('Attempting to load video:', videoSrc);
        video.load();
      };

      video.addEventListener('loadeddata', handleLoad);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);

      // Start loading after a short delay
      const loadTimeout = setTimeout(tryLoadVideo, 100);

      // Fallback to image if video doesn't load within 10 seconds
      const fallbackTimeout = setTimeout(() => {
        if (!videoLoaded) {
          console.warn('Video loading timed out, falling back to image');
          setVideoError(true);
        }
      }, 10000);

      return () => {
        clearTimeout(loadTimeout);
        clearTimeout(fallbackTimeout);
        video.removeEventListener('loadeddata', handleLoad);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
      };
    }
  }, [videoSrc, autoPlay, videoError]);

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Video Background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Show video only if it's loaded and no error */}
        {!videoError && (
          <video
            ref={videoRef}
            className={`min-w-full min-h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{
              width: 'auto',
              height: '100%',
              minWidth: '100%',
              minHeight: '100%'
            }}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline
            preload="none"
            onError={() => {
              console.error('Video failed to load - showing fallback');
              setVideoError(true);
            }}
            onLoadStart={() => console.log('Video load started')}
            onLoadedMetadata={() => console.log('Video metadata loaded')}
          >
            {useOptimized ? (
              <>
                {/* Mobile-first responsive sources */}
                <source
                  src={getOptimizedVideoSrc(videoSrc, 'mobile')}
                  type="video/mp4"
                  media="(max-width: 768px)"
                />
                <source
                  src={getOptimizedVideoSrc(videoSrc, 'web')}
                  type="video/mp4"
                  media="(min-width: 769px)"
                />
                {/* Fallback to original */}
                <source src={videoSrc} type="video/mp4" />
              </>
            ) : (
              <source src={videoSrc} type="video/mp4" />
            )}
            Your browser does not support the video tag.
          </video>
        )}

        {/* Fallback image - show when video fails or while loading */}
        {fallbackImage && (videoError || !videoLoaded) && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${fallbackImage}')`,
              zIndex: 0
            }}
          />
        )}

        {/* Loading indicator */}
        {!videoLoaded && !videoError && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white text-lg flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Loading video...</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Overlay */}
      {overlay && (
        <motion.div
          className="absolute inset-0 bg-black z-10"
          style={{ opacity: overlayOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: overlayOpacity }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      )}

      {/* Gradient overlay bubbles for depth (similar to original hero) */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5 z-20"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-8 z-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 60%)'
        }}
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.08, 0.18, 0.08]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-3 z-20"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 80%)'
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
          opacity: [0.03, 0.08, 0.03]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Content */}
      {children && (
        <div className="relative z-30">
          {children}
        </div>
      )}
    </section>
  );
};

export default VideoBanner;