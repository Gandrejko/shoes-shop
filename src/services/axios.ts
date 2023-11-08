import axiosInstance from 'axios';

const axios = axiosInstance.create({
  baseURL: 'https://shoes-shop-strapi.herokuapp.com/api',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk1LCJpYXQiOjE2OTkzNzU4OTQsImV4cCI6MTcwMTk2Nzg5NH0.Toa8YhgAK-KC1FWVmbwLLTUrRpsZHdOZ7_fvTl_Mei0`,
  },
});

export default axios;
