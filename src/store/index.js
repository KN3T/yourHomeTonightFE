import { configureStore } from '@reduxjs/toolkit';

import HotelsSlice from './Slice/Hotels/HotelsSlice';
import RoomsSlice from './Slice/Rooms/RoomsSlice'
import BookingSlice from './Slice/Booking/BookingSlice'
import  FilterRoomsSlice  from './Slice/Rooms/FilterRoomsSlice';

export const store = configureStore({
  reducer: {
    hotels: HotelsSlice,
    rooms: RoomsSlice,
    booking: BookingSlice,
    filterRooms: FilterRoomsSlice
  },
});
