import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AllOwners = () => {
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const res = await axios.get('/admin/owners', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOwners(res.data.owners);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch owners.');
      }
    };

    fetchOwners();
  }, []);

  return (
    <div className="px-6 py-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">Admin - All Owners</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {owners.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {owners.map((owner) => (
            <div key={owner.id} className="bg-white shadow-md p-5 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <FontAwesomeIcon icon={faUser} className="text-pink-500 text-2xl" />
                <h2 className="text-xl font-semibold text-gray-800">
                  {owner.first_name} {owner.last_name}
                </h2>
              </div>
              <p><strong>Username:</strong> {owner.user_name}</p>
              <p><strong>Role:</strong> {owner.role}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No owners found.</p>
      )}
    </div>
  );
};

export default AllOwners;
