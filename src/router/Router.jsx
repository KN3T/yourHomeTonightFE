import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ClientLayout } from '../components';
import {
  CheckoutConfirmationPage,
  CheckoutPage,
  CheckoutVerifyPage,
  DetailsBookingPage,
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
          <Route path="/userProfile" element={<UserProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/detailsBooking/:id" element={<DetailsBookingPage />} />
          <Route
            path="/checkoutConfirmation/:id"
            element={<CheckoutConfirmationPage />}
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkoutVerify" element={<CheckoutVerifyPage />} />
      </Routes>
    </>
  );
};
export default Router;
