import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch, faMap, faPhone, faUsers, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';

const AdminViewAllVenues = () => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await axios.get('http://localhost:3000/admin/venues', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVenues(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch venues.');
      }
    };

    fetchVenues();
  }, []);

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">Admin - All Wedding Venues</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {venues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <div key={venue.id} className="bg-white rounded-lg shadow-lg p-5 space-y-2">
              <img
                src={`http://localhost:3000/uploads/${venue.preview_image || 'default.jpg'}`}
                alt={venue.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-bold text-gray-800">{venue.name}</h2>
              <p><FontAwesomeIcon icon={faMap} /> <strong>District:</strong> {venue.district}</p>
              <p><FontAwesomeIcon icon={faCouch} /> <strong>Seat Price:</strong> ${venue.seat_price}</p>
              <p><FontAwesomeIcon icon={faUsers} /> <strong>Capacity:</strong> {venue.capacity}</p>
              <p><FontAwesomeIcon icon={faPhone} /> <strong>Phone:</strong> {venue.phone_number}</p>
              <p><strong>Status:</strong> <span className="capitalize">{venue.status}</span></p>

              {/* Admin Actions - Extend based on actual API support */}
              <div className="flex gap-2 mt-3">
                <button className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                  <FontAwesomeIcon icon={faCheck} /> Approve
                </button>
                <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No venues available.</p>
      )}
    </div>
  );
};

export default AdminViewAllVenues;
