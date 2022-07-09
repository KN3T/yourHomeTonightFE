import { configureStore } from '@reduxjs/toolkit';

import HotelsSlice from './Slice/Hotels/HotelsSlice';
import BookingSlice from './Slice/Booking/BookingSlice';

export const store = configureStore({
  reducer: {
    hotels: HotelsSlice,
    booking: BookingSlice,
  },
});
