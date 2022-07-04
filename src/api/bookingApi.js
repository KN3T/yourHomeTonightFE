import { axiosInstance } from "./axiosInstance";


const bookingApi = {
    book: async (params) => {
        return axiosInstance.post('bookings', params)
    },
    verify: async (params) => {
        return axiosInstance.post('payment/check', params)
    },
    get: async (id) => {
        return axiosInstance.get(`bookings/${id}`)
    },
    repay: async(id) => {
        return axiosInstance.post(`bookings/${id}/repay`)
    }
}

export default bookingApi