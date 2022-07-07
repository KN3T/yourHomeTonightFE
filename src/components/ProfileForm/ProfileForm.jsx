/* eslint-disable react/prop-types */
import { Button, Form, Input, Skeleton, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoadingContext } from 'react-router-loading';

import { profileApi } from '../../api/profileApi';
import './ProfileForm.scss';

const ProfileForm = () => {
  const loadingContext = useLoadingContext();

  const { t } = useTranslation();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getUserInfo = async () => {
    const { data } = await profileApi.get();
    data && setUserData(data.data);
    data && setIsLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleFinish = async (values) => {
    setIsLoading(true);
    await profileApi.update(values);
    getUserInfo();
    message.success(
      `It'll take a while to display your change in every where on the website`
    );
  };

  loadingContext.done();
  return (
    userData.fullName && (
      <Skeleton loading={isLoading}>
        <Form
          onFinish={handleFinish}
          className="profile__form__wrapper"
          size="large"
          initialValues={{
            fullName: userData.fullName,
            phone: userData.phone,
          }}
          labelCol={{
            span: 3,
          }}
        >
          <div className="profile__form__item guest__info">
            <h2 className="form__item__title">{t('profile.info')}</h2>
            <Form.Item
              label="Fullname"
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
