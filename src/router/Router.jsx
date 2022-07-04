import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ClientLayout } from '../components';
import AdminLayout from '../components/AdminLayout/AdminLayout';
import {
  CheckoutConfirmationPage,
  CheckoutPage,
  CheckoutVerifyPage,
  DetailsHotelPage,
  HomePage,
  HotelInCityPage,
  LoginPage,
  RegisterPage,
  UserProfilePage,
} from '../pages';
import HotelManagement from '../pages/Admin/HotelManagement/HotelManagement';

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
          <Route
            path="/checkoutConfirmation"
            element={<CheckoutConfirmationPage />}
          />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/manageHotel" element={<HotelManagement />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkoutVerify" element={<CheckoutVerifyPage />} />
      </Routes>
    </>
  );
};
export default Router;
