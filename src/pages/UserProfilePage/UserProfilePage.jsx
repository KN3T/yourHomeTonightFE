import { Col, Form, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ProfileForm } from '../../components';
import './UserprofilePage.scss';

const UserprofilePage = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const handleSubmitForm = (values) => {
    console.log(values);
  };

  return (
    <div className="checkout__container">
      <div className="checkout__wrapper">
        <div className="user_profile_banner">
          <img
            className="user_profile_bg"
            width="100%"
            height={300}
            src="https://www.kayak.co.uk/news/wp-content/uploads/sites/5/2022/04/dest_usa_california_venice-beach_skate-park_gettyimages-495523864_kayak_within-usage-period_27806-1920x600.jpg"
          />
        </div>
        <div className="checkout__banner"></div>

        <section className="checkout__content ctn">
          <Row gutter={[16, 0]}>
            <Col span={16}>
              <div className="checkout__content__form">
                <ProfileForm
                  form={form}
                  handleSubmitForm={handleSubmitForm}
                  userData={userData}
                />
              </div>
            </Col>
            <Col span={7} style={{ paddingTop: 15 }}>
              <div className="checkout__content__summary">
                <div className="checkout__content__summary__list">
                  <div className="checkout__content__summary__item">
                    <span>{t('profile.not_trip')}</span>
                  </div>
                  <div className="checkout__content__summary__item">
                    <span>
                      <a>{t('profile.find_trip')}</a>
                    </span>
                  </div>
                  <div className="checkout__content__summary__item">
                    <span>
                      <a>{t('profile.top_faq')}</a>
                    </span>
                  </div>
                </div>
                <div className="checkout__content__summary__total">
                  <span>{t('profile.need_help')}</span>
                </div>
              </div>
            </Col>
          </Row>
        </section>
      </div>
    </div>
  );
};

export default UserprofilePage;
