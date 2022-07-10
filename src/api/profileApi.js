import { axiosInstance } from "./axiosInstance"
import useLocalToken from './helpers'

export const profileApi = {
    get(){
        useLocalToken()
        return axiosInstance.get(`/profile`)
    },
    update(data){
        useLocalToken()
        return axiosInstance.put('/profile', data)
    }
}