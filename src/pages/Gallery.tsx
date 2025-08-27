import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Filter, Instagram, Facebook, Twitter } from 'lucide-react';
import { 
  useScrollAnimation, 
  slideUpVariants, 
  slideInLeftVariants, 
  slideInRightVariants,
  fadeInVariants,
  containerVariants,
  staggeredChildrenVariants,
  scaleInVariants
} from '../hooks/useScrollAnimation';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const filters = [
    { id: 'all', name: 'All Media' },
    { id: 'images', name: 'Photos' },
    { id: 'videos', name: 'Videos' },
    { id: 'hair-styling', name: 'Hair Styling' },
    { id: 'wig-installation', name: 'Wig Installation' },
    { id: 'treatments', name: 'Treatments' },
    { id: 'before-after', name: 'Before & After' }
  ];

  const galleryItems = [
    {
      id: 1,
      type: 'image',
      category: 'hair-styling',
      title: 'Elegant Wedding Style',
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Beautiful bridal hairstyle for a perfect wedding day'
    },
    {
      id: 2,
      type: 'video',
      category: 'wig-installation',
      title: 'Premium Wig Installation Process',
      image: 'https://images.pexels.com/photos/3373727/pexels-photo-3373727.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.example.com/video1',
      description: 'Step-by-step wig installation demonstration'
    },
    {
      id: 3,
      type: 'image',
      category: 'treatments',
      title: 'Hair Treatment Results',
      image: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Amazing results from our deep conditioning treatment'
    },
    {
      id: 4,
      type: 'video',
      category: 'hair-styling',
      title: 'Quick Styling Tutorial',
      image: 'https://images.pexels.com/photos/3178786/pexels-photo-3178786.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.example.com/video2',
      description: 'Easy everyday styling tips and tricks'
    },
    {
      id: 5,
      type: 'image',
      category: 'before-after',
      title: 'Transformation Tuesday',
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Complete hair makeover transformation'
    },
    {
      id: 6,
      type: 'video',
      category: 'wig-installation',
      title: 'Customer Trying New Wig',
      image: 'https://images.pexels.com/photos/3373727/pexels-photo-3373727.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.example.com/video3',
      description: 'Happy customer experiencing our premium wig selection'
    },
    {
      id: 7,
      type: 'image',
      category: 'hair-styling',
      title: 'Natural Hair Styling',
      image: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Beautiful natural hair styling and care'
    },
    {
      id: 8,
      type: 'video',
      category: 'treatments',
      title: 'Hair Treatment Process',
      image: 'https://images.pexels.com/photos/4465830/pexels-photo-4465830.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.example.com/video4',
      description: 'Professional hair treatment in progress'
    },
    {
      id: 9,
      type: 'image',
      category: 'before-after',
      title: 'Color Transformation',
      image: 'https://images.pexels.com/photos/3178786/pexels-photo-3178786.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Stunning hair color transformation'
    }
  ];

  const { ref: heroRef, controls: heroControls } = useScrollAnimation();
  const { ref: filtersRef, controls: filtersControls } = useScrollAnimation();
  const { ref: galleryRef, controls: galleryControls } = useScrollAnimation();
  const { ref: socialRef, controls: socialControls } = useScrollAnimation();

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => 
        item.category === activeFilter || 
        (activeFilter === 'images' && item.type === 'image') ||
        (activeFilter === 'videos' && item.type === 'video')
      );

  const openModal = (item: any) => {
    setSelectedMedia(item);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={slideUpVariants}
        className="py-20 bg-gradient-to-br from-yellow-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            variants={staggeredChildrenVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Our <span className="text-yellow-600">Gallery</span>
          </motion.h1>
          <motion.p 
            variants={staggeredChildrenVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Explore our portfolio of stunning transformations, professional work, and behind-the-scenes moments. 
            See the artistry and skill that goes into every service we provide.
          </motion.p>
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
                <Filter size={16} />
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
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Overlay for videos */}
                  {item.type === 'video' && (
                    <motion.div 
                      className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
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

                  {/* Category Badge */}
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
            Follow Us on <span className="text-yellow-400">Social Media</span>
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
              { icon: Instagram, href: '#' },
              { icon: Facebook, href: '#' },
              { icon: Twitter, href: '#' }
            ].map((social, index) => (
              <motion.a 
                key={index}
                href={social.href} 
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                variants={staggeredChildrenVariants}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon size={32} />
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
        >
          <motion.div 
            className="max-w-4xl max-h-[90vh] mx-4" 
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
          >
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="relative">
                <motion.img
                  src={selectedMedia.image}
                  alt={selectedMedia.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                />
                <motion.button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </div>
              <motion.div 
                className="p-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedMedia.title}</h3>
                <p className="text-gray-600">{selectedMedia.description}</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;