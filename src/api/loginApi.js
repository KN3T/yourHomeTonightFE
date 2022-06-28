import { axiosInstance } from './axiosInstance';

const loginApi = {
  login: (user) => {
    return axiosInstance.post('/login', {
      email: user.email,
      password: user.password,
    });
  },
};

export default loginApi;
