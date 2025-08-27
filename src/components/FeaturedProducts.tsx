import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FeaturedProducts = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: "Premium Wig Cap",
      price: 50,
      originalPrice: 80,
      rating: 5,
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Accessories"
    },
    {
      id: 2,
      name: "Professional Lace Glue",
      price: 1500,
      originalPrice: null,
      rating: 4.8,
      image: "https://images.pexels.com/photos/5240834/pexels-photo-5240834.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Adhesives"
    },
    {
      id: 3,
      name: "Nourishing Hair Serum",
      price: 400,
      originalPrice: 600,
      rating: 4.9,
      image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Hair Care"
    },
    {
      id: 4,
      name: "Luxury Shampoo Set",
      price: 1200,
      originalPrice: null,
      rating: 5,
      image: "https://images.pexels.com/photos/4465830/pexels-photo-4465830.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Hair Care"
    }
  ];

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-yellow-600">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Premium quality hair and beauty products carefully selected for the best results
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden"
            >
              {/* Product Image with Flowers Background Effect */}
              <div className="relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-pink-100 to-yellow-100 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-yellow-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {product.category}
                </div>
                {product.originalPrice && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    SALE
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">{product.name}</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-yellow-600">Ksh {product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">Ksh {product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-full font-semibold text-sm flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105"
                >
                  <ShoppingBag size={16} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-transparent border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;