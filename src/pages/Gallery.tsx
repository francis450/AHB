import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { 
  useScrollAnimation, 
  slideUpVariants, 
  containerVariants,
  staggeredChildrenVariants,
  scaleInVariants
} from '../hooks/useScrollAnimation';
import ResponsiveGallery from '../components/ResponsiveGallery';

const Gallery = () => {
  const { ref: socialRef, controls: socialControls } = useScrollAnimation();

  return (
    <div>
      {/* Use the ResponsiveGallery component which handles mobile optimization */}
      <ResponsiveGallery />

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
              { icon: Instagram, href: 'https://www.instagram.com/aliciahairline.ke/', label: 'Instagram' },
              { icon: Facebook, href: '#', label: 'Facebook' },
              { icon: Twitter, href: '#', label: 'Twitter' }
            ].map((social, index) => (
              <motion.a 
                key={index}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : '_self'}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                variants={staggeredChildrenVariants}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
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
            onClick={() => window.open('https://www.instagram.com/aliciahairline.ke/', '_blank')}
          >
            Follow @AliciaHairlineBeauty
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default Gallery;