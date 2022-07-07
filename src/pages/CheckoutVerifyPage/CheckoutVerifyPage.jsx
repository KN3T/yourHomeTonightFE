/* eslint-disable no-unused-vars */
import { Result, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import bookingApi from '../../api/bookingApi';
import { addConfirmation } from '../../store/Slice/Booking/BookingSlice';

const CheckoutVerifyPage = () => {
  const loadingContext = useLoadingContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const bookingId = searchParams.get('bookId');
  const session = searchParams.get('sessionId');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyPayment = async (params) => {
    try {
      const response = await bookingApi.verify(params);
      if (response.data.status === 'success') {
        dispatch(
          addConfirmation({
            booking: response.data.data.booking,
            payment: response.data.data.paymentInfo,
          })
        );
        window.localStorage.setItem(
          'confirmation',
          JSON.stringify({
            booking: response.data.data.booking,
            payment: response.data.data.paymentInfo,
          })
        );
        navigate(`/checkoutConfirmation/${bookingId}`);
      }
    } catch (err) {
      navigate(`/checkoutConfirmation/${bookingId}`);
    }
  };

  useEffect(() => {
    verifyPayment({ bookingId, session });
  }, [bookingId, session]);

  loadingContext.done();

  return (
    <div className="checkout__check__page">
      <Result
        title="Please wait while we complete your booking. This may take a few minutes, do not go back or refresh this page..."
        extra={<Spin></Spin>}
      />
    </div>
  );
};

export default CheckoutVerifyPage;
