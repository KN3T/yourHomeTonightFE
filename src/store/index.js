import { configureStore } from '@reduxjs/toolkit';

import HotelsSlice from './Slice/Hotels/HotelsSlice';
import RoomsSlice from './Slice/Rooms/RoomsSlice'
import BookingSlice from './Slice/Booking/BookingSlice'

export const store = configureStore({
  reducer: {
    hotels: HotelsSlice,
    rooms: RoomsSlice,
    booking: BookingSlice
  },
});
