import React, { useState } from 'react';
import axios from 'axios';

const AdminCreateVenue = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    district: '',
    seat_price: '',
    capacity: '',
    phone_number: '',
    preview_image: null,
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'preview_image') {
      setFormData((prev) => ({ ...prev, preview_image: files[0] }));
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
      data.append('district', formData.district);
      data.append('seat_price', formData.seat_price);
      data.append('capacity', formData.capacity);
      data.append('phone_number', formData.phone_number);
      if (formData.preview_image) {
        data.append('preview_image', formData.preview_image);
      }

      const response = await axios.post('http://localhost:3000/admin/venues', data, {
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
        district: '',
        seat_price: '',
        capacity: '',
        phone_number: '',
        preview_image: null,
      });
    } catch (err) {
      console.error('Error creating venue:', err);
      setError(err.response?.data?.message || err.message || 'Failed to create venue');
      setStatus('error');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
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
          <input
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="District"
          />
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
          <label className="block mb-1 font-medium">Preview Image</label>
          <input
            name="preview_image"
            type="file"
            accept="image/*"
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
