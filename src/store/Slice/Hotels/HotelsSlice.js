import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import hotelApi from '../../../api/hotelApi';

export const getByIdAsync = createAsyncThunk('hotels/get-by-id', async (id) => {
  return await hotelApi.getById(id);
});

const HotelsSlice = createSlice({
  name: 'hotelsSlice',
  initialState: {
    list: [],
    loading: false,
    singleHotel: {},
  },
  
  reducers: {},
  extraReducers: {
    [getByIdAsync.pending]: (state) => {
      state.loading = true;
    },
    [getByIdAsync.rejected]: (state) => {
      state.loading = false;
    },
    [getByIdAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.singleHotel = action.payload;
    },
  },
});

export default HotelsSlice.reducer;
