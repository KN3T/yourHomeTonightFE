import { configureStore } from '@reduxjs/toolkit';

import HotelsSlice from './Slice/Hotels/HotelsSlice';

export const store = configureStore({
  reducer: {
    hotels: HotelsSlice,
  },
});
