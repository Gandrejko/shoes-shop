import axiosInstance, {AxiosError} from 'axios';

const axios = axiosInstance.create({
  baseURL: process.env.API_URL,
});

axios.interceptors.request.use(config => {
  const response = localStorage.getItem('accessToken');
  if (response) {
    const token = JSON.parse(response);
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }

  return config;
});

export {AxiosError};
export default axios;
