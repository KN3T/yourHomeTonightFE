import { configureStore } from '@reduxjs/toolkit';

import HotelsSlice from './Slice/Hotels/HotelsSlice';
import RoomsSlice from './Slice/Rooms/RoomsSlice'

export const store = configureStore({
  reducer: {
    hotels: HotelsSlice,
    rooms: RoomsSlice
  },
});
