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
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  src, 
  poster, 
  title, 
  className = "",
  autoPlay = false,
  controls = true,
  isVertical = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [videoAspectRatio, setVideoAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        const aspectRatio = video.videoWidth / video.videoHeight;
        setVideoAspectRatio(aspectRatio);
        setIsLoading(false);
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }
  }, [src]);

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

  const handleVideoClick = () => {
    if (controls) {
      togglePlay();
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
      {!isPlaying && !isLoading && (
        <motion.button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all duration-300"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="bg-white bg-opacity-90 rounded-full p-6">
            <Play className="text-yellow-600" size={32} fill="currentColor" />
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default VideoPlayer;
