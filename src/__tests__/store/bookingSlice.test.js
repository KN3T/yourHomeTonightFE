import { store } from "../../store"

import { describe, expect, it } from "vitest";
import reducer, { addConfirmation, addOrder } from "../../store/Slice/Booking/BookingSlice";

describe('bookingSlice', () => {
    it('should return initial state', () => {
        const initialState = store.getState().booking;
        expect(initialState).toEqual({
            orders: {},
            confirmation: {}
        })
    })

    it('should return an object that contain information about hotel and room', () => {
        const prevState = {
            orders: {},
            confirmation: {}
        };

        const addedItem = {
            checkIn: 1657253121,
            checkOut: 1657512321,
            selectedRoom: {
                id: 64,
                number: 5,
                type: "Normal",
                beds: 1,
                price: 15,
                adults: 2,
                children: 1,
                asset: ["Air condition", "Free Wifi"],
                description: "Description",
                hotelAddress: {
                    id: 10,
                    city: "Ho Chi Minh",
                    province: "Ho Chi Minh",
                    address: "21B, Bui Thi Xuan, Phuong Ben Thanh"
                },
                rating: 5
            }
        }

        expect(reducer(prevState, addOrder(addedItem))).toEqual({
            orders: {
                checkIn: 1657253121,
                checkOut: 1657512321,
                selectedRoom: {
                    id: 64,
                    number: 5,
                    type: "Normal",
                    beds: 1,
                    price: 15,
                    adults: 2,
                    children: 1,
                    asset: ["Air condition", "Free Wifi"],
                    description: "Description",
                    hotelAddress: {
                        id: 10,
                        city: "Ho Chi Minh",
                        province: "Ho Chi Minh",
                        address: "21B, Bui Thi Xuan, Phuong Ben Thanh"
                    },
                    rating: 5
                }
            },
            confirmation: {}
        })
    })


    it('should return an object that contain information about booking', () => {
        const prevState = {
            orders: {},
            confirmation: {}
        };

        const addedConfirmation = {
            booking: {
                id:134,
                fullName: "Nhut Le",
                phone: "0911000333",
                email: "user@gg.com",
                total: 49.5,
                status: 2,
                checkIn: {
                    date:"2022-07-08 00:00:00.000000",
                    timezone_type:3,
                    timezone:"UTC"
                },
                checkOut: {
                    date:"2022-07-08 00:00:00.000000",
                    timezone_type:3,
                    timezone:"UTC"
                },
                createdAt: {
                    date: "2022-07-08 04:19:05.000000",
                    timezone_type: 3,
                    timezone: "UTC"
                },
                user: {
                    id :13,
                    email :"user@gg.com",
                    fullName :"Nguyễn Văn",
                    phone :"0944112233",
                    role :"ROLE_USER"
                },
                room: {
                    id:64,
                    number:5,
                    type:"Normal",
                    price:15,
                    adults:2,
                    children:1,
                    asset: [
                        "Air condition",
                        "Free WiFi",
                        "Flat-screen TV",
                        "Minibar",
                        "Soundproofing",
                        "Ensuite bathroom"                    
                    ],
                    beds:1,
                    description: "abc",
                    images: [
                        {
                            imageId: 248,
                            src: "https://yourhometonight.s3.ap-southeast-1.amazonaws.com/b-62c6fe4047024.jpg"                        
                        },
                        {
                            imageId: 249,
                            src: "https://yourhometonight.s3.ap-southeast-1.amazonaws.com/b-62c6fe4047024.jpg"                        
                        },
                    ]       
                },
                hotel: {
                    id :10,
                    name :"The Chill Suites",
                    phone :"097484748",
                    email :"shillsuites@gg.com",
                    rules: ["no dogs", "no pum"] ,
                    address: {
                        city: "Ho Chi Minh",
                        province: "Ho Chi Minh",
                        address: "21B, Bui Thi Xuan, Phuong Ben Thanh"
                    }
                },
                images: [
                    {
                        imageId: 248,
                        src: "https://yourhometonight.s3.ap-southeast-1.amazonaws.com/b-62c6fe4047024.jpg"                        
                    },
                    {
                        imageId: 249,
                        src: "https://yourhometonight.s3.ap-southeast-1.amazonaws.com/b-62c6fe4047024.jpg"                        
                    },
                ]
            },
            payment: {
                billingName: "Nguyen Van A",
                purchasedAt: {
                    date: "2022-07-08 04:19:34.987745",
                    timezone_type: 3,
                    timezone: "UTC"   
                }
            }
        }

        expect(reducer(prevState, addConfirmation(addedConfirmation))).toEqual({
            orders: {},
            confirmation: {
                booking: {
                    id:134,
                    fullName: "Nhut Le",
                    phone: "0911000333",
                    email: "user@gg.com",
                    total: 49.5,
                    status: 2,
                    checkIn: {
                        date:"2022-07-08 00:00:00.000000",
                        timezone_type:3,
                        timezone:"UTC"
                    },
                    checkOut: {
                        date:"2022-07-08 00:00:00.000000",
                        timezone_type:3,
                        timezone:"UTC"
                    },
                    createdAt: {
                        date: "2022-07-08 04:19:05.000000",
                        timezone_type: 3,
                        timezone: "UTC"
                    },
                    user: {
                        id :13,
                        email :"user@gg.com",
                        fullName :"Nguyễn Văn",
                        phone :"0944112233",
                        role :"ROLE_USER"
                    },
                    room: {
                        id:64,
                        number:5,
                        type:"Normal",
                        price:15,
                        adults:2,
                        children:1,
                        asset: [
                            "Air condition",
                            "Free WiFi",
                            "Flat-screen TV",
                            "Minibar",
                            "Soundproofing",
                            "Ensuite bathroom"                    
                        ],
                        beds:1,
                        description: "abc",
                        images: [
                            {
                                imageId: 248,
                                src: "https://yourhometonight.s3.ap-southeast-1.amazonaws.com/b-62c6fe4047024.jpg"                        
                            },
                            {
                                imageId: 249,
                                src: "https://yourhometonight.s3.ap-southeast-1.amazonaws.com/b-62c6fe4047024.jpg"                        
                            },
                        ]       
                    },
                    hotel: {
                        id :10,
                        name :"The Chill Suites",
                        phone :"097484748",
                        email :"shillsuites@gg.com",
                        rules: ["no dogs", "no pum"] ,
                        address: {
                            city: "Ho Chi Minh",
                            province: "Ho Chi Minh",
                            address: "21B, Bui Thi Xuan, Phuong Ben Thanh"
                        }
                    },
                    images: [
                        {
                            imageId: 248,
                            src: "https://yourhometonight.s3.ap-southeast-1.amazonaws.com/b-62c6fe4047024.jpg"                        
                        },
                        {
                            imageId: 249,
                            src: "https://yourhometonight.s3.ap-southeast-1.amazonaws.com/b-62c6fe4047024.jpg"                        
                        },
                    ]
                },
                payment: {
                    billingName: "Nguyen Van A",
                    purchasedAt: {
                        date: "2022-07-08 04:19:34.987745",
                        timezone_type: 3,
                        timezone: "UTC"   
                    }
                }
            }
        })
    })
})