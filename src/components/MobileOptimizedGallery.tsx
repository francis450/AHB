import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Filter, X, Share, Download } from 'lucide-react';
import { GalleryItem } from '../data/galleryData';
import VideoThumbnailOptimized from './VideoThumbnailOptimized';
import VideoPlayer from './VideoPlayer';
import LazyImage from './LazyImage';
import { getOptimalVideoSettings, isLowBandwidth, formatFileSize } from '../utils/videoOptimization';

interface MobileOptimizedGalleryProps {
  items: GalleryItem[];
  filters: Array<{ id: string; name: string }>;
  onItemClick?: (item: GalleryItem) => void;
}

const MobileOptimizedGallery: React.FC<MobileOptimizedGalleryProps> = ({
  items,
  filters,
  onItemClick
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowBw, setIsLowBw] = useState(false);
  const [showDataWarning, setShowDataWarning] = useState(false);

  // Device and network detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const checkBandwidth = () => {
      setIsLowBw(isLowBandwidth());
    };

    checkMobile();
    checkBandwidth();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter items
  const filteredItems = items.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'images') return item.type === 'image';
    if (activeFilter === 'videos') return item.type === 'video';
    return item.category === activeFilter;
  });

  // Get optimal settings for current device/connection
  const optimalSettings = getOptimalVideoSettings();

  // Handle item selection with data warning for videos on mobile
  const handleItemClick = useCallback((item: GalleryItem) => {
    if (item.type === 'video' && isMobile && isLowBw) {
      setShowDataWarning(true);
      setSelectedItem(item);
    } else {
      setSelectedItem(item);
      onItemClick?.(item);
    }
  }, [isMobile, isLowBw, onItemClick]);

  // Confirm video playback despite data warning
  const confirmVideoPlay = () => {
    setShowDataWarning(false);
    onItemClick?.(selectedItem!);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setShowDataWarning(false);
  };

  // Mobile-optimized grid layout
  const gridCols = isMobile ? 'grid-cols-2' : 'grid-cols-3';
  const itemHeight = isMobile ? 'h-32' : 'h-48';

  return (
    <div className="mobile-gallery">
      {/* Mobile-optimized filter bar */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="overflow-x-auto">
          <div className="flex space-x-2 p-4 min-w-max">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter size={14} />
                <span>{filter.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Results count and low bandwidth indicator */}
        <div className="px-4 pb-2 flex justify-between items-center text-xs text-gray-500">
          <span>{filteredItems.length} items</span>
          {isLowBw && (
            <span className="flex items-center space-x-1 text-orange-600">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>Slow connection detected</span>
            </span>
          )}
        </div>
      </div>

      {/* Mobile-optimized gallery grid */}
      <div className={`grid ${gridCols} gap-2 p-4`}>
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`relative ${itemHeight} bg-white rounded-lg overflow-hidden shadow-md cursor-pointer group`}
            onClick={() => handleItemClick(item)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {item.type === 'video' ? (
              <VideoThumbnailOptimized
                videoSrc={item.videoUrl || ''}
                fallbackImage={item.thumbnail}
                title={item.title}
                className="w-full h-full"
                lazy={true}
                quality={optimalSettings.thumbnailQuality}
              />
            ) : (
              <LazyImage
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            )}

            {/* Overlay with play button for videos */}
            {item.type === 'video' && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-colors flex items-center justify-center">
                <motion.div
                  className="bg-white bg-opacity-90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                >
                  <Play className="text-yellow-600" size={isMobile ? 16 : 20} fill="currentColor" />
                </motion.div>
              </div>
            )}

            {/* Content type badge */}
            <div className="absolute top-2 left-2">
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                item.type === 'video'
                  ? 'bg-red-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}>
                {item.type === 'video' ? 'Video' : 'Photo'}
              </span>
            </div>

            {/* Low bandwidth warning for videos */}
            {item.type === 'video' && isLowBw && (
              <div className="absolute top-2 right-2">
                <span className="bg-orange-500 text-white text-xs px-1 py-0.5 rounded">
                  Data
                </span>
              </div>
            )}

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
              <h3 className="text-white text-xs font-medium truncate">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No items found for the selected filter.</p>
        </div>
      )}

      {/* Data usage warning modal */}
      <AnimatePresence>
        {showDataWarning && selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-sm mx-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 text-xl">⚠️</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Data Usage Warning
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  You're on a slow connection. This video may use significant mobile data. 
                  Estimated size: {formatFileSize(5 * 1024 * 1024)} {/* Rough estimate */}
                </p>
                
                <div className="flex space-x-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmVideoPlay}
                    className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen media modal */}
      <AnimatePresence>
        {selectedItem && !showDataWarning && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {selectedItem.type === 'video' && selectedItem.videoUrl ? (
                <VideoPlayer
                  src={selectedItem.videoUrl}
                  poster={selectedItem.thumbnail || selectedItem.fullSize}
                  title={selectedItem.title}
                  className={isMobile ? 'w-full max-h-full' : 'max-w-4xl max-h-full'}
                  controls={true}
                  isVertical={selectedItem.isVertical}
                  lazy={false}
                />
              ) : (
                <LazyImage
                  src={selectedItem.fullSize}
                  alt={selectedItem.title}
                  className="max-w-full max-h-full object-contain"
                />
              )}

              {/* Close button */}
              <motion.button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 text-white z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>

              {/* Media info overlay for mobile */}
              {isMobile && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 text-white"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-semibold mb-1">{selectedItem.title}</h3>
                  <p className="text-sm text-gray-300 mb-2">{selectedItem.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="capitalize">{selectedItem.category.replace('-', ' ')}</span>
                      <span>•</span>
                      <span>{new Date(selectedItem.uploadDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="p-2 bg-white bg-opacity-20 rounded-full">
                        <Share size={16} />
                      </button>
                      {selectedItem.videoUrl && (
                        <a 
                          href={selectedItem.videoUrl} 
                          download
                          className="p-2 bg-white bg-opacity-20 rounded-full"
                        >
                          <Download size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileOptimizedGallery;