import React from 'react';
import { Route, Routes } from 'react-router-loading';

import { ClientLayout, GuestLayout } from '../components';
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
  NotFoundPage,
  RegisterPage,
  UserProfilePage,
} from '../pages';
import Dashboard from '../pages/Admin/Dashboard/Dashboard';
import HotelManagement from '../pages/Admin/HotelManagement/HotelManagement';

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels" element={<HotelInCityPage />} />
          <Route path="/hotels/:id" element={<DetailsHotelPage />} />
        </Route>

        <Route element={<ClientLayout />}>
          <Route path="/userProfile" element={<UserProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/detailsBooking/:id" element={<DetailsBookingPage />} />
          <Route
            path="/checkoutConfirmation/:id"
            element={<CheckoutConfirmationPage />}
          />
        </Route>

        <Route path="/manageHotel/:id" element={<AdminLayout />} loading>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="rooms" element={<HotelManagement />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkoutVerify" element={<CheckoutVerifyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
export default Router;
