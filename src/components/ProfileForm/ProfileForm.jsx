/* eslint-disable react/prop-types */
import { Button, Form, Input, Skeleton, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoadingContext } from 'react-router-loading';

import { profileApi } from '../../api/profileApi';
import './ProfileForm.scss';

const ProfileForm = () => {
  const loadingContext = useLoadingContext();
  const [form] = Form.useForm();

  const { t } = useTranslation();
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem('userData'))
  );
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const getUserInfo = async () => {
    const { data } = await profileApi.get();
    data && setUserData(data.data);
    data && setIsLoading(false);
    loadingContext.done();
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      fullName: userData.fullName,
      phone: userData.phone,
    });
    loadingContext.done();
  }, [userData]);

  const handleFinish = async (values) => {
    setButtonLoading(true);
    try {
      await profileApi.update(values);
      getUserInfo();
      setButtonLoading(false);
      message.success('Update profile successfully!!!');
    } catch (error) {
      setButtonLoading(false);
      message.error('Some thing went wrong');
    }
  };

  return (
    userData.fullName && (
      <Skeleton loading={isLoading}>
        <Form
          form={form}
          onFinish={handleFinish}
          className="profile__form__wrapper"
          size="large"
          labelCol={{
            span: 3,
          }}
        >
          <div className="profile__form__item guest__info">
            <h2 className="form__item__title">{t('profile.info')}</h2>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                className="form__item__input"
                placeholder={t('profile.full_name')}
              />
            </Form.Item>
            <Form.Item
              label="Phone"
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
                placeholder={t('profile.phone')}
              />
            </Form.Item>
          </div>

          <div className="profile__form__item">
            <Button
              className="profile__form__button"
              type="primary"
              htmlType="submit"
              loading={buttonLoading}
            >
              {t('profile.update')}
            </Button>
          </div>
        </Form>
      </Skeleton>
    )
  );
};

export default ProfileForm;
