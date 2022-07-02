import { createSlice } from "@reduxjs/toolkit";

export const BookingSlice = createSlice({
    name: 'booking',
    initialState: {
        orders: {},
        confirmation: {}
    },
    reducers: {
        addOrder: (state, action) => {
            state.orders = action.payload
        },

        addConfirmation: (state, action) => {
            state.confirmation = action.payload
        }
    }
})

export const { addOrder,addConfirmation } = BookingSlice.actions
export default BookingSlice.reducer