/* eslint-disable react/prop-types */
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import './RegisterForm.scss';

const RegisterForm = (props) => {
  const { loading, isHotel } = props;
  const { t } = useTranslation();

  return (
    <>
      {isHotel && (
        <Form.Item
          label={t('login.hotel_name')}
          name="hotelName"
          rules={[
            {
              required: true,
              message: 'Please enter your hotel name!',
            },
          ]}
        >
          <Input placeholder={t('login.name_placeholder')} />
        </Form.Item>
      )}
      <Form.Item
        label={t('login.email')}
        name="email"
        rules={[
          {
            required: true,
            message: 'Please enter your email!',
          },
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        ]}
      >
        <Input placeholder={t('login.email_placeholder')} />
      </Form.Item>

      <Form.Item
        label={t('login.password')}
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter your password!',
          },
        ]}
      >
        <Input.Password placeholder={t('login.password_placeholder')} />
      </Form.Item>
      <Form.Item>
        <div className="register__form__link">
          <span>{t('login.already_have_account')}</span>
          <Link to="/login">{t('login.login_now')}</Link>
        </div>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="submit__button"
          loading={loading}
        >
          {t('login.register')}
        </Button>
      </Form.Item>
    </>
  );
};

export default RegisterForm;
