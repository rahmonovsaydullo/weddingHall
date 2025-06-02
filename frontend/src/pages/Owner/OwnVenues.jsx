import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt,
    faUsers,
    faDollarSign,
    faPhone,
    faClock,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const OwnVenues = () => {
    const [venues, setVenues] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const res = await axios.get('/owner/venues', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res);
                setVenues(res.data.venues);
            } catch (err) {
                console.error('Failed to fetch venues:', err);
                setError('Failed to load your venues');
            }
        };

        fetchVenues();
    }, [token]);

    return (
        <div className="max-w-4xl mx-auto p-6 mt-10">
            <h2 className="text-2xl font-bold text-pink-700 mb-6 text-center">My Venues</h2>

            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            {venues.length === 0 ? (
                <p className="text-gray-600 text-center">You haven't created any venues yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {venues.map((venue) => (
                        <div key={venue.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                            <h3 className="text-xl font-semibold text-pink-600">{venue.name}</h3>
                            <p className="text-sm text-gray-700 mb-1">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-pink-500 mr-2" />
                                {venue.address}
                            </p>
                            <p className="text-sm text-gray-700 mb-1">
                                <FontAwesomeIcon icon={faUsers} className="text-pink-500 mr-2" />
                                Capacity: {venue.capacity}
                            </p>
                            <p className="text-sm text-gray-700 mb-1">
                                <FontAwesomeIcon icon={faDollarSign} className="text-pink-500 mr-2" />
                                Seat Price: ${venue.seat_price}
                            </p>
                            <p className="text-sm text-gray-700 mb-1">
                                <FontAwesomeIcon icon={faPhone} className="text-pink-500 mr-2" />
                                {venue.phone_number}
                            </p>
                            <p className="text-sm text-yellow-600 font-medium mt-2">Status: {venue.status}</p>
                            <p className="text-xs text-gray-400 mt-1">
                                <FontAwesomeIcon icon={faClock} className="mr-1" />
                                {new Date(venue.created_at).toLocaleString()}
                            </p>
                            <button
                                onClick={() => navigate(`/owner/edit-venue/${venue.id}`)}
                                className="mt-2 text-sm text-blue-600 hover:underline"
                            >
                                Edit Venue
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OwnVenues;