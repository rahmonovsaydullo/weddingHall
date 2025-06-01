import React, { useState, useEffect } from 'react';
import { districts } from '../../data/districts';
import axios from '../../utils/axiosInstance';

const AdminCreateVenue = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    district_id: '',
    seat_price: '',
    capacity: '',
    phone_number: '',
    owner_id: '',
    images: [],
  });

  const [owners, setOwners] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/admin/owners', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOwners(res.data.owners || []);
      } catch (err) {
        console.error('Failed to fetch owners:', err);
      }
    };

    fetchOwners();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setFormData((prev) => ({ ...prev, images: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('address', formData.address);
      data.append('district_id', formData.district_id);
      data.append('seat_price', formData.seat_price);
      data.append('capacity', formData.capacity);
      data.append('phone_number', formData.phone_number);
      data.append('owner_id', formData.owner_id);
      // Append images
      formData.images.forEach((file) => {
        data.append('images', file);
      });

      const token = localStorage.getItem('token');

      await axios.post('/admin/venues', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setStatus('success');
      alert('Venue created successfully!');
      setFormData({
        name: '',
        address: '',
        district_id: '',
        seat_price: '',
        capacity: '',
        phone_number: '',
        owner_id: '',
        images: [],
      });
    } catch (err) {
      console.error('Error creating venue:', err);
      setError(err.response?.data?.error || err.message || 'Failed to create venue');
      setStatus('error');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-3 bg-white rounded shadow ">
      <h2 className="text-2xl font-bold mb-6 text-pink-600">Create Wedding Venue</h2>

      {status === 'error' && (
        <p className="mb-4 text-red-600 font-semibold">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Venue Name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Venue Address"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">District</label>
          <select
            name="district_id"
            value={formData.district_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="" disabled>
              Select a district
            </option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Seat Price ($)</label>
          <input
            name="seat_price"
            type="number"
            min="0"
            value={formData.seat_price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Seat Price"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Capacity (guests)</label>
          <input
            name="capacity"
            type="number"
            min="0"
            value={formData.capacity}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Capacity"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Phone Number"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Owner</label>
          <select
            name="owner_id"
            value={formData.owner_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="" disabled>
              Select an owner
            </option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.first_name} {owner.last_name} ({owner.user_name})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Preview Images</label>
          <input
            name="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition disabled:opacity-50"
        >
          {status === 'loading' ? 'Creating...' : 'Create Venue'}
        </button>
      </form>
    </div>
  );
};

export default AdminCreateVenue;
