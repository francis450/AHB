import React, { useState } from 'react';
import { ShoppingBag, Star, Filter, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Products = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'wigs', name: 'Wig Caps' },
    { id: 'adhesives', name: 'Lace Glue' },
    { id: 'haircare', name: 'Hair Care' },
    { id: 'styling', name: 'Styling Products' },
    { id: 'tools', name: 'Tools & Accessories' }
  ];

  const products = [
    {
      id: 1,
      name: 'Premium Wig Cap',
      category: 'wigs',
      price: 50,
      originalPrice: 80,
      rating: 5,
      reviews: 24,
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'High-quality wig cap for secure and comfortable wig application.',
      inStock: true,
      bestseller: true
    },
    {
      id: 2,
      name: 'Professional Lace Glue',
      category: 'adhesives',
      price: 1500,
      originalPrice: null,
      rating: 4.8,
      reviews: 18,
      image: 'https://images.pexels.com/photos/5240834/pexels-photo-5240834.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Strong-hold adhesive for lace front wigs with waterproof formula.',
      inStock: true,
      bestseller: false
    },
    {
      id: 3,
      name: 'Nourishing Hair Serum',
      category: 'haircare',
      price: 400,
      originalPrice: 600,
      rating: 4.9,
      reviews: 31,
      image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Lightweight serum that adds shine and protects against heat damage.',
      inStock: true,
      bestseller: true
    },
    {
      id: 4,
      name: 'Luxury Shampoo Set',
      category: 'haircare',
      price: 1200,
      originalPrice: null,
      rating: 5,
      reviews: 15,
      image: 'https://images.pexels.com/photos/4465830/pexels-photo-4465830.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Professional shampoo and conditioner set for all hair types.',
      inStock: true,
      bestseller: false
    },
    {
      id: 5,
      name: 'Heat Protectant Spray',
      category: 'styling',
      price: 350,
      originalPrice: null,
      rating: 4.7,
      reviews: 22,
      image: 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Protects hair from heat damage up to 230°C with lightweight formula.',
      inStock: true,
      bestseller: false
    },
    {
      id: 6,
      name: 'Wide Tooth Comb Set',
      category: 'tools',
      price: 150,
      originalPrice: 200,
      rating: 4.6,
      reviews: 8,
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Set of professional wide tooth combs for detangling without damage.',
      inStock: false,
      bestseller: false
    },
    {
      id: 7,
      name: 'Moisturizing Hair Mask',
      category: 'haircare',
      price: 800,
      originalPrice: null,
      rating: 4.8,
      reviews: 19,
      image: 'https://images.pexels.com/photos/4465830/pexels-photo-4465830.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Deep conditioning mask for dry and damaged hair repair.',
      inStock: true,
      bestseller: true
    },
    {
      id: 8,
      name: 'Satin Hair Bonnet',
      category: 'tools',
      price: 300,
      originalPrice: null,
      rating: 4.9,
      reviews: 26,
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Satin-lined bonnet to protect hair while sleeping.',
      inStock: true,
      bestseller: false
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Premium <span className="text-yellow-600">Beauty Products</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Carefully curated collection of professional-grade hair care and beauty products 
            for salon-quality results at home.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProducts.length} products
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  {/* Flower Background Effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-pink-100 to-yellow-100 opacity-30"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-8-6-14-14-14s-14 6-14 14 6 14 14 14 14-6 14-14zm14 0c0-8-6-14-14-14s-14 6-14 14 6 14 14 14 14-6 14-14z'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.bestseller && (
                      <span className="bg-yellow-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Bestseller
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Sale
                      </span>
                    )}
                  </div>

                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Rating */}
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
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-yellow-600">Ksh {product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          Ksh {product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={`w-full px-4 py-3 rounded-full font-semibold text-sm flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 ${
                      product.inStock
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingBag size={16} />
                    <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Stay Updated with <span className="text-yellow-400">New Products</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Be the first to know about new arrivals, exclusive deals, and beauty tips.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-l-full sm:rounded-r-none rounded-r-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button className="bg-yellow-600 hover:bg-yellow-700 px-8 py-3 rounded-r-full sm:rounded-l-none rounded-l-full font-semibold transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;