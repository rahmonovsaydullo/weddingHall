import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance'; 

const ApproveVenue = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [approvingIds, setApprovingIds] = useState([]); 

  // Fetch unapproved venues
  const fetchUnapprovedVenues = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/admin/venues/unapproved', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      
      setVenues(response.data.venues);
    } catch (err) {
      setError('Failed to load venues');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnapprovedVenues();
  }, []);

// Approve venue
  const approveVenue = async (id) => {
    setApprovingIds((prev) => [...prev, id]);
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/admin/venues/${id}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setVenues((prevVenues) => prevVenues.filter((v) => v.id !== id));
    } catch (err) {
      setError('Failed to approve venue. Try again.');
      console.error(err);
    } finally {
      setApprovingIds((prev) => prev.filter((vid) => vid !== id));
    }
  };

  if (loading) return <p>Loading pending venues...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (venues.length === 0) return <p>No pending venues to approve.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-pink-600">Approve Venues</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {venues.map((venue) => (
          <div key={venue.id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-semibold mb-2">{venue.name}</h3>
            <p><strong>Address:</strong> {venue.address}</p>
            <p><strong>Seat Price:</strong> ${venue.seat_price}</p>
            <p><strong>Capacity:</strong> {venue.capacity}</p>
            <p><strong>Phone:</strong> {venue.phone_number}</p>
            <p>
              <strong>Owner:</strong> {venue.first_name} {venue.last_name}
            </p>
            <p><strong>District:</strong> {venue.district_name}</p>

            <button
              onClick={() => approveVenue(venue.id)}
              disabled={approvingIds.includes(venue.id)}
              className={`mt-4 px-4 py-2 rounded text-white ${
                approvingIds.includes(venue.id)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-pink-600 hover:bg-pink-700'
              }`}
            >
              {approvingIds.includes(venue.id) ? 'Approving...' : 'Approve'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApproveVenue;
