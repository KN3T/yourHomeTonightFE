/* eslint-disable react/prop-types */
import { Button, Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import './RegisterForm.scss';

const { Option } = Select;

const RegisterForm = (props) => {
  const {
    loading,
    isHotel,
    onFinish,
    onFinishFailed,
    currentStep,
    currentType,
    handleChange,
    onClickNextStep,
    onClickPreStep,
  } = props;
  const { t } = useTranslation();
  const location = useLocation();

  const layout = {
    labelCol: { span: { sm: 24, md: 8, lg: 6 } },
    wrapperCol: { span: { sm: 24, md: 16, lg: 12 } },
  };
  const navigate = useNavigate();

  const onClickToLogin = () => {
    navigate('/login', { state: location.state });
  };

  return (
    <>
      <Form
        width={800}
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
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  label={t('login.full_name')}
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your full name!',
                    },
                  ]}
                >
                  <Input placeholder={t('login.full_name_placeholder')} />
                </Form.Item>
              </Col>
              <Col span={12}>
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
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={12}>
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
                  <Input.Password
                    placeholder={t('login.password_placeholder')}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={t('login.confirm_password')}
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            'The two passwords that you entered do not match!'
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder={t('login.confirm_password_placeholder')}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <div className="register__form__link">
                <span>{t('login.already_have_account')}</span>
                <a onClick={onClickToLogin}>{t('login.login_now')}</a>
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
            <Button onClick={onClickPreStep}>Back</Button>
          </>
        ) : (
          <>
            <Form.Item>
              <div className="register__form__link">
                <span>{t('login.already_have_account')}</span>
                <a onClick={onClickToLogin}>{t('login.login_now')}</a>
              </div>
            </Form.Item>
            <Button type="primary" onClick={onClickNextStep}>
              Next
            </Button>
          </>
        )}
      </Form>
    </>
  );
};

export default RegisterForm;
