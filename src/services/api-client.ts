import axios, {AxiosRequestConfig} from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://shoes-shop-strapi.herokuapp.com/api',
});

class APIClient<T> {
  private _endpoint: string;

  constructor(endpoint: string) {
    this._endpoint = endpoint;
  }

  getSingle = async (id: string | number) => {
    const res = await axiosInstance.get<T>(`${this._endpoint}/${id}`);
    return res.data;
  };

  getAll = async (config: AxiosRequestConfig) => {
    const res = await axiosInstance.get<T>(this._endpoint, config);
    return res.data;
  };

  post = async (data: T) => {
    const res = await axiosInstance.post<T>(this._endpoint, data);
    return res.data;
  };
}

export default APIClient;
