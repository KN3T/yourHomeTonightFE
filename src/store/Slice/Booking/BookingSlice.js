import { createSlice } from "@reduxjs/toolkit";

export const BookingSlice = createSlice({
    name: 'booking',
    initialState: {
        orders: []
    },
    reducers: {
        addOrder: (state, action) => {
            state.orders.push(action.payload)
        }
    }
})

export const {addOrder} = BookingSlice.actions
export default BookingSlice.reducer