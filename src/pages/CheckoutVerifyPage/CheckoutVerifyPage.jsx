/* eslint-disable no-unused-vars */
import { Result, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import bookingApi from '../../api/bookingApi';
import { addConfirmation } from '../../store/Slice/Booking/BookingSlice';

const CheckoutVerifyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const bookingId = searchParams.get('bookId');
  const session = searchParams.get('sessionId');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyPayment = async (params) => {
    const response = await bookingApi.verify(params);
    if (response.data.status === 'success') {
      dispatch(addConfirmation(response.data.data.booking));
      navigate('/checkoutConfirmation');
    }
  };

  useEffect(() => {
    verifyPayment({ bookingId, session });
  }, [bookingId, session]);

  return (
    <div className="checkout__check__page">
      <Result
        title="Your transaction is being processed, please wait for a few seconds..."
        extra={<Spin></Spin>}
      />
    </div>
  );
};

export default CheckoutVerifyPage;
