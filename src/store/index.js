import { configureStore } from '@reduxjs/toolkit';

import HotelsSlice from './Slice/Hotels/HotelsSlice';
import roomSlice from './Slice/Rooms/roomsSlice';

export const store = configureStore({
  reducer: {
    hotels: HotelsSlice,
    rooms: roomSlice
  },
});
