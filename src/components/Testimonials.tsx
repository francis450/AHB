import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      review: "Absolutely amazing service! Alicia transformed my hair completely. The attention to detail and professionalism is unmatched.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
      service: "Hair Styling"
    },
    {
      id: 2,
      name: "Grace Wanjiku",
      rating: 5,
      review: "The wig installation was flawless! I've never felt more confident. The quality of service here is exceptional.",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
      service: "Wig Installation"
    },
    {
      id: 3,
      name: "Mary Kamau",
      rating: 5,
      review: "Professional, clean, and luxurious. The hair treatment made my natural hair so much healthier. Highly recommended!",
      image: "https://images.pexels.com/photos/1181524/pexels-photo-1181524.jpeg?auto=compress&cs=tinysrgb&w=200",
      service: "Hair Treatment"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-10"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300 rounded-full opacity-15"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-yellow-600">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from our valued clients who trust us with their beauty journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="bg-yellow-600 rounded-full p-3">
                  <Quote className="text-white" size={20} />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < testimonial.rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-6 leading-relaxed text-lg italic">
                "{testimonial.review}"
              </p>

              {/* Client Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-yellow-600 text-sm font-semibold">{testimonial.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to experience the Alicia difference?
          </h3>
          <p className="text-gray-600 mb-6">
            Join hundreds of satisfied clients who trust us with their beauty needs
          </p>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
            Book Your Appointment Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;