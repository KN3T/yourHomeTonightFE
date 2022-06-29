import axios from 'axios';

const BASE_DOMAIN = 'http://api.yourhometonight.com/api/rooms';
const baseURL = BASE_DOMAIN;

export const axiosInstance = axios.create({
  baseURL,
});
