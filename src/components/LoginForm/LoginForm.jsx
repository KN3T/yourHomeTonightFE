/* eslint-disable react/prop-types */
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import './LoginForm.scss';

const LoginForm = ({ onFinish, onFinishFailed, loadingButton }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const layout = {
    labelCol: { span: { sm: 24, md: 8, lg: 6 } },
    wrapperCol: { span: { sm: 24, md: 16, lg: 12 } },
  };

  const onClickToRegister = () => {
    navigate('/register', { state: location.state });
  };
  return (
    <Form
      labelCol={layout.labelCol}
      wrapperCol={layout.wrapperCol}
      className="login__form"
      name="basic"
      initialValues={{
        remember: true,
      }}
      layout="vertical"
      size="large"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
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
        <div className="login__form__link">
          <span>{t('login.not_have_account')}</span>
          <a onClick={onClickToRegister}>{t('login.register_now')}</a>
        </div>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="submit__button"
          loading={loadingButton}
        >
          {t('login.login')}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
