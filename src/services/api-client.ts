import axios, {AxiosRequestConfig} from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://shoes-shop-strapi.herokuapp.com/api',
});

class APIClient<Req = any, Res = any> {
  private _endpoint: string;

  constructor(endpoint: string) {
    this._endpoint = endpoint;
  }

  get = async (config?: AxiosRequestConfig) => {
    const res = await axiosInstance.get<Res>(this._endpoint, config);
    return res.data;
  };

  post = async (data: Req, config?: AxiosRequestConfig) => {
    const res = await axiosInstance.post<Res>(this._endpoint, data, config);
    return res.data;
  };

  put = async (data: Req, config?: AxiosRequestConfig) => {
    const res = await axiosInstance.put<Res>(this._endpoint, data, config);
    return res.data;
  };

  delete = async (config: AxiosRequestConfig) => {
    const res = await axiosInstance.delete<Res>(this._endpoint, config);
    return res.data;
  };
}

export default APIClient;
