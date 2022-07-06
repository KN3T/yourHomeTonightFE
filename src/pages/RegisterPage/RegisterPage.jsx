import { Steps, message } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { RegisterForm } from '../../components';
import './RegisterPage.scss';

const { Step } = Steps;

const RegisterPage = () => {
  const loadingContext = useLoadingContext();

  const [loadingButton, setLoadingButton] = useState(false);
  const [isHotel, setIsHotel] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentType, setCurrentType] = useState('guest');

  const { t } = useTranslation();
  const navigate = useNavigate();

  const steps = [
    {
      title: 'Choose user type',
    },
    {
      title: 'Fill information',
    },
  ];

  const onClickNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const onClickPreStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChange = (value) => {
    if (value === 'hotel') {
      setCurrentType('hotel');
      setIsHotel(true);
    } else if (value === 'guest') {
      setCurrentType('guest');
      setIsHotel(false);
    }
  };

  const onFinish = async (values) => {
    setLoadingButton(true);
    setTimeout(() => {
      console.log({
        ...values,
        isHotel: isHotel,
      });
      setLoadingButton(false);
      navigate('/login');
      message.success('Register successfully');
    }, 3000);
  };

  const onFinishFailed = () => {
    console.log('something went wrong');
  };

  loadingContext.done();

  return (
    <div className="register__container">
      <div className="register__wrapper">
        <h2 className="register__form__title">{t('login.register')}</h2>
        <Steps current={currentStep}>
          {steps.map((step) => {
            return <Step key={step.title} title={step.title} />;
          })}
        </Steps>
        <RegisterForm
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          handleChange={handleChange}
          onClickNextStep={onClickNextStep}
          onClickPreStep={onClickPreStep}
          currentType={currentType}
          currentStep={currentStep}
          loading={loadingButton}
          isHotel={isHotel}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
