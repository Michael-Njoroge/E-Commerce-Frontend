import axios from 'axios';
import { base_url } from './base_url';

const api = axios.create({
  baseURL: base_url,
});

api.interceptors.request.use(
  config => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
