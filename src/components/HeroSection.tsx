import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { useUI } from '../context/UIContext';

const HeroSection = () => {
  const { openBooking } = useUI();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Gradient overlay bubbles for depth */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)'
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-8"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 60%)'
        }}
        animate={{ 
          scale: [1, 0.8, 1],
          opacity: [0.08, 0.18, 0.08]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-3"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 80%)'
        }}
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1],
          opacity: [0.03, 0.08, 0.03]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear"
        }}
      />
      
      {/* Content */}
      <motion.div 
        className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
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
            style={{ fontFamily: 'cursive' }}
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
    </section>
  );
};

export default HeroSection;