import { Button, Form, Select, Steps, message } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import RegisterForm from '../../components/RegisterForm/RegisterForm';
import './RegisterPage.scss';

const { Option } = Select;
const { Step } = Steps;

const RegisterPage = () => {
  const [loadingButton, setLoadingButton] = useState(false);
  const [isHotel, setIsHotel] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentType, setCurrentType] = useState('guest');

  const { t } = useTranslation();

  const layout = {
    labelCol: { span: { sm: 24, md: 8, lg: 6 } },
    wrapperCol: { span: { sm: 24, md: 16, lg: 12 } },
  };

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
    console.log(value);
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
      message.success('Login successfully');
    }, 3000);
  };

  const onFinishFailed = () => {
    console.log('something went wrong');
  };

  return (
    <div className="register__container">
      <div className="register__wrapper">
        <h2 className="register__form__title">{t('login.register')}</h2>
        <Steps current={currentStep}>
          {steps.map((step) => {
            return <Step key={step.title} title={step.title} />;
          })}
        </Steps>
        <Form
          labelCol={layout.labelCol}
          wrapperCol={layout.wrapperCol}
          className="register__form"
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
          {currentStep === 0 && (
            <Form.Item>
              <Select
                defaultValue={currentType}
                style={{
                  width: '100%',
                }}
                onChange={handleChange}
              >
                <Option value="guest">{t('login.guest')}</Option>
                <Option value="hotel">{t('login.owner')}</Option>
              </Select>
            </Form.Item>
          )}

          {currentStep === 1 ? (
            <>
              <RegisterForm loading={loadingButton} isHotel={isHotel} />
              <Button onClick={onClickPreStep}>Back</Button>
            </>
          ) : (
            <>
              <Form.Item>
                <div className="register__form__link">
                  <span>{t('login.already_have_account')}</span>
                  <Link to="/login">{t('login.login_now')}</Link>
                </div>
              </Form.Item>
              <Button type="primary" onClick={onClickNextStep}>
                Next
              </Button>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
