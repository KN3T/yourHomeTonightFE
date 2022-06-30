/* eslint-disable react/prop-types */
import { Button, Form, Input, Radio } from 'antd';
import React from 'react';

import paypal_logo from '../../assets/images/paypal_logo.jpg';
import './CheckoutForm.scss';

const CheckoutForm = (props) => {
  const { handleSubmitForm, form } = props;

  const handleFinish = (values) => {
    handleSubmitForm(values);
  };

  return (
    <Form
      onFinish={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleFinish(values);
          })
          .catch((err) => {
            console.log(err);
          });
      }}
      className="checkout__form__wrapper"
      size="large"
      form={form}
    >
      <div className="checkout__form__item guest__info">
        <div className="guest__info__notice">
          <div>
            The guest checking into each hotel room must be 21 or older, present
            a valid Photo ID and credit card.
          </div>
        </div>
        <h2 className="form__item__title">Guest Name</h2>
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
            },
          ]}
          style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
            marginBottom: '0',
          }}
        >
          <Input className="form__item__input" placeholder="First name *" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
            },
          ]}
          style={{
            display: 'inline-block',
            width: 'calc(50% - 8px)',
            marginLeft: '8px',
            marginBottom: '0',
          }}
        >
          <Input className="form__item__input" placeholder="Last name *" />
        </Form.Item>
      </div>
      <div className="checkout__form__item">
        <h2 className="form__item__title">Contact</h2>
        <Form.Item
          name="email"
          style={{
            marginBottom: '10px',
          }}
          rules={[
            {
              required: true,
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input className="form__item__input" placeholder="Email address *" />
        </Form.Item>
        <Form.Item
          name="phone"
          style={{
            marginBottom: '10px',
          }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            className="form__item__input"
            placeholder="Mobile phone number *"
          />
        </Form.Item>
      </div>
      <div className="checkout__form__item">
        <h2 className="form__item__title">Payment</h2>
        <Radio value={1} className="radio__button" checked={true}>
          Paypal
          <span className="radio__logo">
            <img src={paypal_logo} alt="" style={{ width: '100px' }} />
          </span>
        </Radio>
      </div>
      <div className="checkout__form__item">
        <div className="checkout__form__agreement">
          <span>By selecting Complete Booking you agree to the</span>
          <a className="text__highlight"> Booking Conditions,</a>
          <a className="text__highlight"> Terms and Conditions,</a>
          <span> and</span>
          <a className="text__highlight"> Privacy Policy</a>
        </div>
        <Button
          className="checkout__form__button"
          type="primary"
          htmlType="submit"
        >
          Complete Booking
        </Button>
      </div>
    </Form>
  );
};

export default CheckoutForm;
