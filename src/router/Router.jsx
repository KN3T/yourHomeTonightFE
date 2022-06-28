import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ClientLayout } from '../components';
import { HomePage, HotelInCityPage, LoginPage, RegisterPage } from '../pages';

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels" element={<HotelInCityPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};
export default Router;
