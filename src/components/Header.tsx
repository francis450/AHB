import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const { openCart, openBooking } = useUI();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                {/* replace with logo image - https://alicia.boraerp.co.ke/files/logo.png */}
                <img src="https://alicia.boraerp.co.ke/files/logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-yellow-600" style={{ fontFamily: 'Yellowtail, cursive' }}>
                alicia
              </h1>
              <p className="text-xs text-gray-600 -mt-1">Hairline & Beauty</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-yellow-600 border-b-2 border-yellow-600 pb-1'
                    : 'text-gray-700 hover:text-yellow-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={openBooking}
              className="hidden md:flex items-center space-x-2 bg-yellow-600 text-white px-4 py-2 rounded-full hover:bg-yellow-700 transition-colors duration-200"
            >
              <Calendar size={16} />
              <span>Book Now</span>
            </button>
            
            <button
              onClick={openCart}
              className="relative p-2 text-gray-700 hover:text-yellow-600 transition-colors duration-200"
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-yellow-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-yellow-600 bg-yellow-50'
                    : 'text-gray-700 hover:text-yellow-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                openBooking();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-yellow-600 text-white px-4 py-2 rounded-full hover:bg-yellow-700 transition-colors duration-200 mt-4"
            >
              <Calendar size={16} />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;