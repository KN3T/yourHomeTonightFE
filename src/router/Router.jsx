import React from 'react';
import { Route, Routes } from 'react-router-loading';

import { ClientLayout } from '../components';
import AdminLayout from '../components/Admin/AdminLayout/AdminLayout';
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
import Dashboard from '../pages/Admin/Dashboard/Dashboard';
import HotelManagement from '../pages/Admin/HotelManagement/HotelManagement';

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<ClientLayout />} loading>
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
            loading
          />
        </Route>

        <Route path="/manageHotel/:id" element={<AdminLayout />} loading>
          <Route index element={<Dashboard />} loading />
          <Route path="dashboard" element={<Dashboard />} loading />
          <Route path="rooms" element={<HotelManagement />} loading />
        </Route>

        <Route path="/login" element={<LoginPage />} loading />
        <Route path="/register" element={<RegisterPage />} loading />
        <Route
          path="/checkoutVerify"
          element={<CheckoutVerifyPage />}
          loading
        />
      </Routes>
    </>
  );
};
export default Router;
