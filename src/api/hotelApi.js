import { axiosInstance } from "./axiosInstance";
import useLocalToken from './helpers'

const DEFAULT_URL = 'hotels';

const hotelApi = {
  getAll() {
    return axiosInstance.get(DEFAULT_URL)
  },
  getById(id) {
    return  axiosInstance.get(`${DEFAULT_URL}/${id}`);
  },

  get: async (params) => {
    console.log(params)
    const {limit, offset, order, checkIn, checkOut, adults, children, minPrice, maxPrice, rating, city} = params;
    const response = await axiosInstance.get(
      `${DEFAULT_URL}?limit=${limit}&offset=${offset}&order=${order}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}&minPrice=${minPrice}&maxPrice=${maxPrice}${rating !== 0 ? `&rating=${rating}` : "" }&city=${city ? city: ""}`
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

  getPrices() {
    return axiosInstance.get('getPrices')
  },
  revenue: async(id) => {
    useLocalToken()
    return axiosInstance.get(`/hotels/${id}/revenue`)
  },
  getTotalRevenue: async(id) => {
    useLocalToken()
    return axiosInstance.get(`/hotels/${id}/revenue/last3Months`)
  }
  
};

export default hotelApi;