import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useUI } from '../context/UIContext';

const HeroSection = () => {
  const { openBooking } = useUI();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-yellow-400" style={{ fontFamily: 'cursive' }}>Alicia</span>
          <br />
          <span className="text-white text-3xl md:text-4xl font-light">Hairline & Beauty</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Where luxury meets elegance. Experience premium hair and beauty services 
          that elevate your natural beauty.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={openBooking}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105"
          >
            <Calendar size={20} />
            <span>Book Appointment</span>
          </button>
          
          <button className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105">
            <span>View Services</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-yellow-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-white rounded-full opacity-10 animate-bounce"></div>
    </section>
  );
};

export default HeroSection;