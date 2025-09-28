import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster: string;
  title: string;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
  isVertical?: boolean;
  lazy?: boolean;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  src, 
  poster, 
  title, 
  className = "",
  autoPlay = false,
  controls = true,
  isVertical = false,
  lazy = true,
  onLoadStart,
  onCanPlay
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [videoAspectRatio, setVideoAspectRatio] = useState<number | null>(null);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(false);

  useEffect(() => {
    // Detect mobile devices and autoplay capability
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);

      // Most mobile browsers don't support autoplay without user interaction
      setCanAutoplay(!isMobileDevice || hasInteracted);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [hasInteracted]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && shouldLoad) {
      const handleLoadedMetadata = () => {
        const aspectRatio = video.videoWidth / video.videoHeight;
        setVideoAspectRatio(aspectRatio);
        setIsLoading(false);
        onCanPlay?.();
      };
      
      const handleLoadStart = () => {
        setIsLoading(true);
        onLoadStart?.();
      };
      
      const handleError = () => {
        setIsLoading(false);
        setHasError(true);
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('error', handleError);
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('error', handleError);
      };
    }
  }, [src, shouldLoad, onLoadStart, onCanPlay]);

  // Determine if video is vertical (aspect ratio < 1)
  const isVideoVertical = videoAspectRatio !== null ? videoAspectRatio < 1 : isVertical;

  const togglePlay = async () => {
    if (videoRef.current) {
      setHasInteracted(true);

      try {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          // Handle mobile play restrictions
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsPlaying(true);
          }
        }
      } catch (error) {
        console.warn('Video play failed:', error);
        // On mobile, show a more user-friendly message
        if (isMobile) {
          setHasError(true);
        }
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const initializeVideo = () => {
    if (lazy && !shouldLoad) {
      setShouldLoad(true);
    } else {
      togglePlay();
    }
  };

  const handleVideoClick = () => {
    if (controls) {
      if (!shouldLoad) {
        initializeVideo();
      } else {
        togglePlay();
      }
    }
  };

  // Dynamic container classes based on video orientation and device
  const containerClasses = `relative bg-black rounded-lg overflow-hidden ${className} ${
    isVideoVertical 
      ? 'max-w-sm mx-auto' // Vertical videos: smaller, centered
      : 'w-full' // Horizontal videos: full width
  }`;

  const videoClasses = `w-full h-full object-contain cursor-pointer ${
    isVideoVertical 
      ? 'max-h-[70vh]' // Vertical videos: limit height
      : '' // Horizontal videos: natural sizing
  }`;

  return (
    <div className={containerClasses}>
      {shouldLoad ? (
        <video
          ref={videoRef}
          poster={poster}
          className={videoClasses}
          preload={isMobile ? "none" : "metadata"}
          controlsList={isMobile ? "nodownload nofullscreen" : "nodownload"}
          muted={isMuted}
          autoPlay={autoPlay && canAutoplay && hasInteracted}
          onLoadedData={handleLoadedData}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={handleVideoClick}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(controls)}
          onError={(e) => {
            console.error('Video loading error:', e);
            console.error('Video src:', src);
            setHasError(true);
            setIsLoading(false);
          }}
          playsInline
          crossOrigin="anonymous"
          webkit-playsinline="true"
          x5-playsinline="true"
        >
          <source src={src} type="video/mp4" />
          <p className="text-white p-4">
            Your browser doesn't support video playback.
            <a href={src} className="text-yellow-400 underline ml-2" target="_blank" rel="noopener noreferrer">
              Download the video
            </a>
          </p>
        </video>
      ) : (
        <div 
          className={`${videoClasses} bg-black flex items-center justify-center cursor-pointer`}
          onClick={initializeVideo}
          style={{
            backgroundImage: `url(${poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <motion.div
              className="bg-white bg-opacity-90 rounded-full p-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Play className="text-yellow-600" size={isMobile ? 40 : 32} fill="currentColor" />
            </motion.div>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && shouldLoad && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div className="flex flex-col items-center space-y-2">
            <motion.div
              className={`border-2 border-yellow-400 border-t-transparent rounded-full ${
                isMobile ? 'w-6 h-6' : 'w-8 h-8'
              }`}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span className={`text-white ${
              isMobile ? 'text-xs' : 'text-sm'
            }`}>
              {isMobile ? 'Loading...' : 'Loading video...'}
            </span>
          </motion.div>
        </div>
      )}
      
      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900 bg-opacity-50">
          <div className="text-center text-white p-4">
            <p className={`mb-2 ${
              isMobile ? 'text-sm' : 'text-base'
            }`}>
              {isMobile ? 'Cannot play video' : 'Error loading video'}
            </p>
            <p className={`text-gray-300 mb-3 ${
              isMobile ? 'text-xs' : 'text-sm'
            }`}>
              {isMobile ? 'Tap to try again or download' : 'Please try again or download the video'}
            </p>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  setHasError(false);
                  setIsLoading(true);
                  if (videoRef.current) {
                    videoRef.current.load();
                  }
                }}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm"
              >
                Try Again
              </button>
              <a href={src} className="text-yellow-400 underline text-sm" target="_blank" rel="noopener noreferrer">
                Download Video
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Custom Controls */}
      {controls && (
        <motion.div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showControls ? 1 : 0, 
            y: showControls ? 0 : 20 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              {/* Play/Pause Button */}
              <motion.button
                onClick={togglePlay}
                className="flex items-center justify-center w-10 h-10 bg-yellow-600 rounded-full hover:bg-yellow-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? (
                  <Pause size={20} fill="white" />
                ) : (
                  <Play size={20} fill="white" />
                )}
              </motion.button>

              {/* Volume Control */}
              <motion.button
                onClick={toggleMute}
                className="flex items-center justify-center w-8 h-8 hover:text-yellow-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? (
                  <VolumeX size={20} />
                ) : (
                  <Volume2 size={20} />
                )}
              </motion.button>
            </div>

            <div className="flex items-center space-x-4">
              {/* Video Title */}
              <span className="text-sm font-medium truncate max-w-xs">
                {title}
              </span>

              {/* Fullscreen Button */}
              <motion.button
                onClick={toggleFullscreen}
                className="flex items-center justify-center w-8 h-8 hover:text-yellow-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Maximize size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Center Play Button for Initial State */}
      {!isPlaying && !isLoading && shouldLoad && !hasError && (
        <motion.button
          onClick={initializeVideo}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all duration-300"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="bg-white bg-opacity-90 rounded-full p-6">
            <Play className="text-yellow-600" size={isMobile ? 40 : 32} fill="currentColor" />
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default VideoPlayer;