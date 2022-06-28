import { axiosInstance } from '../utils/axios/axiosInstance';

const hotelApi = {
  getAll: async () => {
    const response = await axiosInstance.get(
      'https://62b95f6641bf319d227ae509.mockapi.io/kn3t/hotels'
    );
    return response.data;
  },
};

export default hotelApi;
