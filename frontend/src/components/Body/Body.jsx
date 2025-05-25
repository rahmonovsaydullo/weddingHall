import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch, faLocationDot, faMap, faPhone, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Body() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔓 REMOVE token here because /user/venues is public now
        const response = await axios.get("http://localhost:3000/user/venues");
        console.log("✅ Venue data:", response.data);
        setData(response.data); // ✅ Set the data!
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto px-4 py-10 pt-20 bg-gradient-to-br from-pink-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-10">Explore Wedding Venues</h1>

      {error && <p className="text-red-500 mb-4">Error: {error.response?.data?.message || error.message}</p>}

      {data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 cursor-pointer">
          {data.map((venue) => (
            <div
              key={venue.id}
              onClick={() => navigate(`/venues/${venue.id}`)}
              className="backdrop-blur-lg bg-white/70 shadow-xl rounded-2xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-pink-300"
            >
              <img
                src={`http://localhost:3000/uploads/${venue.preview_image || 'default.jpg'}`}
                alt={venue.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{venue.name}</h2>
                <p className="text-gray-700"><strong><FontAwesomeIcon icon={faLocationDot} /> Address:</strong> {venue.address}</p>
                <p className="text-gray-700"><strong><FontAwesomeIcon icon={faMap} /> District:</strong> {venue.district}</p>
                <p className="text-gray-700"><strong><FontAwesomeIcon icon={faCouch} /> Seat Price:</strong> ${venue.seat_price}</p>
                <p className="text-gray-700"><strong><FontAwesomeIcon icon={faUsers} /> Capacity:</strong> {venue.capacity} guests</p>
                <p className="text-gray-700"><strong><FontAwesomeIcon icon={faPhone} /> Phone:</strong> {venue.phone_number}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">Loading venues...</p>
      )}
    </div>
  );
}

export default Body;
