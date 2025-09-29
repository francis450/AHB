import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { galleryItems, getItemsByCategory, GalleryItem } from '../data/galleryData';
import MobileOptimizedGallery from './MobileOptimizedGallery';
import { Clock } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import LazyImage from './LazyImage';
import VideoThumbnailOptimized from './VideoThumbnailOptimized';
import { 
  useScrollAnimation, 
  slideUpVariants, 
  slideInLeftVariants, 
  containerVariants,
  staggeredChildrenVariants
} from '../hooks/useScrollAnimation';

const ResponsiveGallery = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);

  const filters = [
    { id: 'all', name: 'All Media' },
    { id: 'images', name: 'Photos' },
    { id: 'videos', name: 'Videos' },
    { id: 'hair-styling', name: 'Hair Styling' },
    { id: 'wig-installation', name: 'Wig Installation' },
    { id: 'treatments', name: 'Treatments' },
    { id: 'before-after', name: 'Before & After' }
  ];

  const { ref: heroRef, controls: heroControls } = useScrollAnimation();
  const { ref: filtersRef, controls: filtersControls } = useScrollAnimation();
  const { ref: galleryRef, controls: galleryControls } = useScrollAnimation();

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredItems = getItemsByCategory(activeFilter);

  const openModal = (item: GalleryItem) => {
    setSelectedMedia(item);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  // Use mobile-optimized gallery on small screens
  if (isMobile) {
    return (
      <div>
        {/* Mobile Hero Section */}
        <motion.section 
          ref={heroRef}
          initial="hidden"
          animate={heroControls}
          variants={slideUpVariants}
          className="py-12 bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/company-banner.jpg')`
          }}
        >
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <motion.h1 
              variants={staggeredChildrenVariants}
              className="text-3xl font-bold text-white mb-4"
            >
              Our <span className="text-yellow-400" style={{ fontFamily: 'Yellowtail, cursive' }}>Gallery</span>
            </motion.h1>
          </div>
        </motion.section>

        {/* Mobile Optimized Gallery */}
        <MobileOptimizedGallery
          items={filteredItems}
          filters={filters}
          onItemClick={openModal}
        />
      </div>
    );
  }

  // Desktop/tablet version
  return (
    <div>
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={slideUpVariants}
        className="py-20 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/company-banner.jpg')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            variants={staggeredChildrenVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Our <span className="text-yellow-400" style={{ fontFamily: 'Yellowtail, cursive' }}>Gallery</span>
          </motion.h1>
        </div>
      </motion.section>

      {/* Filter Buttons */}
      <motion.section 
        ref={filtersRef}
        initial="hidden"
        animate={filtersControls}
        variants={slideInLeftVariants}
        className="py-8 bg-white border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-3"
          >
            {filters.map((filter, index) => (
              <motion.button
                key={filter.id}
                variants={staggeredChildrenVariants}
                custom={index}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{filter.name}</span>
              </motion.button>
            ))}
          </motion.div>
          <motion.div 
            variants={staggeredChildrenVariants}
            className="text-center mt-4 text-sm text-gray-600"
          >
            Showing {filteredItems.length} items
          </motion.div>
        </div>
      </motion.section>

      {/* Gallery Grid */}
      <motion.section 
        ref={galleryRef}
        initial="hidden"
        animate={galleryControls}
        variants={containerVariants}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={staggeredChildrenVariants}
                custom={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform group cursor-pointer"
                onClick={() => openModal(item)}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative overflow-hidden">
                  {item.type === 'video' ? (
                    <VideoThumbnailOptimized
                      videoSrc={item.videoUrl || ''}
                      fallbackImage={item.thumbnail}
                      title={item.title}
                      className="w-full h-64 group-hover:scale-110 transition-transform duration-400"
                      lazy={true}
                      quality={0.8}
                    />
                  ) : (
                    <LazyImage
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-400"
                    />
                  )}

                  <motion.div 
                    className="absolute top-4 left-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {item.type === 'video' ? 'Video' : 'Photo'}
                    </span>
                  </motion.div>
                </div>

                <motion.div 
                  className="p-6"
                  variants={staggeredChildrenVariants}
                >
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 mb-2"
                    variants={staggeredChildrenVariants}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 text-sm leading-relaxed"
                    variants={staggeredChildrenVariants}
                  >
                    {item.description}
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-wrap gap-2 mt-3"
                    variants={staggeredChildrenVariants}
                  >
                    {item.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">No items found for the selected filter.</p>
              <p className="text-gray-400 text-sm mt-2">Try selecting a different category.</p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Modal for viewing media */}
      {selectedMedia && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" 
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >        
          <motion.div 
            className={`max-w-6xl max-h-[90vh] w-full mx-4 ${
              selectedMedia.type === 'video' ? 'flex items-center justify-center' : ''
            }`} 
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
          >
            <div className={`bg-white rounded-2xl overflow-hidden ${
              selectedMedia.type === 'video' ? 'max-w-4xl' : ''
            }`}>
                <div className="relative">
                  {selectedMedia.type === 'video' && selectedMedia.videoUrl ? (
                    <div className="flex items-center justify-center bg-black">
                      <VideoPlayer
                        src={selectedMedia.videoUrl}
                        poster={selectedMedia.fullSize}
                        title={selectedMedia.title}
                        className="max-h-[70vh]"
                        controls={true}
                        isVertical={selectedMedia.isVertical}
                        lazy={false}
                      />
                    </div>
                  ) : (
                    <LazyImage
                      src={selectedMedia.fullSize}
                      alt={selectedMedia.title}
                      className="w-full h-auto max-h-[70vh] object-contain"
                    />
                  )}
                  
                  <motion.button
                    onClick={closeModal}
                    className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200 z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-gray-700 text-xl font-bold">×</span>
                  </motion.button>
                </div>
                
                <motion.div 
                  className="p-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedMedia.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="capitalize">{selectedMedia.category.replace('-', ' ')}</span>
                        <span>•</span>
                        <span>{new Date(selectedMedia.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedMedia.type === 'video' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedMedia.type === 'video' ? 'Video' : 'Photo'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{selectedMedia.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedMedia.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
    </div>
  );
};

export default ResponsiveGallery;