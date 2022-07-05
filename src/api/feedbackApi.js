import { axiosInstance } from "./axiosInstance"

export const feedbackApi = {
    getAll: async (id) => {
        return axiosInstance.get(`/hotels/${id}/ratings`)
    },
    addFeedback: async (params) => {
        const {id, ...feedback} = params
        return axiosInstance.put(`/bookings/${id}/rating`, feedback)

    },
    getFeedbackPerBooking: async (idBooking) => {
        return axiosInstance.get(`/bookings/${idBooking}/rating`)
    }
    
}