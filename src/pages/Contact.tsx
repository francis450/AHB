import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Calendar } from 'lucide-react';
import { useUI } from '../context/UIContext';

const Contact = () => {
  const { openBooking } = useUI();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

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
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in <span className="text-yellow-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're here to help with all your beauty needs. Reach out to us for appointments, 
            consultations, or any questions about our services and products.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 text-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-yellow-400 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-gray-300">
                      Nairobi, Nairobi County<br />
                      Kenya
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="text-yellow-400 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-300">+254 XXX XXX XXX</p>
                    <p className="text-gray-400 text-sm mt-1">Available during business hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="text-yellow-400 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-300">info@aliciahairline.com</p>
                    <p className="text-gray-400 text-sm mt-1">We respond within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Clock className="text-yellow-400 mr-2" size={20} />
                  Business Hours
                </h3>
                <div className="space-y-2">
                  {workingHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-300">{schedule.day}</span>
                      <span className="text-yellow-400 font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-yellow-900 bg-opacity-30 rounded-lg border border-yellow-600">
                  <p className="text-yellow-400 text-sm">
                    <strong>Special Hours:</strong> Early (before 8 AM) or late (after 8 PM) appointments 
                    available with an additional fee of Ksh 500.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={openBooking}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all duration-200"
                >
                  <Calendar size={20} />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <MessageCircle className="text-yellow-600 mr-3" size={32} />
                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                      placeholder="+254 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select a subject</option>
                      <option value="appointment">Appointment Booking</option>
                      <option value="services">Services Inquiry</option>
                      <option value="products">Product Information</option>
                      <option value="complaint">Complaint</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Please share your message, questions, or any specific requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Visit Our <span className="text-yellow-600">Salon</span>
            </h2>
            <p className="text-xl text-gray-600">
              Located in the heart of Nairobi, we're easily accessible and ready to serve you
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="text-yellow-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Map</h3>
                <p className="text-gray-600">
                  Nairobi, Nairobi County, Kenya
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Map integration would be implemented here
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;