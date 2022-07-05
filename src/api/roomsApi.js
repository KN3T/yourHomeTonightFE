import { axiosInstance } from "./axiosInstance";

export const roomsApi = {
    getAll(id){
        const url = `/hotels/${id}/rooms`
        return axiosInstance.get(url)
    },
    filter(params){
        console.log(params);
        const {id, children, adults, checkIn, checkOut} = params
        const url = `/hotels/${id}/rooms?checkIn=${checkIn}&checkOut=${checkOut}${children ? `&children=${children}` : "" }${adults ? `&adults=${adults}` : "" }`
        return axiosInstance.get(url)
    }
}