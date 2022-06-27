import { axiosInstance } from '../utils/axios/axiosInstance';

const loginApi = {
  login: (user) => {
    axiosInstance
      .post('login', {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default loginApi;
