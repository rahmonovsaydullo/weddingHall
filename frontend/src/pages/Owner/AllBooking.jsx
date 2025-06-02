import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faUser,
  faPhoneAlt,
  faHeart,
  faSortUp,
  faSortDown,
  faSort,
  faTimesCircle,
  faIdBadge,
  faUsers,
  faExclamation,
  faRing
} from '@fortawesome/free-solid-svg-icons';

const AllBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'reservation_date', order: 'asc' });

  const token = localStorage.getItem('token');

  const fetchBookings = async (sortKey, sortOrder) => {
    try {
      const res = await axios.get(`/owner/bookings`, {
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
      await axios.put(`/owner/bookings/${bookingId}/cancel`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
      );
    } catch (err) {
      alert(err.response?.data?.error || "Failed to cancel booking.");
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FontAwesomeIcon icon={faSort} />;
    return sortConfig.order === 'asc'
      ? <FontAwesomeIcon icon={faSortUp} />
      : <FontAwesomeIcon icon={faSortDown} />;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-serif bg-pink-50 min-h-screen">
      <h1 className="text-4xl font-bold text-pink-600 mb-8 text-center tracking-wide">
        Bookings
      </h1>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {[
          { label: 'Date', key: 'reservation_date' },
          { label: 'Venue', key: 'venue_name' },
          { label: 'District', key: 'district' },
          { label: 'Status', key: 'status' },
        ].map(({ label, key }) => (
          <button
            key={key}
            onClick={() => toggleSort(key)}
            className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
              sortConfig.key === key
                ? 'bg-pink-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-pink-200 hover:bg-pink-100'
            }`}
          >
            {label} {getSortIcon(key)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.length > 0 ? (
          bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100 relative hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-bold text-pink-700 mb-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faHeart} className="text-red-400" />
                {b.venue_name}
              </h2>
              <p className="mb-1">
                <FontAwesomeIcon icon={faIdBadge} className="text-pink-500 mr-2" />
                <strong>Booking ID:</strong> {b.id}
              </p>
              <p className="mb-1">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-pink-500 mr-2" />
                <strong>Date:</strong> {new Date(b.reservation_date).toLocaleDateString()}
              </p>
              <p className="mb-1">
                <FontAwesomeIcon icon={faUsers} className="text-pink-500 mr-2" />
                <strong>Guests:</strong> {b.guest_amount}
              </p>
              <p className="mb-1">
                <FontAwesomeIcon icon={faUser} className="text-pink-500 mr-2" />
                <strong>By:</strong> {b.first_name} {b.last_name}
              </p>
              <p className="mb-1">
                <FontAwesomeIcon icon={faPhoneAlt} className="text-pink-500 mr-2" />
                <strong>Phone:</strong> {b.phone_number}
              </p>
              <p className="mb-1">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-pink-500 mr-2" />
                <strong>District:</strong> {b.district_name}
              </p>
              <p className="mb-2">
                <FontAwesomeIcon icon={faExclamation} className="text-pink-500 mr-2" />
                <strong>Status:</strong>{' '}
                <span className={`capitalize font-semibold ${
                  b.status === 'cancelled' ? 'text-red-500' : 'text-green-600'
                }`}>
                  {b.status}
                </span>
              </p>

              {b.status !== 'cancelled' && (
                <button
                  onClick={() => handleCancel(b.id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 text-sm flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                  Cancel Booking
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full text-lg">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default AllBooking;
