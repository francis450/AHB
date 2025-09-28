import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock } from 'lucide-react';
import { GalleryItem as GalleryItemType } from '../data/galleryData';
import VideoThumbnail from './VideoThumbnail';
import LazyImage from './LazyImage';

interface GalleryItemProps {
  item: GalleryItemType;
  index: number;
  isVisible: boolean;
  onClick: (item: GalleryItemType) => void;
  priority?: boolean;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  item,
  index,
  isVisible,
  onClick,
  priority = false
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    onClick(item);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform group cursor-pointer h-full"
      onClick={handleClick}
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0.3,
        y: 0
      }}
      transition={{
        duration: 0.4,
        delay: priority ? 0 : Math.min(0.1 * (index % 8), 0.3)
      }}
    >
      <div className="relative overflow-hidden">
        {/* Main content area */}
        <div className="relative w-full h-64">
          {item.type === 'video' ? (
            <VideoThumbnail
              videoSrc={item.videoUrl || ''}
              fallbackImage={item.thumbnail}
              title={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400"
              lazy={!priority}
              priority={priority}
              isVisible={isVisible}
              quality={0.8}
              maxWidth={400}
              onThumbnailGenerated={() => setImageLoaded(true)}
            />
          ) : (
            <LazyImage
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}

          {/* Loading skeleton */}
          {!imageLoaded && !hasError && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
              <div className="flex items-center justify-center h-full">
                <div className="w-12 h-12 bg-gray-400 rounded-full opacity-50"></div>
              </div>
            </div>
          )}

          {/* Video overlay - only show for videos */}
          {item.type === 'video' && imageLoaded && (
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white bg-opacity-90 rounded-full p-4"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Play className="text-yellow-600" size={24} fill="currentColor" />
              </motion.div>
            </motion.div>
          )}

          {/* Category badge */}
          <motion.div
            className="absolute top-4 left-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
          >
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              item.type === 'video'
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {item.type === 'video' ? 'Video' : 'Photo'}
            </span>
          </motion.div>

          {/* Duration badge for videos */}
          {item.type === 'video' && item.duration && (
            <motion.div
              className="absolute top-4 right-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <span className="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                <Clock size={12} />
                <span>{item.duration}</span>
              </span>
            </motion.div>
          )}
        </div>

        {/* Content section */}
        <motion.div
          className="p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + index * 0.02 }}
        >
          <motion.h3
            className="text-xl font-bold text-gray-900 mb-2 line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.02 }}
          >
            {item.title}
          </motion.h3>

          <motion.p
            className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.02 }}
          >
            {item.description}
          </motion.p>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.02 }}
          >
            {item.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs hover:bg-yellow-100 hover:text-yellow-700 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="text-gray-400 text-xs px-2 py-1">
                +{item.tags.length - 3} more
              </span>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GalleryItem;