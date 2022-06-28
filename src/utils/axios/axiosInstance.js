import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api.richardktran.dev/api/',
  timeout: 3000,
  headers: { 'X-Custom-Header': 'foobar' },
});
