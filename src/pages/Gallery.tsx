import React, { useState } from 'react';
import { Play, Filter, Instagram, Facebook, Twitter } from 'lucide-react';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const filters = [
    { id: 'all', name: 'All Media' },
    { id: 'images', name: 'Photos' },
    { id: 'videos', name: 'Videos' },
    { id: 'hair-styling', name: 'Hair Styling' },
    { id: 'wig-installation', name: 'Wig Installation' },
    { id: 'treatments', name: 'Treatments' },
    { id: 'before-after', name: 'Before & After' }
  ];

  const galleryItems = [
    {
      id: 1,
      type: 'image',
      category: 'hair-styling',
      title: 'Elegant Wedding Style',
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Beautiful bridal hairstyle for a perfect wedding day'
    },
    {
      id: 2,
      type: 'video',
      category: 'wig-installation',
      title: 'Premium Wig Installation Process',
      image: 'https://images.pexels.com/photos/3373727/pexels-photo-3373727.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.example.com/video1',
      description: 'Step-by-step wig installation demonstration'
    },
    {
      id: 3,
      type: 'image',
      category: 'treatments',
      title: 'Hair Treatment Results',
      image: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Amazing results from our deep conditioning treatment'
    },
    {
      id: 4,
      type: 'video',
      category: 'hair-styling',
      title: 'Quick Styling Tutorial',
      image: 'https://images.pexels.com/photos/3178786/pexels-photo-3178786.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.example.com/video2',
      description: 'Easy everyday styling tips and tricks'
    },
    {
      id: 5,
      type: 'image',
      category: 'before-after',
      title: 'Transformation Tuesday',
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Complete hair makeover transformation'
    },
    {
      id: 6,
      type: 'video',
      category: 'wig-installation',
      title: 'Customer Trying New Wig',
      image: 'https://images.pexels.com/photos/3373727/pexels-photo-3373727.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.example.com/video3',
      description: 'Happy customer experiencing our premium wig selection'
    },
    {
      id: 7,
      type: 'image',
      category: 'hair-styling',
      title: 'Natural Hair Styling',
      image: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Beautiful natural hair styling and care'
    },
    {
      id: 8,
      type: 'video',
      category: 'treatments',
      title: 'Hair Treatment Process',
      image: 'https://images.pexels.com/photos/4465830/pexels-photo-4465830.jpeg?auto=compress&cs=tinysrgb&w=600',
      videoUrl: 'https://www.example.com/video4',
      description: 'Professional hair treatment in progress'
    },
    {
      id: 9,
      type: 'image',
      category: 'before-after',
      title: 'Color Transformation',
      image: 'https://images.pexels.com/photos/3178786/pexels-photo-3178786.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Stunning hair color transformation'
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => 
        item.category === activeFilter || 
        (activeFilter === 'images' && item.type === 'image') ||
        (activeFilter === 'videos' && item.type === 'video')
      );

  const openModal = (item: any) => {
    setSelectedMedia(item);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-yellow-600">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our portfolio of stunning transformations, professional work, and behind-the-scenes moments. 
            See the artistry and skill that goes into every service we provide.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'
                }`}
              >
                <Filter size={16} />
                <span>{filter.name}</span>
              </button>
            ))}
          </div>
          <div className="text-center mt-4 text-sm text-gray-600">
            Showing {filteredItems.length} items
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                onClick={() => openModal(item)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay for videos */}
                  {item.type === 'video' && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
                      <div className="bg-white bg-opacity-90 rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
                        <Play className="text-yellow-600" size={24} fill="currentColor" />
                      </div>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {item.type === 'video' ? 'Video' : 'Photo'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No items found for the selected filter.</p>
              <p className="text-gray-400 text-sm mt-2">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Follow Us on <span className="text-yellow-400">Social Media</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Stay connected and see our latest work, tips, and behind-the-scenes content
          </p>
          
          <div className="flex justify-center space-x-8 mb-8">
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Instagram size={32} />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Facebook size={32} />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Twitter size={32} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={`https://images.pexels.com/photos/${3065209 + i}/pexels-photo-${3065209 + i}.jpeg?auto=compress&cs=tinysrgb&w=300`}
                  alt={`Instagram post ${i}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          <button className="mt-8 bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105">
            Follow @AliciaHairlineBeauty
          </button>
        </div>
      </section>

      {/* Modal for viewing media */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" onClick={closeModal}>
          <div className="max-w-4xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="relative">
                <img
                  src={selectedMedia.image}
                  alt={selectedMedia.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedMedia.title}</h3>
                <p className="text-gray-600">{selectedMedia.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;