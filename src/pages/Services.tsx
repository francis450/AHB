import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { priceListCategories } from '../data/priceListData';
import { categoryIcons, getServiceIcon } from '../lib/serviceIcons';

const Services = () => {
  const { openBooking } = useUI();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterButtons = [{ id: 'all', name: 'All Services' }, ...priceListCategories.map((category) => ({ id: category.id, name: category.name }))];

  const filteredCategories = priceListCategories
    .filter((category) => selectedCategory === 'all' || category.id === selectedCategory)
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
    }))
    .filter((category) => category.items.length > 0);

  const totalResults = filteredCategories.reduce((total, category) => total + category.items.length, 0);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="py-20 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/shop.jpg')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-yellow-400" style={{ fontFamily: 'Yellowtail, cursive' }}>Premium Services</span>
          </h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto mb-8">
            Our full price list, so you know exactly what to expect before you book.
          </p>
          <button
            onClick={openBooking}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105"
          >
            Book Consultation
          </button>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {filterButtons.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedCategory(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === filter.id
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {totalResults} service{totalResults === 1 ? '' : 's'}
          </div>
        </div>
      </section>

      {/* Price List */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No services found matching your search.</p>
              <p className="text-gray-400 text-sm mt-2">Try a different keyword or category.</p>
            </div>
          )}
          {filteredCategories.map((category) => {
            const CategoryIcon = categoryIcons[category.id] ?? Sparkles;
            return (
              <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gray-900 px-6 py-4 sm:px-8 flex items-center gap-3">
                  <CategoryIcon className="text-yellow-400" size={22} />
                  <h2 className="text-xl font-bold text-yellow-400">{category.name}</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 sm:px-8 lg:grid-cols-4">
                  {category.items.map((item) => {
                    const Icon = getServiceIcon(item.name);
                    return (
                      <div key={item.name} className="flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-center transition-colors hover:border-yellow-200 hover:bg-yellow-50">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700"><Icon size={20} /></div>
                        <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm font-bold text-yellow-700">{item.price}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <p className="text-center text-sm text-gray-500">Prices are subject to change. Ask us to confirm the price for your specific hair length/type when you book.</p>
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
