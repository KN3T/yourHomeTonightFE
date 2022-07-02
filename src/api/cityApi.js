import { axiosInstance } from "./axiosInstance";

const cityApi = {
  search: async (params) => {
    const response = await axiosInstance.get(`/city?search=${params}`);
    return response;
  },

};

export default cityApi;
