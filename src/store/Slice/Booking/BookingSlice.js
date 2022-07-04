import { createSlice } from "@reduxjs/toolkit";

export const BookingSlice = createSlice({
    name: 'booking',
    initialState: {
        orders: {},
        confirmation: {},
        searchDate: {}

    },
    reducers: {
        addOrder: (state, action) => {
            state.orders = action.payload
        },

        addConfirmation: (state, action) => {
            state.confirmation = action.payload
        },

        addSearchDate: (state, action) => {
            state.searchDate = action.payload
        }
    }
})

export const { addOrder,addConfirmation, addSearchDate } = BookingSlice.actions
export default BookingSlice.reducer