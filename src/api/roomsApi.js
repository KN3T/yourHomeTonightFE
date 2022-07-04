import { axiosInstance } from "./axiosInstance";

export const roomsApi = {
    getAll(id){
        const url = `/hotels/${id}/rooms`
        return axiosInstance.get(url)
    },
    filter(params){
        const {id, children, adults, checkIn, checkOut} = params
        const url = `/hotels/${id}/rooms?children=${children}&adults=${adults}&checkIn=${checkIn}&checkOut=${checkOut}`
        return axiosInstance.get(url)
    }
}