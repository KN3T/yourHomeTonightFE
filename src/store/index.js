import { configureStore } from '@reduxjs/toolkit';

import HotelsSlice from './Slice/Hotels/HotelsSlice';
import BookingSlice from './Slice/Booking/BookingSlice';
import RoomsSlice from './Slice/Rooms/RoomsSlice'
import  FilterRoomsSlice  from './Slice/Rooms/FilterRoomsSlice';

export const store = configureStore({
  reducer: {
    hotels: HotelsSlice,
    rooms: RoomsSlice,
    booking: BookingSlice,
    filterRooms: FilterRoomsSlice
  },
});
