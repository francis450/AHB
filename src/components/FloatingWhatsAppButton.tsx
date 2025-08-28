import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Clock, Calendar, Star } from 'lucide-react';

const FloatingWhatsAppButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Show button after user scrolls down a bit
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // WhatsApp number (replace with actual business number)
  const whatsappNumber = "+254712676182"; // Replace with actual number
  
  const quickMessages = [
    {
      icon: <Calendar size={16} />,
      text: "Book Appointment",
      message: "Hello! I'd like to book an appointment. Could you please let me know your available slots?"
    },
    {
      icon: <Star size={16} />,
      text: "Service Inquiry", 
      message: "Hi! I'm interested in your beauty services. Could you please provide more information about your offerings and prices?"
    },
    {
      icon: <Phone size={16} />,
      text: "General Question",
      message: "Hello! I have some questions about your services. Could you please help me?"
    }
  ];
  
  const handleWhatsAppClick = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsExpanded(false);
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 max-w-sm"
              >
            {/* Close button */}
            <button
              onClick={handleToggle}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <MessageCircle className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Alicia Hairline Beauty</h3>
                <div className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Online
                </div>
              </div>
            </div>

            {/* Message */}
            <p className="text-gray-600 text-sm mb-4">
              Hi there! 👋 How can we help you today? Feel free to reach out on WhatsApp for quick assistance.
            </p>

            {/* Business hours */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Clock size={14} className="mr-2" />
                Business Hours
              </div>
              <div className="text-xs text-gray-500">
                Mon-Sat: 8:00 AM - 8:00 PM<br />
                Sun: 10:00 AM - 6:00 PM
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="space-y-2 mb-4">
              {quickMessages.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleWhatsAppClick(item.message)}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 px-3 rounded-lg flex items-center space-x-2 transition-colors duration-200 text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <span className="text-yellow-600">{item.icon}</span>
                  <span>{item.text}</span>
                </motion.button>
              ))}
            </div>

            {/* WhatsApp button */}
            <motion.button
              onClick={() => handleWhatsAppClick(quickMessages[1].message)}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp</span>
            </motion.button>

            {/* Alternative contact */}
            <div className="mt-3 text-center">
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center space-x-1">
                <Phone size={14} />
                <span>Or call us: {whatsappNumber}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button */}
      <motion.button
        onClick={handleToggle}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isExpanded 
            ? 'bg-gray-600 hover:bg-gray-700' 
            : 'bg-green-500 hover:bg-green-600'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isExpanded ? 45 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {isExpanded ? (
          <X className="text-white" size={24} />
        ) : (
          <>
            <MessageCircle className="text-white" size={24} />
            {/* Pulse animation */}
            <motion.div
              className="absolute inset-0 rounded-full bg-green-400"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}
      </motion.button>

      {/* Notification badge */}
      {!isExpanded && (
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingWhatsAppButton;
