import { axiosInstance } from "./axiosInstance";

export const roomsApi = {
    getAll(id){
        const url = `http://api.yourhometonight.com/api/hotels/${id}/rooms`
        return axiosInstance.get(url)
    },
    delete(hotelId, roomId){
        const url = `http://api.yourhometonight.com/api/hotels/${hotelId}/rooms/${roomId}`
        return axiosInstance.delete(url)
    }
}