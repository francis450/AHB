import React, { useState } from 'react';
import { Scissors, Crown, Sparkles, Heart, Clock, Star } from 'lucide-react';
import { useUI } from '../context/UIContext';

const Services = () => {
  const { openBooking } = useUI();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const serviceCategories = [
    { id: 'all', name: 'All Services', icon: <Star size={20} /> },
    { id: 'hair', name: 'Hair Services', icon: <Scissors size={20} /> },
    { id: 'wigs', name: 'Wigs & Extensions', icon: <Crown size={20} /> },
    { id: 'treatments', name: 'Treatments', icon: <Sparkles size={20} /> },
    { id: 'beauty', name: 'Beauty Services', icon: <Heart size={20} /> }
  ];

  const services = [
    {
      id: 1,
      category: 'hair',
      name: 'Professional Hair Styling',
      description: 'Expert styling for any occasion, from everyday looks to special events. Includes wash, conditioning, and professional blow-dry.',
      price: 'From Ksh 2,000',
      duration: '1-2 hours',
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Professional consultation', 'Hair wash & condition', 'Custom styling', 'Finishing products']
    },
    {
      id: 2,
      category: 'wigs',
      name: 'Premium Wig Installation',
      description: 'Professional wig installation using high-quality human hair wigs. Includes cutting, styling, and blending for a natural look.',
      price: 'From Ksh 8,000',
      duration: '2-3 hours',
      image: 'https://images.pexels.com/photos/3373727/pexels-photo-3373727.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Quality human hair wigs', 'Professional installation', 'Custom cutting & styling', 'Aftercare instructions']
    },
    {
      id: 3,
      category: 'treatments',
      name: 'Deep Hair Treatment',
      description: 'Intensive treatment to restore damaged hair, add moisture, and promote healthy growth using premium products.',
      price: 'From Ksh 3,500',
      duration: '2 hours',
      image: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Hair analysis', 'Deep conditioning', 'Protein treatment', 'Scalp massage']
    },
    {
      id: 4,
      category: 'beauty',
      name: 'Professional Makeup',
      description: 'Expert makeup application for any occasion using high-end cosmetics. Perfect for events, photoshoots, or special occasions.',
      price: 'From Ksh 1,500',
      duration: '1 hour',
      image: 'https://images.pexels.com/photos/3178786/pexels-photo-3178786.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Skin preparation', 'Professional makeup', 'Touch-up kit', 'Aftercare tips']
    },
    {
      id: 5,
      category: 'wigs',
      name: 'Hair Extensions',
      description: 'Add length and volume with our premium hair extensions. Available in various textures and colors for a perfect match.',
      price: 'From Ksh 4,500',
      duration: '2-3 hours',
      image: 'https://images.pexels.com/photos/3178786/pexels-photo-3178786.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Color matching', 'Quality extensions', 'Professional application', 'Styling included']
    },
    {
      id: 6,
      category: 'treatments',
      name: 'Scalp Treatment',
      description: 'Therapeutic scalp treatments to address dryness, dandruff, and promote healthy hair growth.',
      price: 'From Ksh 2,500',
      duration: '1.5 hours',
      image: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Scalp analysis', 'Deep cleansing', 'Therapeutic massage', 'Custom treatment plan']
    },
    {
      id: 7,
      category: 'hair',
      name: 'Bridal Hair Styling',
      description: 'Complete bridal hair package including trial session and wedding day styling for your perfect look.',
      price: 'From Ksh 5,000',
      duration: '2-4 hours',
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Trial session', 'Wedding day styling', 'Hair accessories', 'Touch-up service']
    },
    {
      id: 8,
      category: 'beauty',
      name: 'Eyebrow Shaping',
      description: 'Professional eyebrow shaping and tinting to frame your face perfectly and enhance your natural beauty.',
      price: 'From Ksh 800',
      duration: '30 minutes',
      image: 'https://images.pexels.com/photos/3178786/pexels-photo-3178786.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Consultation', 'Precision shaping', 'Tinting option', 'Aftercare advice']
    }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-yellow-600" style={{ fontFamily: 'Yellowtail, cursive' }}>Premium Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover our comprehensive range of luxury hair and beauty services, 
            each designed to enhance your natural beauty with precision and care.
          </p>
          <button
            onClick={openBooking}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105"
          >
            Book Consultation
          </button>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                    
                    <div className="flex items-center space-x-6 mb-4">
                      <div className="flex items-center text-yellow-600">
                        <span className="font-bold text-xl">{service.price}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock size={16} className="mr-1" />
                        <span>{service.duration}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Includes:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={openBooking}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
                    >
                      Book This Service
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-yellow-400" style={{ fontFamily: 'Yellowtail, cursive' }}>Special</span> Offers
            </h2>
            <p className="text-xl text-gray-300">
              Take advantage of our exclusive packages and seasonal promotions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Bridal Package</h3>
              <p className="text-yellow-100 mb-4">
                Complete bridal beauty package including trial sessions, wedding day services, and touch-ups.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">Save 20%</span>
                <button className="bg-white text-yellow-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-600 to-purple-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Monthly Membership</h3>
              <p className="text-pink-100 mb-4">
                Get exclusive discounts and priority booking with our monthly membership program.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">From Ksh 5,000</span>
                <button className="bg-white text-pink-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;