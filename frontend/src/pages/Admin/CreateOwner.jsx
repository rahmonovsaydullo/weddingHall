import React, { useState } from 'react';
import axios from 'axios';

const CreateOwner = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const token = localStorage.getItem('token')
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = axios.post('http://localhost:3000/admin/owners', formData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      setMessage(res.data.message);
      console.log(res);
      
      setFormData({
        first_name: '',
        last_name: '',
        user_name: '',
        password: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Create Owner Account</h2>
      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="user_name"
          placeholder="Username"
          value={formData.user_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Owner
        </button>
      </form>
    </div>
  );
};

export default CreateOwner;
