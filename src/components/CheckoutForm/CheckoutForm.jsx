/* eslint-disable react/prop-types */
import { Button, Form, Input, Radio } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import stripe_logo_blue from '../../assets/images/stripe_logo_blue.png';
import './CheckoutForm.scss';

const CheckoutForm = (props) => {
  const { handleSubmitForm, form, userData, loading } = props;
  const { t } = useTranslation();

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
        phone: userData.phone,
      }}
    >
      <div className="checkout__form__item guest__info">
        <div className="guest__info__notice">
          <div>{t('checkout.noti')}</div>
        </div>
        <h2 className="form__item__title">{t('checkout.guest_name')}</h2>
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
        <h2 className="form__item__title">{t('checkout.contact')}</h2>
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
        <h2 className="form__item__title">{t('checkout.payment')}</h2>
        <Radio value={1} className="radio__button" checked={true}>
          Stripe
          <span className="radio__logo">
            <img src={stripe_logo_blue} alt="" style={{ width: '70px' }} />
          </span>
        </Radio>
      </div>
      <div className="checkout__form__item">
        <div className="checkout__form__agreement">
          <span>{t('checkout.policy_confirm')}</span>
          <a className="text__highlight">{t('checkout.booking_conditions')}</a>
          <a className="text__highlight">{t('checkout.term_and_conditions')}</a>
          <span>{t('checkout.and')}</span>
          <a className="text__highlight">{t('checkout.privacy_policy')}</a>
        </div>
        <Button
          className="checkout__form__button"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          {t('checkout.complete_booking')}
        </Button>
      </div>
    </Form>
  );
};

export default CheckoutForm;
