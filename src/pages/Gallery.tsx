import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Play, Instagram, Facebook, Twitter } from 'lucide-react';
import {
  useScrollAnimation,
  slideUpVariants,
  containerVariants,
  staggeredChildrenVariants,
  scaleInVariants
} from '../hooks/useScrollAnimation';
import { galleryItems, GalleryItem } from '../data/galleryData';
import VideoPlayer from '../components/VideoPlayer';
import LazyImage from '../components/LazyImage';
import VideoThumbnail from '../components/VideoThumbnail';

const Gallery = () => {
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);

  const { ref: heroRef, controls: heroControls } = useScrollAnimation();
  const { ref: galleryRef, controls: galleryControls } = useScrollAnimation();
  const { ref: socialRef, controls: socialControls } = useScrollAnimation();

  const openModal = (item: GalleryItem) => {
    setSelectedMedia(item);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={staggeredChildrenVariants}
                custom={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform group cursor-pointer h-full"
                onClick={() => openModal(item)}
                whileHover={{
                  y: -4,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative overflow-hidden">
                  <div className="relative w-full h-64">
                    {item.type === 'video' ? (
                      <VideoThumbnail
                        videoSrc={item.videoUrl || ''}
                        fallbackImage={item.thumbnail}
                        title={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400"
                        lazy={index > 5} // Lazy load items after the first 6
                        priority={index < 6}
                        quality={0.8}
                        maxWidth={400}
                      />
                    ) : (
                      <LazyImage
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400"
                      />
                    )}

                    {/* Video overlay */}
                    {item.type === 'video' && (
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
                </div>

                {/* Content section */}
                <motion.div
                  className="p-6"
                  variants={staggeredChildrenVariants}
                >
                  <motion.h3
                    className="text-xl font-bold text-gray-900 mb-2 line-clamp-2"
                    variants={staggeredChildrenVariants}
                  >
                    {item.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3"
                    variants={staggeredChildrenVariants}
                  >
                    {item.description}
                  </motion.p>

                  {/* Tags */}
                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={staggeredChildrenVariants}
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
              </motion.div>
            ))}
          </motion.div>

          {galleryItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">No gallery items available.</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon for new content.</p>
            </motion.div>
          )}
        </div>
      </motion.section>
      {/* Social Media Section */}
      <motion.section 
        ref={socialRef}
        initial="hidden"
        animate={socialControls}
        variants={slideUpVariants}
        className="py-20 bg-gray-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            variants={staggeredChildrenVariants}
            className="text-4xl font-bold mb-4"
          >
            Follow Us on <span className="text-yellow-400" style={{ fontFamily: 'Yellowtail, cursive' }}>Social Media</span>
          </motion.h2>
          <motion.p 
            variants={staggeredChildrenVariants}
            className="text-xl text-gray-300 mb-8"
          >
            Stay connected and see our latest work, tips, and behind-the-scenes content
          </motion.p>
          
          <motion.div
            variants={containerVariants}
            className="flex justify-center space-x-8 mb-8"
          >
            {[
              {
                name: 'Instagram',
                href: "https://www.instagram.com/aliciahairline.ke?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
                bgColor: 'bg-pink-600',
                hoverColor: 'hover:bg-pink-700',
                icon: Instagram
              },
              {
                name: 'Facebook',
                href: '#',
                bgColor: 'bg-blue-600',
                hoverColor: 'hover:bg-blue-700',
                icon: Facebook
              },
              {
                name: 'Twitter',
                href: '#',
                bgColor: 'bg-sky-500',
                hoverColor: 'hover:bg-sky-600',
                icon: Twitter
              }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className={`${social.bgColor} ${social.hoverColor} text-white rounded-full p-3 transition-all duration-200 flex items-center justify-center`}
                variants={staggeredChildrenVariants}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Follow us on ${social.name}`}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i} 
                variants={scaleInVariants}
                className="aspect-square rounded-lg overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={`https://images.pexels.com/photos/${3065209 + i}/pexels-photo-${3065209 + i}.jpeg?auto=compress&cs=tinysrgb&w=300`}
                  alt={`Instagram post ${i}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.button 
            variants={staggeredChildrenVariants}
            className="mt-8 bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://www.instagram.com/aliciahairline.ke?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', '_blank')}
          >
            Follow @AliciaHairlineBeauty
          </motion.button>
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
        >        <motion.div 
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
                      poster={selectedMedia.fullSize || selectedMedia.thumbnail}
                      title={selectedMedia.title}
                      className="max-h-[70vh]"
                      controls={true}
                      isVertical={selectedMedia.isVertical}
                      lazy={false}
                      onLoadStart={() => console.log('Loading video:', selectedMedia.videoUrl)}
                      onCanPlay={() => console.log('Video ready to play:', selectedMedia.videoUrl)}
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
                      {selectedMedia.type === 'video' && selectedMedia.duration && (
                        <>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{selectedMedia.duration}</span>
                          </span>
                        </>
                      )}
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
                
                {/* Tags */}
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

export default Gallery;