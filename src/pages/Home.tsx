import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedServices from '../components/FeaturedServices';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import WorkingHours from '../components/WorkingHours';

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturedServices />
      <FeaturedProducts />
      <Testimonials />
      <WorkingHours />
    </>
  );
};

export default Home;