import axios from 'axios';

const BASE_DOMAIN = 'http://api.yourhometonight.com/api';
const baseURL = BASE_DOMAIN;

export const axiosInstance = axios.create({
  baseURL,
});
