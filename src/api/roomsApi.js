import { axiosInstance } from "./axiosInstance";

export const roomsApi = {
    getAll(id){
        const url = `/hotels/${id}/rooms`
        return axiosInstance.get(url)
    },
    filterByBeds(params){
        const {hotelId, beds} = params
        const url = `/hotels/${hotelId}/rooms?beds=${beds}`
        return axiosInstance.get(url)
    }
}