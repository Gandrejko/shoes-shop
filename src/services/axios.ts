import axiosInstance from 'axios';

const axios = axiosInstance.create({
  baseURL: 'https://shoes-shop-strapi.herokuapp.com/api',
});

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }

  return config;
});

export default axios;
