import { Col, Form, Row, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLoadingContext } from 'react-router-loading';

import { hotelApi } from '../../../api';
import { HotelProfileForm } from '../../../components';
import './HotelInfo.scss';

const UserProfilePage = () => {
  const loadingContext = useLoadingContext();
  const [hotelData, setHotelData] = useState();
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const getHotel = async (id) => {
    const response = await hotelApi.getById(id);
    if (response.data.status === 'success') {
      setHotelData(response.data.data);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getHotel(userData.hotelId);
  }, []);

  const handleSubmitForm = async (values) => {
    setLoading(true);
    const data = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      city: values.city,
      province: values.province,
      rules: values.rules,
      description: values.description,
      images: values.images,
    };
    try {
      const response = await hotelApi.update({
        data,
        hotelId: userData.hotelId,
      });
      if (response.data.status === 'success') {
        setHotelData(response.data.data);
        setLoading(false);
        message.success('Your hotel is updated!!!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadingContext.done();

  return (
    <Spin spinning={loading}>
      <div className="hotel__profile__container">
        <div className="hotel__profile__wrapper">
          <section className="hotel__profile__content ctn">
            <Row gutter={[16, 0]} style={{ justifyContent: 'center' }}>
              <Col lg={24} md={24} sm={24} xs={24}>
                <div className="checkout__content__form">
                  <HotelProfileForm
                    form={form}
                    handleUpdateHotel={handleSubmitForm}
                    userData={userData}
                    hotelData={hotelData}
                  />
                </div>
              </Col>
            </Row>
          </section>
        </div>
      </div>
    </Spin>
  );
};

export default UserProfilePage;
