import { message } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { loginApi } from '../../api';
import useLocalToken from '../../api/helpers';
import { LoginForm } from '../../components';
import './LoginPage.scss';

const LoginPage = () => {
  const [loadingButton, setLoadingButton] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoadingButton(true);
    try {
      const response = await loginApi.login({
        email: values.email,
        password: values.password,
      });
      const status = await response.data.status;
      const data = await response.data;
      if (status === 'success') {
        localStorage.setItem('userData', JSON.stringify(data.data));
        setLoadingButton(false);
        useLocalToken();
        navigate('/');
        message.success('Login successfully');
      }
    } catch (error) {
      setLoadingButton(false);
      message.error(error.response.data.message);
    }
  };

  const onFinishFailed = () => {
    console.log('something went wrong');
  };

  return (
    <div className="login__container">
      <div className="login__wrapper">
        <h2 className="login__form__title">{t('login.login')}</h2>
        <LoginForm
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          loadingButton={loadingButton}
        />
      </div>
    </div>
  );
};

export default LoginPage;
