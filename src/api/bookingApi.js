import { axiosInstance } from "./axiosInstance";
import useLocalToken from './helpers'

const bookingApi = {
    book: async (params) => {
        useLocalToken()
        return axiosInstance.post('booking', params)
    },
    verify: async (params) => {
        useLocalToken()
        return axiosInstance.post('payment/check', params)
    },
    getAll: async () => {
        useLocalToken()
        return axiosInstance.get('/profile/bookings')
    }
}

export default bookingApi