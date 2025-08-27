import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { 
  useScrollAnimation, 
  slideUpVariants, 
  containerVariants,
  staggeredChildrenVariants,
  scaleInVariants
} from '../hooks/useScrollAnimation';

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { ref, controls } = useScrollAnimation();

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
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={slideUpVariants}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={staggeredChildrenVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Featured <span className="text-yellow-600">Products</span>
          </motion.h2>
          <motion.p 
            variants={staggeredChildrenVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Premium quality hair and beauty products carefully selected for the best results
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={scaleInVariants}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Product Image with Flowers Background Effect */}
              <div className="relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-pink-100 to-yellow-100 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbbf24' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div 
                  className="absolute top-4 left-4 bg-yellow-600 text-white px-2 py-1 rounded-full text-xs font-semibold"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {product.category}
                </motion.div>
                {product.originalPrice && (
                  <motion.div 
                    className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    SALE
                  </motion.div>
                )}
              </div>

              <motion.div 
                className="p-6"
                variants={staggeredChildrenVariants}
              >
                <motion.div 
                  className="flex items-center mb-2"
                  variants={staggeredChildrenVariants}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 + i * 0.05 }}
                    >
                      <Star
                        size={14}
                        className={`${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    </motion.div>
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                </motion.div>

                <motion.h3 
                  className="text-lg font-bold text-gray-900 mb-3"
                  variants={staggeredChildrenVariants}
                >
                  {product.name}
                </motion.h3>
                
                <motion.div 
                  className="flex items-center justify-between mb-4"
                  variants={staggeredChildrenVariants}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-yellow-600">Ksh {product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">Ksh {product.originalPrice}</span>
                    )}
                  </div>
                </motion.div>

                <motion.button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-full font-semibold text-sm flex items-center justify-center space-x-2 transition-all duration-200"
                  variants={staggeredChildrenVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag size={16} />
                  <span>Add to Cart</span>
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button 
            className="bg-transparent border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturedProducts;