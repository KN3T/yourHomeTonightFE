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
    const {limit, offset, order, checkIn, checkOut, adults, children, minPrice, maxPrice, rating, city} = params;
    const response = await axiosInstance.get(
      `${DEFAULT_URL}?limit=${limit}&offset=${offset}&order=${order}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}&minPrice=${minPrice}&maxPrice=${maxPrice}${rating !== 0 ? `&rating=${rating}` : "" }&city=${city ? city: ""}`
      )
    return response;
  },

  create(params){
    const { token, hotelName } = params;

    console.log(token);
    console.log(hotelName);
    axiosInstance.interceptors.request.use((config) => {
      config.headers.Authorization = token ? `Bearer ${token}` : '';
      return config;
    });
    return axiosInstance.post(DEFAULT_URL, {
      name: hotelName
    })
  },

  uploadImage: (images) => {
    useLocalToken();
    return axiosInstance.post(
        'https://api.yourhometonight.com/api/images',
        images,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  },

  update({data, hotelId}){
    useLocalToken();
    return axiosInstance.put(`${DEFAULT_URL}/${hotelId}`, data)
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
  },
  markAsDoneBooking: async(id) => {
    useLocalToken()
    return axiosInstance.post(`/bookings/${id}/done`)
  }
  
};

export default hotelApi;