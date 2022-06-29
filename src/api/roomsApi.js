import { axiosInstance } from "./axiosInstance";

export const roomsApi = {
    getAll(){
        const url = 'https://62b95f6641bf319d227ae509.mockapi.io/kn3t/rooms/'
        return axiosInstance.get(url)
    }
}