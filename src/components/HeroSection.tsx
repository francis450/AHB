import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { useUI } from '../context/UIContext';
import VideoBanner from './VideoBanner';

const HeroSection = () => {
  const { openBooking } = useUI();

  return (
    <VideoBanner
      videoSrc="/gallery/videos/home-banner/IMG_8923.mp4"
      fallbackImage="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
      className="h-screen flex items-center justify-center"
      overlayOpacity={0.4}
    >
      <motion.div
        className="text-center text-white max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.span 
            className="text-yellow-400" 
            style={{ fontFamily: 'Yellowtail, cursive' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Alicia
          </motion.span>
          <br />
          <motion.span 
            className="text-white text-3xl md:text-4xl font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            Hairline & Beauty
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          Where luxury meets elegance. Experience premium hair and beauty services 
          that elevate your natural beauty.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.button
            onClick={openBooking}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar size={20} />
            <span>Book Appointment</span>
          </motion.button>
          
          <motion.button 
            className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { window.location.href = '/services'; }}
          >
            <span>View Services</span>
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating Elements - Enhanced Bubbles */}
      {/* Large primary bubbles */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-16 h-16 bg-yellow-400 rounded-full opacity-30"
        animate={{ 
          y: [0, 15, 0],
          scale: [1, 0.9, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute top-1/2 right-20 w-12 h-12 bg-white rounded-full opacity-10"
        animate={{ 
          y: [0, -30, 0],
          x: [0, 10, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Additional floating bubbles */}
      <motion.div 
        className="absolute top-32 right-1/4 w-8 h-8 bg-yellow-300 rounded-full opacity-25"
        animate={{ 
          y: [0, -25, 0],
          x: [0, -15, 0],
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.45, 0.25]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      <motion.div 
        className="absolute bottom-32 left-1/4 w-14 h-14 bg-white rounded-full opacity-15"
        animate={{ 
          y: [0, 20, 0],
          x: [0, 12, 0],
          scale: [1, 0.8, 1],
          opacity: [0.15, 0.35, 0.15]
        }}
        transition={{ 
          duration: 4.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1.5
        }}
      />

      <motion.div 
        className="absolute top-1/4 left-16 w-6 h-6 bg-yellow-500 rounded-full opacity-20"
        animate={{ 
          y: [0, -18, 0],
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2.5
        }}
      />

      <motion.div 
        className="absolute bottom-1/4 right-16 w-10 h-10 bg-yellow-200 rounded-full opacity-30"
        animate={{ 
          y: [0, 22, 0],
          x: [0, -8, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 5.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 3
        }}
      />

      {/* Small accent bubbles */}
      <motion.div 
        className="absolute top-40 left-1/3 w-4 h-4 bg-white rounded-full opacity-20"
        animate={{ 
          y: [0, -12, 0],
          x: [0, 8, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 3.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1.2
        }}
      />

      <motion.div 
        className="absolute bottom-40 right-1/3 w-5 h-5 bg-yellow-400 rounded-full opacity-25"
        animate={{ 
          y: [0, 16, 0],
          scale: [1, 1.4, 1],
          opacity: [0.25, 0.45, 0.25]
        }}
        transition={{ 
          duration: 4.2, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.8
        }}
      />

      <motion.div 
        className="absolute top-2/3 left-8 w-7 h-7 bg-yellow-300 rounded-full opacity-18"
        animate={{ 
          y: [0, -20, 0],
          x: [0, 15, 0],
          scale: [1, 0.9, 1],
          opacity: [0.18, 0.38, 0.18]
        }}
        transition={{ 
          duration: 6.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2.8
        }}
      />

      <motion.div 
        className="absolute top-16 right-8 w-9 h-9 bg-white rounded-full opacity-12"
        animate={{ 
          y: [0, 25, 0],
          x: [0, -20, 0],
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.32, 0.12],
          rotate: [0, -90, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1.8
        }}
      />

      {/* Tiny floating particles */}
      <motion.div 
        className="absolute top-1/3 right-1/5 w-3 h-3 bg-yellow-500 rounded-full opacity-30"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.3
        }}
      />

      <motion.div 
        className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-white rounded-full opacity-25"
        animate={{ 
          y: [0, 14, 0],
          x: [0, 6, 0],
          opacity: [0.25, 0.5, 0.25]
        }}
        transition={{ 
          duration: 3.8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2.2
        }}
      />

      <motion.div 
        className="absolute top-3/4 right-1/6 w-2 h-2 bg-yellow-400 rounded-full opacity-35"
        animate={{ 
          y: [0, -8, 0],
          scale: [1, 1.5, 1],
          opacity: [0.35, 0.65, 0.35]
        }}
        transition={{ 
          duration: 2.2, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1.6
        }}
      />

      <motion.div 
        className="absolute top-1/6 left-1/6 w-2 h-2 bg-white rounded-full opacity-28"
        animate={{ 
          y: [0, 12, 0],
          x: [0, -4, 0],
          opacity: [0.28, 0.55, 0.28]
        }}
        transition={{ 
          duration: 4.8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 3.5
        }}
      />
    </VideoBanner>
  );
};

export default HeroSection;