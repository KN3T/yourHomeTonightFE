import { Button, Form, Select, message } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import RegisterForm from '../../components/RegisterForm/RegisterForm';
import './RegisterPage.scss';

const { Option } = Select;

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [loadingButton, setLoadingButton] = useState(false);
  const [isHotel, setIsHotel] = useState(false);
  const { t } = useTranslation();

  const handleChange = (value) => {
    if (value === 'hotel') {
      setIsHotel(true);
    } else {
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

  const layout = {
    labelCol: { span: { sm: 24, md: 8, lg: 6 } },
    wrapperCol: { span: { sm: 24, md: 16, lg: 12 } },
  };

  return (
    <div className="register__container">
      <div className="register__wrapper">
        <h2 className="register__form__title">{t('login.register')}</h2>
        <h2>Step {step}</h2>
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
          {step === 1 && (
            <Form.Item label={t('login.user_type')} name="type">
              <Select
                defaultValue="guest"
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

          {step === 2 ? (
            <>
              <RegisterForm loading={loadingButton} isHotel={isHotel} />
              <Button onClick={() => setStep(1)}>Back</Button>
            </>
          ) : (
            <>
              <Form.Item>
                <div className="register__form__link">
                  <span>{t('login.already_have_account')}</span>
                  <Link to="/login">{t('login.login_now')}</Link>
                </div>
              </Form.Item>
              <Button type="primary" onClick={() => setStep(2)}>
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
