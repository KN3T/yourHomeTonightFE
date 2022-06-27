import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';

import './LoginPage.scss';

const LoginPage = () => {
  const [loadingButton, setLoadingButton] = useState(false);

  const onFinish = (values) => {
    setLoadingButton(true);
    setTimeout(() => {
      console.log(values);
      setLoadingButton(false);
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
    <div className="login__container">
      <div className="login__wrapper">
        <h2 className="login__form__title">Login</h2>
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
            label="Email"
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
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <div className="login__form__link">
              <span>Do not have account?</span>
              <Button type="link">Register</Button>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="submit__button"
              loading={loadingButton}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
