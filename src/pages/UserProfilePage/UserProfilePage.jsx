import { Col, Form, Row } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ProfileForm } from '../../components';
import './UserProfilePage.scss';

const UserProfilePage = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const handleSubmitForm = (values) => {
    console.log(values);
  };

  return (
    <div className="profile__container">
      <div className="profile__wrapper">
        <div className="user_profile_banner">
          <img
            className="user_profile_bg"
            width="100%"
            height={300}
            src="https://www.kayak.co.uk/news/wp-content/uploads/sites/5/2022/04/dest_usa_california_venice-beach_skate-park_gettyimages-495523864_kayak_within-usage-period_27806-1920x600.jpg"
          />
        </div>

        <section className="profile__content ctn">
          <Row
            gutter={16}
            style={{ justifyContent: 'center', paddingBottom: 70 }}
          >
            <Col span={18} style={{ marginTop: -80 }}>
              <Row
                gutter={16}
                className="profile__content__summary"
                style={{ background: 'white', padding: 25 }}
              >
                <Col lg={12} md={12} sm={12} xs={24}>
                  <div
                    className="border_vip"
                    style={{ borderRight: '1.5px solid #e6ebef' }}
                  >
                    {' '}
                    <h1>{userData.fullName}</h1>
                    <span
                      className="account_email"
                      style={{ color: 'rgb(79, 111, 143)' }}
                    >
                      {t('profile.account_email')}
                    </span>
                    <p>{userData.email}</p>
                  </div>
                </Col>
                <Col lg={3} md={6} sm={6} xs={24}>
                  <div>
                    <img
                      className="img_vip"
                      src="https://t3.ftcdn.net/jpg/00/55/23/16/240_F_55231640_zsy1IiQ49IGdXzXMZx9XGzgoKcDZwALm.jpg"
                      style={{ width: '100%' }}
                    ></img>
                  </div>
                </Col>

                <Col lg={9} md={6} sm={6} xs={24}>
                  <div>
                    <h3 style={{ color: 'rgb(0, 104, 239)' }}>
                      {t('profile.congrats')}
                    </h3>
                    <p style={{ color: 'rgb(79, 111, 143)' }}>
                      {t('profile.congrats_vip')}
                    </p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>

        <section className="profile__content ctn">
          <Row gutter={[16, 0]} style={{ justifyContent: 'center' }}>
            <Col lg={16} md={24} sm={24} xs={24}>
              <div className="checkout__content__form">
                <ProfileForm
                  form={form}
                  handleSubmitForm={handleSubmitForm}
                  userData={userData}
                />
              </div>
            </Col>
            <Col lg={7} md={24} sm={24} xs={24} style={{ paddingTop: 15 }}>
              <div className="profile__content__summary">
                <div className="profile__content__summary__list">
                  <div className="profile__content__summary__item">
                    <span>{t('profile.not_trip')}</span>
                  </div>
                  <div className="profile__content__summary__item">
                    <span>
                      <a>{t('profile.find_trip')}</a>
                    </span>
                  </div>
                  <div className="profile__content__summary__item">
                    <span>
                      <a>{t('profile.top_faq')}</a>
                    </span>
                  </div>
                </div>
                <div className="profile__content__summary__total">
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

export default UserProfilePage;
