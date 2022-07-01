import {createSlice} from '@reduxjs/toolkit';

export const BookingSlice = createSlice({
    name: 'booking',
    initialState: {
        orders: [
            {
                dateCheckIn: '2022-07-01',
                dateCheckOut: '2022-07-03',
                roomData: {
                    id: 1,
                    name: 'A01',
                    type: 'Queen room',
                    price: 150,
                    images: [
                        {
                            src: "https://q-xx.bstatic.com/xdata/images/hotel/max300/351902045.jpg?k=8c2f8bc5e9983ecc8791d4a219b89ad362bb41e5d83a501d93131db64a5bbe62&o="
                        },
                        {
                            src: "https://q-xx.bstatic.com/xdata/images/hotel/max300/351902045.jpg?k=8c2f8bc5e9983ecc8791d4a219b89ad362bb41e5d83a501d93131db64a5bbe62&o="
                        },
                        {
                            src: "https://q-xx.bstatic.com/xdata/images/hotel/max300/351902045.jpg?k=8c2f8bc5e9983ecc8791d4a219b89ad362bb41e5d83a501d93131db64a5bbe62&o="
                        }
                    ],
                    beds: 2,
                    adults: 4,
                    children: 2,
                    assets: [
                        'abc', 'xyz', 'dcm', 'xxx'
                    ],
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti id minus nihil unde quasi ducimus officiis corporis dolorem at officia repellat omnis voluptatem fugiat, itaque fuga iure ullam provident natus!',
                },
                hotelAddress: 'Duong vao tim em',
                hotelRating: 4
            }
        ]
    },

    reducers: {
        addOrder: (state, action) => {
            state.orders = action.payload
        }
    }
})

export default BookingSlice.reducer