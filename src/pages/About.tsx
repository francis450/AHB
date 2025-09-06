import React from 'react';
import { Award, Heart, Users, Star, Scissors, Crown } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Users size={32} />, number: '500+', label: 'Happy Clients' },
    { icon: <Award size={32} />, number: '5+', label: 'Years Experience' },
    { icon: <Star size={32} />, number: '4.9', label: 'Average Rating' },
    { icon: <Scissors size={32} />, number: '15+', label: 'Services' }
  ];

  const team = [
    {
      name: 'MAGGIE',
      role: 'Founder & Master Stylist',
      image: '',
      bio: 'With over 10 years of experience, MAGGIE is a certified master stylist specializing in luxury hair treatments and wig installations.'
    },
    {
      name: 'JUDY',
      role: 'Senior Hair Stylist',
      image: 'https://instagram.fmba3-1.fna.fbcdn.net/v/t51.2885-19/472005929_1112924050028809_8228514537609002332_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fmba3-1.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2QEb6hMTV4iDXBGMWUHEbNs3Uf5aJIrg517g5K0yoSjLUPqFreCHJnVI-9Dbg19Waxo&_nc_ohc=9j8E3my1bIYQ7kNvwH5Q3hT&_nc_gid=SXBoXSthWuXhtcNYc8rxiA&edm=APoiHPcBAAAA&ccb=7-5&oh=00_Afb9f0ieXlAn6R8lZibSP4nbyM3Oj__NqwQgooQ8H2JF-A&oe=68BE5BE5&_nc_sid=22de04',
      bio: 'JUDY brings creativity and precision to every style, specializing in natural hair care and protective styling techniques.'
    },
    {
      name: 'PURITY',
      role: 'Beauty Specialist',
      image: 'https://instagram.fmba3-1.fna.fbcdn.net/v/t51.2885-19/472005929_1112924050028809_8228514537609002332_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fmba3-1.fna.fbcdn.net&_nc_cat=101&_nc_oc=Q6cZ2QEb6hMTV4iDXBGMWUHEbNs3Uf5aJIrg517g5K0yoSjLUPqFreCHJnVI-9Dbg19Waxo&_nc_ohc=9j8E3my1bIYQ7kNvwH5Q3hT&_nc_gid=SXBoXSthWuXhtcNYc8rxiA&edm=APoiHPcBAAAA&ccb=7-5&oh=00_Afb9f0ieXlAn6R8lZibSP4nbyM3Oj__NqwQgooQ8H2JF-A&oe=68BE5BE5&_nc_sid=22de04',
      bio: 'PURITY is our expert in makeup artistry and beauty treatments, ensuring every client leaves feeling radiant and confident.'
    }
  ];

  const values = [
    {
      icon: <Crown className="text-yellow-600" size={40} />,
      title: 'Excellence',
      description: 'We strive for perfection in every service, using only the finest products and techniques.'
    },
    {
      icon: <Heart className="text-yellow-600" size={40} />,
      title: 'Care',
      description: 'Your comfort and satisfaction are our top priorities. We treat every client like family.'
    },
    {
      icon: <Star className="text-yellow-600" size={40} />,
      title: 'Innovation',
      description: 'We stay ahead of trends and continuously upgrade our skills with the latest techniques.'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-yellow-600" style={{ fontFamily: 'Yellowtail, cursive' }}>Alicia</span> Hairline & Beauty
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Founded with a passion for enhancing natural beauty, Alicia Hairline & Beauty 
                has become Nairobi's premier destination for luxury hair and beauty services. 
                We combine traditional techniques with modern innovation to deliver exceptional results.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our commitment to excellence, attention to detail, and personalized service 
                has earned us the trust of hundreds of satisfied clients across Kenya.
              </p>
              <div className="flex items-center space-x-4">
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200">
                  Book Consultation
                </button>
                <button className="border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-200">
                  View Gallery
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Alicia Salon Interior"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-yellow-600 text-white p-6 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold">5+ Years</h3>
                <p className="text-sm opacity-90">of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-yellow-400 mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-yellow-600" style={{ fontFamily: 'Yellowtail, cursive' }}>Expert Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our talented professionals are dedicated to bringing out your natural beauty 
              with skill, creativity, and personalized care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-yellow-400 font-semibold">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-yellow-600" style={{ fontFamily: 'Yellowtail, cursive' }}>Core Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and ensure every client receives 
              the exceptional service they deserve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience the <span className="text-yellow-400" style={{ fontFamily: 'Yellowtail, cursive' }}>Alicia</span> Difference?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join hundreds of satisfied clients who trust us with their beauty needs. 
            Book your appointment today and discover why we're Nairobi's premier beauty destination.
          </p>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105">
            Book Your Appointment Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;