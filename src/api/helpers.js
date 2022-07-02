import { axiosInstance } from './axiosInstance';

const useLocalToken = () => {
  axiosInstance.interceptors.request.use((config) => {
    const userData = JSON.parse(window.localStorage.getItem('userData'));
    const token = userData.token;
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });
};

export default useLocalToken;
