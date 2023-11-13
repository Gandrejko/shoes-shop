import axiosInstance from 'axios';

const axios = axiosInstance.create({
  baseURL: process.env.API_URL,
});

axios.interceptors.request.use(config => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk1LCJpYXQiOjE2OTkzNzU4OTQsImV4cCI6MTcwMTk2Nzg5NH0.Toa8YhgAK-KC1FWVmbwLLTUrRpsZHdOZ7_fvTl_Mei0';
  if (token) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }

  return config;
});

export default axios;
