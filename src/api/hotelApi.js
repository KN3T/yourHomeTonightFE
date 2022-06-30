import { axiosInstance } from "./axiosInstance";

const hotelApi = {
  getAll: async () => {
    const response = await axiosInstance.get(
      'https://62b95f6641bf319d227ae509.mockapi.io/kn3t/hotels'
    );
    return response.data;
  },
  getById: async (id) => {
    const url = `https://62b95f6641bf319d227ae509.mockapi.io/kn3t/hotels/${id}`;
    const response = await axiosInstance.get(url);
    return response.data;
  },

  get: async (params) => {
    const response = await axiosInstance.get(`/hotels?city=${params}`)
    return response;
  }
};

export default hotelApi;
