import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { roomsApi } from "../../../api/roomsApi";

export const filterRoomsByBedsAsync = createAsyncThunk(
    'filter-by-beds',
    async (params) => {
        const response = await roomsApi.filterByBeds(params)
        // return console.log(response)
        return response.data
    }
)

export const FilterRoomsSlice = createSlice({
    name: 'filterRooms',
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [filterRoomsByBedsAsync.pending]: state => {
            state.loading = true
        },
        [filterRoomsByBedsAsync.rejected]: state => {
            state.loading = false
            message.error('filter failed')
        },
        [filterRoomsByBedsAsync.fulfilled]: (state, action) => {
            state.list = action.payload.data.rooms
        }
    },
})

export default FilterRoomsSlice.reducer