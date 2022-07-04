import { axiosInstance } from "./axiosInstance"

export const feedbackApi = {
    getAll: async (id) => {
        return axiosInstance.get(`/hotels/${id}/ratings`)
    },
    addFeedback: async (params) => {
        const {id, ...feedback} = params
        // return axiosInstance.post(`/bookings/${id}/rating`, feedback)

        return console.log(feedback, id)
    },
    getFeedbackPerBooking: async (idBooking) => {
        return axiosInstance.get(`/bookings/${idBooking}/rating`)
    }
    
}