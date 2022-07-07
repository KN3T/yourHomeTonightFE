import { TransactionOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Card,
  Col,
  Form,
  Image,
  List,
  Menu,
  Row,
  Skeleton,
  Space,
  Table,
} from 'antd';
import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoadingContext } from 'react-router-loading';

import bookingApi from '../../api/bookingApi';
import { ProfileForm, Transaction } from '../../components';
import './UserProfilePage.scss';

const { TabPane } = Tabs;

const UserProfilePage = () => {
  const loadingContext = useLoadingContext();

  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getAllBooking = async () => {
      const response = await bookingApi.getAll();
      const { data } = response.data;
      data && setBookings(data);
    };
    getAllBooking();
  }, []);

  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const handleSubmitForm = (values) => {};

  loadingContext.done();

  return (
    <div className="profile__container">
      <div className="profile__wrapper">
        <div style={{ height: '5vh' }} />
        <section className="profile__content ctn">
          <Card>
            <Row gutter={[0, 10]}>
              <Col className="profile__content__image" xl={24} lg={24}>
                <Avatar
                  size={100}
                  src="https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
                <div style={{ display: 'inline-block' }} className="border_vip">
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
            <section className="profile__content ctn">
              <Row gutter={[16, 0]}>
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
  );
};

export default UserProfilePage;
