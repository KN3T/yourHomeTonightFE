import { axiosInstance } from "./axiosInstance";
import useLocalToken from './helpers'

const bookingApi = {
    book: async (params) => {
        useLocalToken()
        return axiosInstance.post('bookings', params)
    },
    verify: async (params) => {
        useLocalToken();
        return axiosInstance.post('payment/check', params)
    },
    getAll: async () => {
        useLocalToken()
        return axiosInstance.get('/profile/bookings')
    },
    get: async (id) => {
        useLocalToken();
        return axiosInstance.get(`bookings/${id}`)
    },
    repay: async(id) => {
        useLocalToken();
        return axiosInstance.post(`bookings/${id}/repay`)
    },
    bookingById: async (idHotel ,idRoom) => {
        useLocalToken();
        return axiosInstance.get(`/hotels/${idHotel}/rooms/${idRoom}/bookings`);
    },
    getAllBookingHotel: async(id) => {
        useLocalToken()
        return axiosInstance.get(`/hotels/${id}/bookings`)
    },

}

export default bookingApi