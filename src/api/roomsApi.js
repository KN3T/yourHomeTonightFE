import { axiosInstance } from "./axiosInstance";
import useLocalToken from './helpers'

export const roomsApi = {
    getAll(id) {
        const url = `/hotels/${id}/rooms`
        return axiosInstance.get(url)
    },
    
    filter(params) {
        const { id, children, adults, checkIn, checkOut } = params
        const url = `/hotels/${id}/rooms?checkIn=${checkIn}&checkOut=${checkOut}${children ? `&children=${children}` : "" }${adults ? `&adults=${adults}` : "" }`
        return axiosInstance.get(url)
    },
    
    getDetail(idHotel, idRoom) {
        const url = `/hotels/${idHotel}/rooms/${idRoom}`
        return axiosInstance.get(url)
    },

    uploadImage: (images) => {
        useLocalToken();
        return axiosInstance.post(
            'https://api.yourhometonight.com/api/images',
            images,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
    } ,

    add: (params) => {
        useLocalToken();
        return axiosInstance.post(`/hotels/${params.id}/rooms`, {
            number: params.number,
            type: params.type,
            price: params.price,
            adults: params.adults,
            children: params.children,
            asset: params.asset,
            beds: params.beds,
            description: params.description,
            images: params.images
        })
    },

    update: (params) => {
        useLocalToken();
        return axiosInstance.put(`/hotels/${params.hotelId}/rooms/${params.roomId}`, {
            number: params.number,
            type: params.type,
            price: params.price,
            adults: params.adults,
            children: params.children,
            asset: params.asset,
            beds: params.beds,
            description: params.description,
            images: params.images
        })
    },

    delete: (params) => {
        useLocalToken();
        return axiosInstance.delete(`/hotels/${params.id}/rooms/${params.roomId}`)
    }
}