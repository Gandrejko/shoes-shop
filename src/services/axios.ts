import axiosInstance from 'axios';

const axios = axiosInstance.create({
  baseURL: process.env.API_URL,
});

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }

  return config;
});

export default axios;
