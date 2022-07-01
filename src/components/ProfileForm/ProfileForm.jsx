import { Button, Form, Input, Radio } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import './ProfileForm.scss';

const ProfileForm = (props) => {
  const { t } = useTranslation();
  const { handleSubmitForm, form, userData } = props;

  const handleFinish = (values) => {
    handleSubmitForm(values);
  };

  return (
    <Form
      onFinish={() => {
        form
          .validateFields()
          .then((values) => {
            handleFinish(values);
          })
          .catch((err) => {
            console.log(err);
          });
      }}
      className="checkout__form__wrapper"
      size="large"
      form={form}
      initialValues={{
        fullName: userData.fullName,
        email: userData.email,
      }}
    >
      <div className="checkout__form__item guest__info">
        <div className="guest__info__notice">
          <div>{t('profile.edit_profile')}</div>
        </div>
        <h2 className="form__item__title">{t('profile.info')}</h2>
        <Form.Item
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
          name="email"
          rules={[
            {
              required: true,
            },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input className="form__item__input" placeholder="Email address *" />
        </Form.Item>
        <Form.Item
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
            placeholder="Mobile phone number *"
          />
        </Form.Item>
      </div>

      <div className="checkout__form__item">
        <Button
          className="checkout__form__button"
          type="primary"
          htmlType="submit"
        >
          {t('profile.update')}
        </Button>
      </div>
    </Form>
  );
};

export default ProfileForm;