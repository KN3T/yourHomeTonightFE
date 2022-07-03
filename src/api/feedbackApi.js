import { axiosInstance } from "./axiosInstance"

export const feedbackApi = {
    addFeedback: async (feedback) => {
        
        return axiosInstance.post(`/bookings/${feedback.id}/rating`, feedback)
    }
}