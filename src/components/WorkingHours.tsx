import React from 'react';
import { Clock, AlertCircle, Calendar } from 'lucide-react';

const WorkingHours = () => {
  const schedule = [
    { day: 'Monday', hours: '8:00 AM - 8:00 PM', isOpen: true },
    { day: 'Tuesday', hours: '8:00 AM - 8:00 PM', isOpen: true },
    { day: 'Wednesday', hours: '8:00 AM - 8:00 PM', isOpen: true },
    { day: 'Thursday', hours: '8:00 AM - 8:00 PM', isOpen: true },
    { day: 'Friday', hours: '8:00 AM - 8:00 PM', isOpen: true },
    { day: 'Saturday', hours: '8:00 AM - 8:00 PM', isOpen: true },
    { day: 'Sunday', hours: '10:00 AM - 6:00 PM', isOpen: true }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Working Hours */}
          <div>
            <div className="flex items-center mb-8">
              <Clock className="text-yellow-400 mr-3" size={32} />
              <h2 className="text-4xl font-bold">Working Hours</h2>
            </div>
            
            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
              <div className="space-y-4">
                {schedule.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0"
                  >
                    <span className="text-lg font-medium text-gray-300">{item.day}</span>
                    <span className={`text-lg font-bold ${item.isOpen ? 'text-yellow-400' : 'text-red-400'}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Special Notes */}
              <div className="mt-8 p-4 bg-yellow-900 bg-opacity-30 rounded-xl border border-yellow-600">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="text-yellow-400 mt-1" size={20} />
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-2">Special Rates</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Early appointments (before 8 AM) or late appointments (after 8 PM) are available 
                      with an additional fee of <span className="text-yellow-400 font-semibold">Ksh 500</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking CTA */}
          <div className="text-center lg:text-left">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Book Your <span className="text-yellow-400">Appointment?</span>
            </h3>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Experience luxury beauty services at your convenience. Our flexible scheduling 
              accommodates your busy lifestyle.
            </p>
            
            <div className="space-y-4">
              <button className="w-full lg:w-auto bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-3 transition-all duration-300 transform hover:scale-105">
                <Calendar size={24} />
                <span>Book Online Now</span>
              </button>
              
              <p className="text-gray-400 text-sm">
                Or call us at <span className="text-yellow-400 font-semibold">+254 7115131131</span>
              </p>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Professional Stylists</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Premium Products</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Flexible Scheduling</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Luxury Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingHours;