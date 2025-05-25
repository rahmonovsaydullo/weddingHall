import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarDays,
    faUserGroup,
    faMapMarkerAlt,
    faCheckCircle,
    faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [status, setStatus] = useState('idle'); // idle | loading | error | success
    const [error, setError] = useState(null);

    const user_id = localStorage.getItem('user_id'); // ✅ Declare outside useEffect

    useEffect(() => {
        if (!user_id) {
            console.log("No user ID in localStorage.");
            return;
        }

        const fetchBookings = async () => {
            setStatus('loading');
            try {
                const response = await axios.get('http://localhost:3000/user/bookings', {
                    params: { user_id }
                });
                console.log("Fetched bookings:", response.data.bookings);
                setBookings(response.data.bookings || []);
                setStatus('success');
            } catch (err) {
                console.error("Error fetching bookings:", err);
                setError(err.response?.data?.message || err.message || 'Failed to load bookings');
                setStatus('error');
            }
        };

        fetchBookings();
    }, [user_id]); // ✅ Optional: include user_id if you want to refetch when it changes

    const renderContent = () => {
        if (!user_id) {
            return <p className="text-center text-red-600 font-semibold">Please login to see your bookings.</p>;
        }

        if (status === 'loading') {
            return <p className="text-center text-gray-600">Loading bookings...</p>;
        }

        if (status === 'error') {
            return <p className="text-center text-red-600">Error: {error}</p>;
        }

        if (status === 'success' && bookings.length === 0) {
            return <p className="text-center text-gray-700">You have no bookings yet.</p>;
        }

        if (status === 'success') {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bookings.map(({ id, booking_date, status, guest_amount, venue_name, venue_location }) => (
                        <div
                            key={id}
                            className="backdrop-blur-lg bg-white/70 shadow-lg rounded-xl overflow-hidden transition-transform hover:scale-105 hover:shadow-pink-300 cursor-pointer"
                        >
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-2 text-pink-600">{venue_name}</h3>
                                <p className="text-gray-700 mb-1">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-pink-500" />
                                    {venue_location}
                                </p>
                                <p className="text-gray-700 mb-1">
                                    <FontAwesomeIcon icon={faCalendarDays} className="mr-2 text-pink-500" />
                                    Date: {new Date(booking_date).toLocaleDateString()}
                                </p>
                                <p className="text-gray-700 mb-1">
                                    <FontAwesomeIcon icon={faUserGroup} className="mr-2 text-pink-500" />
                                    Guests: {guest_amount}
                                </p>
                                <p className="flex items-center gap-2 text-sm font-semibold mb-1">
                                    Status: {status.toLowerCase() === 'confirmed' ? (
                                        <span className="text-green-600 flex items-center gap-1">
                                            <FontAwesomeIcon icon={faCheckCircle} /> Confirmed
                                        </span>
                                    ) : (
                                        <span className="text-red-600 flex items-center gap-1">
                                            <FontAwesomeIcon icon={faTimesCircle} /> {status}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        return null;
    };

    return (
        <div className="mx-auto px-4 py-10 pt-20 bg-gradient-to-br from-pink-50 to-white min-h-screen max-w-7xl">
            <h1 className="text-3xl font-bold text-center text-pink-600 mb-10">My Bookings</h1>
            {renderContent()}
        </div>
    );
};

export default MyBookings;
