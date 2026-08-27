import { useUI } from '../context/UIContext';
import { priceListCategories } from '../data/priceListData';

const Services = () => {
  const { openBooking } = useUI();

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

      {/* Price List */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {priceListCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gray-900 px-6 py-4 sm:px-8">
                <h2 className="text-xl font-bold text-yellow-400">{category.name}</h2>
              </div>
              <div className="px-6 py-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10">
                {category.items.map((item) => (
                  <div key={item.name} className="flex items-baseline justify-between gap-3 border-b border-dashed border-gray-200 py-3">
                    <span className="text-gray-800">{item.name}</span>
                    <span className="whitespace-nowrap font-semibold text-yellow-700">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
