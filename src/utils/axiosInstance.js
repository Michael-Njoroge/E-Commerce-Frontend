import axios from 'axios';
import { base_url } from './base_url';

const api = axios.create({
  baseURL: base_url,
});

api.interceptors.request.use(
  config => {
    const customer = JSON.parse(localStorage.getItem('customer'));
    if (customer && customer.token) {
      config.headers.Authorization = `Bearer ${customer.token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
