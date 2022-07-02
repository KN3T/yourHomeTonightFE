import { axiosInstance } from "./axiosInstance";

const DEFAULT_URL = 'hotels';

const hotelApi = {
  getAll() {
    return axiosInstance.get(DEFAULT_URL)
  },
  getById(id) {
    return  axiosInstance.get(`${DEFAULT_URL}/${id}`);
  },

  get: async (params) => {
    const {limit, offset, order, minPrice, maxPrice, city} = params;
    const response = await axiosInstance.get(
      `${DEFAULT_URL}?limit=${limit}&offset=${offset}&order=${order}&minPrice=${minPrice}&maxPrice=${maxPrice}&city=${city ? city: ""}`
      )
    return response;
  },

  create(newHotel){
    return axiosInstance.post(DEFAULT_URL, newHotel)
  },

  update(newHotel){
    return axiosInstance.put(`${DEFAULT_URL}/${newHotel.id}`, newHotel)
  },
  
  delete(id){
    return axiosInstance.delete(`${DEFAULT_URL}/${id}}`)
  },
};

export default hotelApi;