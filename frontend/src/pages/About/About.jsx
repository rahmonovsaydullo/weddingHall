import React from 'react';
import Header from '../../components/Header/Header';
import { FaHeart, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';

const About = () => {
  return (
    <>
      <Header />
      <div className="bg-pink-50 min-h-screen pt-20 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-pink-700 mb-4">About Our Wedding Hall</h1>
            <p className="text-gray-600 text-lg">
              Experience elegance, comfort, and celebration in a perfect setting.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition duration-300">
              <FaHeart className="text-pink-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Elegant Ambiance</h3>
              <p className="text-gray-600">
                A timeless charm with modern luxury to make your wedding unforgettable.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition duration-300">
              <FaUsers className="text-pink-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Spacious & Flexible</h3>
              <p className="text-gray-600">
                Accommodates both small and large events with flexible packages.
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition duration-300">
              <FaMapMarkerAlt className="text-pink-500 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Great Location</h3>
              <p className="text-gray-600">
                Easily accessible venue with convenient parking and prime location.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-white shadow-lg rounded-2xl p-8 text-center">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Whether you're planning a traditional ceremony or a modern celebration, our team is here to make your vision come true. From décor to dining, we ensure excellence at every step.
            </p>
            <p className="text-pink-600 font-semibold text-lg">Your dream day begins here 💍</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
