import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Calendar } from 'lucide-react';
import { useUI } from '../context/UIContext';
import InteractiveMap from '../components/InteractiveMap';
import { 
  useScrollAnimation, 
  slideUpVariants, 
  slideInLeftVariants,
  slideInRightVariants,
  containerVariants,
  staggeredChildrenVariants,
  fadeInVariants
} from '../hooks/useScrollAnimation';

const Contact = () => {
  const { openBooking } = useUI();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // Animation hooks
  const { ref: heroRef, controls: heroControls } = useScrollAnimation();
  const { ref: contactInfoRef, controls: contactInfoControls } = useScrollAnimation();
  const { ref: formRef, controls: formControls } = useScrollAnimation();
  const { ref: mapRef, controls: mapControls } = useScrollAnimation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const workingHours = [
    { day: 'Monday', hours: '8:00 AM - 8:00 PM', isOpen: true },
    { day: 'Tuesday', hours: '8:00 AM - 8:00 PM', isOpen: true },
    { day: 'Wednesday', hours: '8:00 AM - 8:00 PM', isOpen: true },
    { day: 'Thursday', hours: '8:00 AM - 8:00 PM', isOpen: true },
    { day: 'Friday', hours: '8:00 AM - 8:00 PM', isOpen: true },
    { day: 'Saturday', hours: '8:00 AM - 8:00 PM', isOpen: true },
    { day: 'Sunday', hours: '10:00 AM - 6:00 PM', isOpen: true }
  ];

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
            Get in <span className="text-yellow-600" style={{ fontFamily: 'Yellowtail, cursive' }}>Touch</span>
          </motion.h1>
          <motion.p 
            variants={staggeredChildrenVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            We're here to help with all your beauty needs. Reach out to us for appointments, 
            consultations, or any questions about our services and products.
          </motion.p>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div 
            ref={contactInfoRef}
            initial="hidden"
            animate={contactInfoControls}
            variants={slideInLeftVariants}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900 text-white rounded-2xl p-8">
              <motion.h2 
                variants={staggeredChildrenVariants}
                className="text-2xl font-bold text-yellow-400 mb-6"
              >
                Contact Information
              </motion.h2>
              
              <motion.div 
                variants={containerVariants}
                className="space-y-6"
              >
                <motion.div 
                  variants={staggeredChildrenVariants}
                  className="flex items-start space-x-4"
                >
                  <MapPin className="text-yellow-400 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-gray-300">
                      Nairobi, Nairobi County<br />
                      Kenya
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={staggeredChildrenVariants}
                  className="flex items-start space-x-4"
                >
                  <Phone className="text-yellow-400 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-300">+254 7115131131</p>
                    <p className="text-gray-400 text-sm mt-1">Available during business hours</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={staggeredChildrenVariants}
                  className="flex items-start space-x-4"
                >
                  <Mail className="text-yellow-400 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-300">info@aliciahairline.com</p>
                    <p className="text-gray-400 text-sm mt-1">We respond within 24 hours</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={staggeredChildrenVariants}
                className="mt-8 pt-8 border-t border-gray-700"
              >
                <h3 className="font-semibold mb-4 flex items-center">
                  <Clock className="text-yellow-400 mr-2" size={20} />
                  Business Hours
                </h3>
                <div className="space-y-2">
                  {workingHours.map((schedule, index) => (
                    <motion.div 
                      key={index} 
                      className="flex justify-between text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      <span className="text-gray-300">{schedule.day}</span>
                      <span className="text-yellow-400 font-medium">{schedule.hours}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.div 
                  variants={staggeredChildrenVariants}
                  className="mt-4 p-3 bg-yellow-900 bg-opacity-30 rounded-lg border border-yellow-600"
                >
                  <p className="text-yellow-400 text-sm">
                    <strong>Special Hours:</strong> Early (before 8 AM) or late (after 8 PM) appointments 
                    available with an additional fee of Ksh 500.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={staggeredChildrenVariants}
                className="mt-8"
              >
                <motion.button
                  onClick={openBooking}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar size={20} />
                  <span>Book Appointment</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            ref={formRef}
            initial="hidden"
            animate={formControls}
            variants={slideInRightVariants}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <motion.div 
                variants={staggeredChildrenVariants}
                className="flex items-center mb-6"
              >
                <MessageCircle className="text-yellow-600 mr-3" size={32} />
                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
              </motion.div>

              <motion.form 
                onSubmit={handleSubmit} 
                variants={containerVariants}
                className="space-y-6"
              >
                <motion.div 
                  variants={staggeredChildrenVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                </motion.div>

                <motion.div 
                  variants={staggeredChildrenVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <motion.input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                      placeholder="+254 7115131131"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <motion.select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                      whileFocus={{ scale: 1.02 }}
                    >
                      <option value="">Select a subject</option>
                      <option value="appointment">Appointment Booking</option>
                      <option value="services">Services Inquiry</option>
                      <option value="products">Product Information</option>
                      <option value="complaint">Complaint</option>
                      <option value="general">General Inquiry</option>
                    </motion.select>
                  </div>
                </motion.div>

                <motion.div variants={staggeredChildrenVariants}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Please share your message, questions, or any specific requirements..."
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  variants={staggeredChildrenVariants}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <motion.section 
        ref={mapRef}
        initial="hidden"
        animate={mapControls}
        variants={fadeInVariants}
        className="py-20 bg-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2 
              variants={staggeredChildrenVariants}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Visit Our <span className="text-yellow-600" style={{ fontFamily: 'Yellowtail, cursive' }}>Salon</span>
            </motion.h2>
            <motion.p 
              variants={staggeredChildrenVariants}
              className="text-xl text-gray-600"
            >
              Located in the heart of Nairobi, we're easily accessible and ready to serve you
            </motion.p>
          </motion.div>

          <motion.div 
            variants={staggeredChildrenVariants}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <InteractiveMap
              center={[-1.286389, 36.817223]}
              zoom={15}
              markerPosition={[-1.286389, 36.817223]}
              popupContent="Alicia Hairline Beauty Salon"
              className="h-96 w-full"
            />
            
            {/* Map overlay with additional info */}
            <motion.div 
              className="p-6 bg-white"
              variants={staggeredChildrenVariants}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="text-yellow-600 mx-auto mb-2" size={24} />
                  <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                  <p className="text-gray-600 text-sm">Nairobi, Nairobi County, Kenya</p>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Clock className="text-yellow-600 mx-auto mb-2" size={24} />
                  <h4 className="font-semibold text-gray-900 mb-1">Hours</h4>
                  <p className="text-gray-600 text-sm">Mon-Sat: 8AM-8PM<br />Sun: 10AM-6PM</p>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone className="text-yellow-600 mx-auto mb-2" size={24} />
                  <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                  <p className="text-gray-600 text-sm">+254 7115131131</p>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-6 pt-6 border-t border-gray-200 text-center"
                variants={staggeredChildrenVariants}
              >
                <motion.button 
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center space-x-2 transition-all duration-200"
                  onClick={() => window.open('https://maps.google.com/?q=-1.286389,36.817223', '_blank')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MapPin size={18} />
                  <span>Get Directions</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;