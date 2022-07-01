/* eslint-disable react/prop-types */
import { Button, Form, Input, Radio } from 'antd';
import React from 'react';

import stripe_logo_blue from '../../assets/images/stripe_logo_blue.png';
import './CheckoutForm.scss';

const CheckoutForm = (props) => {
  const { handleSubmitForm, form, userData } = props;

  const handleFinish = (values) => {
    handleSubmitForm(values);
  };

  return (
    <Form
      onFinish={() => {
        form
          .validateFields()
          .then((values) => {
            handleFinish(values);
          })
          .catch((err) => {
            console.log(err);
          });
      }}
      className="checkout__form__wrapper"
      size="large"
      form={form}
      initialValues={{
        fullName: userData.fullName,
        email: userData.email,
      }}
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
          name="fullName"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input className="form__item__input" placeholder="Full name *" />
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
          Stripe
          <span className="radio__logo">
            <img src={stripe_logo_blue} alt="" style={{ width: '70px' }} />
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
