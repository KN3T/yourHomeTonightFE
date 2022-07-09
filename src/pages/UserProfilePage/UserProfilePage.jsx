import { TransactionOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, Spin } from 'antd';
import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import bookingApi from '../../api/bookingApi';
import { ProfileForm, Transaction } from '../../components';
import './UserProfilePage.scss';

const { TabPane } = Tabs;

const UserProfilePage = () => {
  const loadingContext = useLoadingContext();
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getAllBooking = async () => {
      setLoading(true);
      const response = await bookingApi.getAll();
      if (response.data.status === 'success') {
        const { data } = response.data;
        setBookings(data);
        setLoading(false);
        loadingContext.done();
      }
    };
    getAllBooking();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="profile__container">
        <div className="profile__wrapper">
          <div style={{ height: '5vh' }} />
          <section className="profile__content ctn">
            <Card>
              <Row gutter={[0, 10]}>
                <Col className="profile__content__image" xl={24} lg={24}>
                  <Avatar
                    data-testid="avatar"
                    size={150}
                    src="https://joeschmoe.io/api/v1/random"
                  />
                </Col>
              </Row>
            </Card>
          </section>
          <Tabs defaultActiveKey="1" className="ctn">
            <TabPane
              tab={
                <span>
                  <UserOutlined />
                  Profile
                </span>
              }
              key="1"
            >
              <Row gutter={[16, 0]}>
                <Col lg={16} md={24} sm={24} xs={24}>
                  <div className="checkout__content__form">
                    <ProfileForm />
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
                          <Link to="/">{t('profile.find_trip')}</Link>
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
            </TabPane>
            <TabPane
              tab={
                <span>
                  <TransactionOutlined />
                  History
                </span>
              }
              key="2"
            >
              {bookings && <Transaction bookings={bookings} />}
            </TabPane>
          </Tabs>
        </div>
      </div>
    </Spin>
  );
};

export default UserProfilePage;
