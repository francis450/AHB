import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Sparkles, Crown, Heart } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { 
  useScrollAnimation, 
  slideUpVariants, 
  containerVariants,
  staggeredChildrenVariants,
  scaleInVariants
} from '../hooks/useScrollAnimation';

const FeaturedServices = () => {
  const { openBooking } = useUI();
  const { ref, controls } = useScrollAnimation();

  const services = [
    {
      icon: <Scissors className="text-yellow-600" size={40} />,
      title: "Professional Hair Styling",
      description: "Expert styling services for every occasion, from everyday looks to special events.",
      price: "From Ksh 2,000",
      image: "https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      icon: <Crown className="text-yellow-600" size={40} />,
      title: "Premium Wig Installation",
      description: "Luxury wig services with premium quality hair and professional installation.",
      price: "From Ksh 8,000",
      image: "https://images.pexels.com/photos/3373727/pexels-photo-3373727.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      icon: <Sparkles className="text-yellow-600" size={40} />,
      title: "Hair Treatments",
      description: "Restorative treatments that nourish and strengthen your natural hair.",
      price: "From Ksh 3,500",
      image: "https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      icon: <Heart className="text-yellow-600" size={40} />,
      title: "Beauty Services",
      description: "Complete beauty services including makeup, eyebrow shaping, and more.",
      price: "From Ksh 1,500",
      image: "https://images.pexels.com/photos/3178786/pexels-photo-3178786.jpeg?auto=compress&cs=tinysrgb&w=500"
    }
  ];

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={slideUpVariants}
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={staggeredChildrenVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Our <span className="text-yellow-600">Signature Services</span>
          </motion.h2>
          <motion.p 
            variants={staggeredChildrenVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover our range of premium beauty services designed to enhance your natural elegance
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={scaleInVariants}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative overflow-hidden rounded-xl mb-6">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-black bg-opacity-20"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute top-4 right-4 bg-white rounded-full p-2"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.icon}
                </motion.div>
              </div>

              <motion.h3 
                className="text-xl font-bold text-gray-900 mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                {service.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 mb-4 text-sm leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {service.description}
              </motion.p>
              
              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <span className="text-lg font-bold text-yellow-600">{service.price}</span>
                <motion.button
                  onClick={openBooking}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturedServices;