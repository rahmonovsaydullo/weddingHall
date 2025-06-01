import axios from '../../utils/axiosInstance';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch, faMap, faPhone, faUsers, faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const AllVenues = () => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState('');
  const [deletingIds, setDeletingIds] = useState([]); // Track venues being deleted

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await axios.get('/admin/venues', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVenues(res.data.venues || res.data); // handle data shape
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch venues.');
      }
    };

    fetchVenues();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this venue?')) return;

    setDeletingIds((prev) => [...prev, id]);
    setError('');

    try {
      await axios.delete(`http://localhost:3000/admin/venues/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVenues((prev) => prev.filter((venue) => venue.id !== id));
    } catch (err) {
      setError('Failed to delete venue. Please try again.');
      console.error(err);
    } finally {
      setDeletingIds((prev) => prev.filter((vid) => vid !== id));
    }
  };

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">
        Admin - All Wedding Venues
      </h1>

      {venues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white rounded-lg shadow-lg p-8 space-y-4 min-w-[350px] max-w-md mx-auto"
            >
              <img
                src={`http://localhost:3000/uploads/${venue.preview_image || 'default.jpg'}`}
                alt={venue.name}
                className="w-full h-56 object-cover rounded"
              />
              <h2 className="text-2xl font-bold text-gray-800">{venue.name}</h2>
              <p><FontAwesomeIcon icon={faMap} /> <strong>District:</strong> {venue.district}</p>
              <p><FontAwesomeIcon icon={faCouch} /> <strong>Seat Price:</strong> ${venue.seat_price}</p>
              <p><FontAwesomeIcon icon={faUsers} /> <strong>Capacity:</strong> {venue.capacity}</p>
              <p><FontAwesomeIcon icon={faPhone} /> <strong>Phone:</strong> {venue.phone_number}</p>
              <p><strong>Status:</strong> <span className="capitalize">{venue.status}</span></p>

              <div className="flex gap-3 mt-4">
                <button
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
                  onClick={() => handleApprove(venue.id)}
                >
                  <FontAwesomeIcon icon={faCheck} /> Approve
                </button>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                  onClick={() => handleEdit(venue.id)}
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-2"
                  onClick={() => handleDelete(venue.id)}
                >
                  Delete
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

export default AllVenues;
