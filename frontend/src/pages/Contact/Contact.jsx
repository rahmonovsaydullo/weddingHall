import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import Header from '../../components/Header/Header';

const Contact = () => {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto pt-20 p-8">
        <h1 className="text-4xl font-bold text-pink-600 text-center mb-6">Contact Us</h1>
        <p className="text-gray-700 text-lg text-center mb-8">
          We’re here to help you plan your dream event. Reach out to us for bookings, availability, or any inquiries.
        </p>

        <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-4 text-lg text-gray-700">
            <FaMapMarkerAlt className="text-pink-600 text-xl" />
            <span><strong>Address:</strong> 123 Wedding Lane, Andijan, Uzbekistan</span>
          </div>
          <div className="flex items-center gap-4 text-lg text-gray-700">
            <FaPhoneAlt className="text-pink-600 text-xl" />
            <span><strong>Phone:</strong> +998 90 123 45 67</span>
          </div>
          <div className="flex items-center gap-4 text-lg text-gray-700">
            <FaEnvelope className="text-pink-600 text-xl" />
            <span><strong>Email:</strong> weddings@example.com</span>
          </div>
          <div className="flex items-center gap-4 text-lg text-gray-700">
            <FaClock className="text-pink-600 text-xl" />
            <span><strong>Working Hours:</strong> Mon – Sat: 9 AM – 8 PM</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
