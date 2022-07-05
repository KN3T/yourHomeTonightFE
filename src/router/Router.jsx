import React from 'react';
import { Route, Routes } from 'react-router-loading';

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
          <Route path="/" element={<HomePage />} loading />
          <Route path="/hotels" element={<HotelInCityPage />} loading />
          <Route path="/hotels/:id" element={<DetailsHotelPage />} loading />
          <Route path="/userProfile" element={<UserProfilePage />} loading />
          <Route path="/checkout" element={<CheckoutPage />} loading />
          <Route
            path="/detailsBooking/:id"
            element={<DetailsBookingPage />}
            loading
          />
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
