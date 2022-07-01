import { Result, Spin } from 'antd';
import React from 'react';

const CheckoutVerifyPage = () => {
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
