import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  {/* replace with logo image - https://alicia.boraerp.co.ke/files/logo.png */}
                  <img src="https://alicia.boraerp.co.ke/files/logo.png" alt="Logo" className="w-6 h-6 rounded-full" />
                  {/* <span className="text-yellow-600 font-bold text-sm">A</span> */}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-400" style={{ fontFamily: 'Yellowtail, cursive' }}>
                  alicia
                </h3>
                <p className="text-xs text-gray-300 -mt-1">Hairline & Beauty</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Your premier destination for luxury hair and beauty services in Nairobi. 
              Elevating beauty with elegance and professionalism.
            </p>
            <div className="flex space-x-3">
              <a target='_blank' href="https://www.instagram.com/aliciahairline.ke/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-yellow-400 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Our Services</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Products</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Gallery</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-yellow-400 mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">Hair Treatments</li>
              <li className="text-gray-300 text-sm">Professional Styling</li>
              <li className="text-gray-300 text-sm">Wig Installation</li>
              <li className="text-gray-300 text-sm">Beauty Services</li>
              <li className="text-gray-300 text-sm">Hair Extensions</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-yellow-400 mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="text-yellow-400 mt-1" size={16} />
                <p className="text-gray-300 text-sm">
                  Rm312, 3rd floor Old Mutual Building, along Kimathi street
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-yellow-400" size={16} />
                <p className="text-gray-300 text-sm">+254 712 676182</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-yellow-400" size={16} />
                <p className="text-gray-300 text-sm">aliciahairlinebeauty@gmail.com</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="text-yellow-400 mt-1" size={16} />
                <div className="text-gray-300 text-sm">
                  <p>Mon-Sat: 8:00 AM - 8:00 PM</p>
                  <p>Sun: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Alicia Hairline & Beauty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;