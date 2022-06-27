import axios from 'axios';

const BASE_DOMAIN = 'http://api.richardktran.dev/api';
const baseURL = BASE_DOMAIN;

export const axiosInstance = axios.create({
  baseURL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
