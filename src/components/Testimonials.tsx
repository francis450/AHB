import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  useScrollAnimation,
  slideUpVariants,
  containerVariants,
  staggeredChildrenVariants,
  scaleInVariants
} from '../hooks/useScrollAnimation';
import { getWebsiteReviews, WebsiteReview } from '../services/reviews';

const Testimonials = () => {
  const { ref, controls } = useScrollAnimation();
  const [testimonials, setTestimonials] = useState<WebsiteReview[]>([]);

  useEffect(() => {
    getWebsiteReviews().then((reviews) => setTestimonials(reviews.slice(0, 3))).catch(() => setTestimonials([]));
  }, []);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={slideUpVariants}
      className="py-20 bg-gradient-to-br from-yellow-50 to-white relative overflow-hidden"
    >
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-10"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300 rounded-full opacity-15"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} className="text-center mb-16">
          <motion.h2 variants={staggeredChildrenVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-yellow-600">Clients Say</span>
          </motion.h2>
          <motion.p variants={staggeredChildrenVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from our valued clients who trust us with their beauty journey
          </motion.p>
        </motion.div>

        {testimonials.length ? (
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.created_at}-${index}`}
                variants={scaleInVariants}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative"
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute -top-4 left-8"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className="bg-yellow-600 rounded-full p-3"><Quote className="text-white" size={20} /></div>
                </motion.div>

                <motion.div className="flex items-center mb-4 mt-4" variants={staggeredChildrenVariants}>
                  {[...Array(5)].map((_, starIndex) => (
                    <motion.div key={starIndex} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + index * 0.1 + starIndex * 0.05 }}>
                      <Star size={18} className={starIndex < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p className="text-gray-700 mb-6 leading-relaxed text-lg italic" variants={staggeredChildrenVariants}>
                  “{testimonial.comment}”
                </motion.p>

                <motion.div className="flex items-center space-x-4" variants={staggeredChildrenVariants}>
                  <motion.div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white font-bold flex items-center justify-center" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                    {testimonial.name.trim().charAt(0).toUpperCase()}
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-yellow-600 text-sm font-semibold">Verified client review</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-gray-600">Be the first to share your Alicia experience.</div>
        )}

        <motion.div
          className="text-center mt-12 bg-white rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.h3 className="text-2xl font-bold text-gray-900 mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.4 }}>
            Ready to experience the Alicia difference?
          </motion.h3>
          <motion.p className="text-gray-600 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.4 }}>
            Join hundreds of satisfied clients who trust us with their beauty needs
          </motion.p>
          <Link to="/reviews" className="inline-flex bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300">
            Read &amp; Leave a Review
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
