import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { DetailsHotelPage, HomePage, LoginPage, RegisterPage } from '../pages';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/hotels/:id" element={<DetailsHotelPage />} />
      </Routes>
    </>
  );
};
export default Router;
