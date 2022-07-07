import { axiosInstance } from './axiosInstance';

const registerApi = {
  register: (params) => {
    return axiosInstance.post('/register', params);
  },
};

export default registerApi;
