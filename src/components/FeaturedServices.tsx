import React from 'react';
import { Scissors, Sparkles, Crown, Heart } from 'lucide-react';
import { useUI } from '../context/UIContext';

const FeaturedServices = () => {
  const { openBooking } = useUI();

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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-yellow-600">Signature Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our range of premium beauty services designed to enhance your natural elegance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute top-4 right-4 bg-white rounded-full p-2">
                  {service.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-yellow-600">{service.price}</span>
                <button
                  onClick={openBooking}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;