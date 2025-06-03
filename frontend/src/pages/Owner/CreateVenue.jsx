import React, { useState } from 'react';
import axios from '../../utils/axiosInstance';
import { districts } from '../../data/districts';

const OwnerCreateVenue = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    seat_price: '',
    phone_number: '',
    district_id: '',
    capacity: '', 
    images: [],
  });


  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const user_id = localStorage.getItem('user_id');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(files),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('address', formData.address);
      data.append('seat_price', formData.seat_price);
      data.append('capacity', formData.capacity); 
      data.append('phone_number', formData.phone_number);
      data.append('owner_id', user_id);
      data.append('district_id', formData.district_id); 

      formData.images.forEach((image) => {
        data.append('images', image); 
      });

      const res = await axios.post('/owner/venues', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message);
      setFormData({
        name: '',
        address: '',
        seat_price: '',
        phone_number: '',
        district_id: '',
        capacity: '',
        images: [],
      });
    } catch (err) {
      console.error('Create venue failed:', err);
      setError(err.response?.data?.error || 'Failed to create venue');
    }
  };


  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-pink-700 mb-4">Create Venue</h2>

      {message && <p className="text-green-600 text-center mb-4">{message}</p>}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Venue Name"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="number"
          name="seat_price"
          value={formData.seat_price}
          onChange={handleChange}
          placeholder="Seat Price"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="Capacity"
          className="w-full px-4 py-2 border rounded"
          required
        />

        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <div>
          <select
            name="district_id"
            value={formData.district_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-600 rounded px-3 py-2"
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

        <div className='border px-2 py-2 rounded-b-lg rounded-t-lg'>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="w-full "
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
        >
          Create Venue
        </button>
      </form>
    </div>
  );
};

export default OwnerCreateVenue;
