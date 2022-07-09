import { configureStore } from '@reduxjs/toolkit';

import BookingSlice from './Slice/Booking/BookingSlice';

export const store = configureStore({
  reducer: {
    booking: BookingSlice,
  },
});
