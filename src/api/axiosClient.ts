import axios from 'axios';
import queryString from 'query-string';
import { appInfos } from '../constants/appInfos';

const axiosClient = axios.create({
  baseURL: appInfos.BASE_URL,
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  config.headers = {
    Authorization: '',
    Accept: 'application/json',
    ...config.headers,
  };

  config.data;

  return config;
});

axiosClient.interceptors.response.use(
  res => {
    if (res.data && res.status === 200) {
      return res.data;
    }

    throw new Error('ERROR');
  },
  error => {
    console.log(`ERR API ${JSON.stringify(error)}`);
    throw new Error(error.response);
  },
);

export default axiosClient;
