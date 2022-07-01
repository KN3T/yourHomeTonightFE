import { axiosInstance } from "./axiosInstance";

const hotelApi = {
  getAll() {
    const url = 'http://api.yourhometonight.com/api/hotels'
    return axiosInstance.get(url)
  },
  getById(id) {
    const url = `http://api.yourhometonight.com/api/hotels/${id}/`;
    return  axiosInstance.get(url);
  },

  get: async (params) => {
    const {limit, offset, order, minPrice, maxPrice, city} = params;
    const response = await axiosInstance.get(
      `/hotels?limit=${limit}&offset=${offset}&order=${order}&minPrice=${minPrice}&maxPrice=${maxPrice}&city=${city ? city: ""}`
      )
    return response;
  },

  create(newHotel){
    const url = `http://api.yourhometonight.com/api/hotels/`;
    return axiosInstance.post(url, newHotel)
  },

  update(newHotel){
    const url = `http://api.yourhometonight.com/api/hotels/${newHotel.id}`;
    return axiosInstance.put(url, newHotel)
  },
  
  delete(id){
    const url = `http://api.yourhometonight.com/api/hotels/${id}/`;
    return axiosInstance.delete(url)
  },
};

export default hotelApi;
