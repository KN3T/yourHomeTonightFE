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
    }
}

export default bookingApi