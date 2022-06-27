import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { loginApi } from '../../api';
import './LoginPage.scss';

const LoginPage = () => {
  const [loadingButton, setLoadingButton] = useState(false);
  const { t } = useTranslation();

  const onFinish = async (values) => {
    setLoadingButton(true);
    const response = await loginApi.login({
      email: values.email,
      password: values.password,
    });

    if (response.status === 200) {
      setLoadingButton(false);
      message.success('Login successfully');
    } else {
      setLoadingButton(false);
      message.error('Email or password is invalid');
    }
  };

  const onFinishFailed = () => {
    console.log('something went wrong');
  };

  const layout = {
    labelCol: { span: { sm: 24, md: 8, lg: 6 } },
    wrapperCol: { span: { sm: 24, md: 16, lg: 12 } },
  };

  return (
    <div className="login__container">
      <div className="login__wrapper">
        <h2 className="login__form__title">{t('login.login')}</h2>
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
              <Link to="/register">{t('login.register_now')}</Link>
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
      </div>
    </div>
  );
};

export default LoginPage;
