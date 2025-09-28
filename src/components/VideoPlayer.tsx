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
<<<<<<< HEAD
  lazy?: boolean;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
=======
>>>>>>> f0c516aeb6b0af008a79402205d16f46036e1430
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  src, 
  poster, 
  title, 
  className = "",
  autoPlay = false,
  controls = true,
<<<<<<< HEAD
  isVertical = false,
  lazy = true,
  onLoadStart,
  onCanPlay
=======
  isVertical = false
>>>>>>> f0c516aeb6b0af008a79402205d16f46036e1430
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [videoAspectRatio, setVideoAspectRatio] = useState<number | null>(null);
<<<<<<< HEAD
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video && shouldLoad) {
=======

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
>>>>>>> f0c516aeb6b0af008a79402205d16f46036e1430
      const handleLoadedMetadata = () => {
        const aspectRatio = video.videoWidth / video.videoHeight;
        setVideoAspectRatio(aspectRatio);
        setIsLoading(false);
<<<<<<< HEAD
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
=======
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }
  }, [src]);
>>>>>>> f0c516aeb6b0af008a79402205d16f46036e1430

  // Determine if video is vertical (aspect ratio < 1)
  const isVideoVertical = videoAspectRatio !== null ? videoAspectRatio < 1 : isVertical;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
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

<<<<<<< HEAD
  const initializeVideo = () => {
    if (lazy && !shouldLoad) {
      setShouldLoad(true);
    } else {
      togglePlay();
    }
  };

  const handleVideoClick = () => {
    if (controls) {
      initializeVideo();
=======
  const handleVideoClick = () => {
    if (controls) {
      togglePlay();
>>>>>>> f0c516aeb6b0af008a79402205d16f46036e1430
    }
  };

  // Dynamic container classes based on video orientation
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
<<<<<<< HEAD
      {shouldLoad ? (
        <video
          ref={videoRef}
          poster={poster}
          className={videoClasses}
          preload={isMobile ? "none" : "metadata"}
          muted={isMuted}
          autoPlay={autoPlay && !isMobile}
          onLoadedData={handleLoadedData}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={handleVideoClick}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(controls)}
          playsInline
        >
          <source src={src} type="video/mp4" />
          <p className="text-white p-4">
            Your browser doesn't support video playback. 
            <a href={src} className="text-yellow-400 underline ml-2">
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
              className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-white text-sm">Loading video...</span>
          </motion.div>
        </div>
      )}
      
      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900 bg-opacity-50">
          <div className="text-center text-white p-4">
            <p className="mb-2">Error loading video</p>
            <a href={src} className="text-yellow-400 underline text-sm">
              Try downloading instead
            </a>
          </div>
=======
      <video
        ref={videoRef}
        poster={poster}
        className={videoClasses}
        preload="metadata"
        muted={isMuted}
        autoPlay={autoPlay}
        onLoadedData={handleLoadedData}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={handleVideoClick}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(controls)}
      >
        <source src={src} type="video/mp4" />
        <p className="text-white p-4">
          Your browser doesn't support video playback. 
          <a href={src} className="text-yellow-400 underline ml-2">
            Download the video
          </a>
        </p>
      </video>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
>>>>>>> f0c516aeb6b0af008a79402205d16f46036e1430
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
<<<<<<< HEAD
      {!isPlaying && !isLoading && shouldLoad && !hasError && (
        <motion.button
          onClick={initializeVideo}
=======
      {!isPlaying && !isLoading && (
        <motion.button
          onClick={togglePlay}
>>>>>>> f0c516aeb6b0af008a79402205d16f46036e1430
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all duration-300"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="bg-white bg-opacity-90 rounded-full p-6">
<<<<<<< HEAD
            <Play className="text-yellow-600" size={isMobile ? 40 : 32} fill="currentColor" />
=======
            <Play className="text-yellow-600" size={32} fill="currentColor" />
>>>>>>> f0c516aeb6b0af008a79402205d16f46036e1430
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default VideoPlayer;
