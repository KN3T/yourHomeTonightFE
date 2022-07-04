import { axiosInstance } from "./axiosInstance";
import useLocalToken from './helpers'

const bookingApi = {
    book: async (params) => {
        useLocalToken()
        return axiosInstance.post('bookings', params)
    },
    verify: async (params) => {
        useLocalToken()
        return axiosInstance.post('payment/check', params)
    },

    get: async (id) => {
        useLocalToken()
        return axiosInstance.get(`bookings/${id}`)
    }
}

export default bookingApi