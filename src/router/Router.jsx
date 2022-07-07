import React from 'react';
import { Route, Routes } from 'react-router-loading';

import { AdminLayout, ClientLayout, GuestLayout } from '../components';
import {
  CheckoutConfirmationPage,
  CheckoutPage,
  CheckoutVerifyPage,
  Dashboard,
  DetailsBookingPage,
  DetailsHotelPage,
  HomePage,
  HotelInCityPage,
  HotelInfo,
  HotelManagement,
  LoginPage,
  NotFoundPage,
  RegisterPage,
  RoomDetail,
  UserProfilePage,
} from '../pages';

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<GuestLayout />} loading>
          <Route path="/" element={<HomePage />} loading />
          <Route path="/hotels" element={<HotelInCityPage />} loading />
          <Route path="/hotels/:id" element={<DetailsHotelPage />} loading />
        </Route>

        <Route element={<ClientLayout />} loading>
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
          <Route path="rooms/:roomId" element={<RoomDetail />} loading />
          <Route path="profile" element={<HotelInfo />} loading />
        </Route>

        <Route path="/login" element={<LoginPage />} loading />
        <Route path="/register" element={<RegisterPage />} loading />
        <Route
          path="/checkoutVerify"
          element={<CheckoutVerifyPage />}
          loading
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
export default Router;
