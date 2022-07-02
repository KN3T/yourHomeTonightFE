import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ClientLayout } from '../components';
import {
  CheckoutPage,
  DetailsHotelPage,
  HomePage,
  HotelInCityPage,
  LoginPage,
  RegisterPage,
  UserProfilePage,
} from '../pages';

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels" element={<HotelInCityPage />} />
          <Route path="/hotels/:id" element={<DetailsHotelPage />} />
          <Route path="/userprofile" element={<UserProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};
export default Router;
