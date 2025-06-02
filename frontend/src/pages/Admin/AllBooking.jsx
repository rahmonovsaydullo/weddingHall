import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';

const AllBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'reservation_date', order: 'asc' });

  const token = localStorage.getItem('token');

  const fetchBookings = async (sortKey, sortOrder) => {
    try {
      const res = await axios.get('/admin/bookings', {
        headers: { Authorization: `Bearer ${token}` },
        params: { sort: sortKey, order: sortOrder },
      });
      setBookings(res.data.bookings);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch bookings');
    }
  };

  useEffect(() => {
    fetchBookings(sortConfig.key, sortConfig.order);
  }, [sortConfig]);

  const toggleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axios.put(`/admin/bookings/${bookingId}/cancel`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update booking status locally
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
      );
    } catch (err) {
      alert(err.response?.data?.error || "Failed to cancel booking.");
    }
  };

  const getDisplayStatus = (booking) => {
    const today = new Date();
    const reservationDate = new Date(booking.reservation_date);

    if (booking.status === 'cancelled') return 'Cancelled';
    if (booking.status === 'pending') {
      return reservationDate < today ? 'Done' : 'Upcoming';
    }
    return booking.status;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">All Bookings</h1>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {[
          { label: 'Date', key: 'reservation_date' },
          { label: 'Venue', key: 'venue_name' },
          { label: 'District', key: 'district_name' },
          { label: 'Status', key: 'status' },
        ].map(({ label, key }) => (
          <button
            key={key}
            onClick={() => toggleSort(key)}
            className={`px-4 py-2 rounded ${
              sortConfig.key === key
                ? 'bg-pink-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-pink-100'
            }`}
          >
            {label} {sortConfig.key === key ? (sortConfig.order === 'asc' ? '↑' : '↓') : ''}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {bookings.length > 0 ? (
          bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 relative"
            >
              <h2 className="text-xl font-semibold mb-2">{b.venue_name}</h2>
              <p><strong>Booking ID:</strong> {b.id}</p>
              <p><strong>Date:</strong> {new Date(b.reservation_date).toLocaleDateString()}</p>
              <p><strong>Guest Amount:</strong> {b.guest_amount}</p>
              <p>
                <strong>Booked By:</strong> {b.first_name} {b.last_name} <br />
                <strong>Phone:</strong> {b.phone_number}
              </p>
              <p><strong>Status:</strong> <span className="capitalize">{getDisplayStatus(b)}</span></p>
              <p><strong>District:</strong> {b.district_name}</p>

              {b.status !== 'cancelled' && (
                <button
                  onClick={() => handleCancel(b.id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default AllBooking;
