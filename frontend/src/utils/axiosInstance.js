// src/utils/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

instance.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token'); 
      window.location.href = '/login';  
    }
    return Promise.reject(error);
  }
);

export default instance;
