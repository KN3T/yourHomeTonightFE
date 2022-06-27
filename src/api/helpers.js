import { axiosInstance } from './axiosInstance';

const useLocalToken = () => {
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });
};

export { useLocalToken };
