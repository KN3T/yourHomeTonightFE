import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { roomsApi } from "../../../api/roomsApi"

export const getAllRoomAsync = createAsyncThunk(
    'rooms/get-all',
    async(id) => {
        const response = await roomsApi.getAll(id)
        return response.data
    }
)


export const RoomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        list: [],
        loading: false,
        listFilter: []
    },
    reducers: {},
    extraReducers: {
        [getAllRoomAsync.pending]: state => {
            state.loading = true
        },
        [getAllRoomAsync.rejected]: state => {
            state.loading = false
        },
        [getAllRoomAsync.fulfilled]: (state, action) => {
            state.loading = false
            state.list = action.payload.data.rooms
        },
    }
})

export default RoomsSlice.reducer