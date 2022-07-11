import { Col, Divider, Form, Image, Row, Steps, message } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { ImNotification } from 'react-icons/im';
import { IoBedSharp } from 'react-icons/io5';
import { MdOutlineChildCare, MdSecurity } from 'react-icons/md';
import { RiShieldCheckFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import bookingApi from '../../api/bookingApi';
import { CheckoutForm } from '../../components';
import formatCurrency from '../../utils/formatCurrency';
import './CheckoutPage.scss';

const { Step } = Steps;
const CheckoutPage = () => {
  const loadingContext = useLoadingContext();

  const [form] = Form.useForm();
  const bookingData = useSelector((state) => state.booking.orders.checkIn)
    ? useSelector((state) => state.booking.orders)
    : JSON.parse(localStorage.getItem('bookingData'));

  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const nights =
    bookingData &&
    moment(bookingData.checkOut * 1000).diff(
      moment(bookingData.checkIn * 1000),
      'days'
    );

  const subTotal =
    bookingData &&
    bookingData.selectedRoom &&
    bookingData.selectedRoom.price * nights;

  const tax = subTotal * 0.1;

  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmitForm = async (values) => {
    setLoading(true);
    const data = {
      ...values,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      userId: userData.id,
      roomId: bookingData.selectedRoom.id,
    };

    try {
      const response = await bookingApi.book(data);
      if (response.data.status === 'success') {
        location.replace(response.data.data[0]);
      }
    } catch (error) {
      if (error.response.status === 403) {
        message.error("It's seem like you are not a regular user!!!");
        setLoading(false);
      } else {
        message.error(error.response.data.message);
        setLoading(false);
      }
    }
  };

  loadingContext.done();

  return bookingData ? (
    <div className="checkout__container">
      <div className="checkout__wrapper">
        <div className="checkout__banner">
          <div className="checkout__banner__content">
            <div className="checkout__banner__item">
              <RiShieldCheckFill />
              <span>{t('checkout.secure_transactions')}</span>
            </div>
            <div className="checkout__banner__item">
              <BiTimeFive />
              <span>{t('checkout.24_hours')}</span>
            </div>
            <div className="checkout__banner__item">
              <MdSecurity />
              <span>{t('checkout.trusted_payment')}</span>
            </div>
          </div>
        </div>

        <div className="checkout__progress">
          <Steps current={1} size="small">
            <Step title={t('checkout.choose_rom')} />
            <Step title={t('checkout.guest_payment')} />
            <Step title={t('checkout.booking_confirmation')} />
          </Steps>
        </div>

        <section className="checkout__content ctn">
          <div className="checkout__content__heading">
            <span>{t('checkout.almost_done')}</span>
            <span>{t('checkout.enter_and_complete')}</span>
            <Row gutter={[16, 0]}>
              <Col span={16}>
                <div
                  className="checkout__confirmation__content__heading"
                  style={{ padding: 0, margin: 0 }}
                >
                  <h1 style={{ margin: 0 }}>
                    {t('checkout.your_trip_to')}{' '}
                    {bookingData.hotelData.address.city}
                  </h1>
                  <div>
                    <div
                      style={{ width: '100%' }}
                      className="checkout__confirmation__small__summary"
                    >
                      <div
                        className="checkout__content__image"
                        style={{ marginRight: '16px' }}
                      >
                        <Image src={bookingData.hotelData.images[0].src} />
                      </div>
                      <div>
                        <Link to={`/hotels/${bookingData.hotelData.id}`}>
                          <h3 style={{ margin: 0, fontSize: '20px' }}>
                            <b>{bookingData.hotelData.name}</b>
                          </h3>
                        </Link>
                        <div>
                          <span
                            style={{
                              fontWeight: 'normal',
                              fontSize: '14px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <AiFillPhone style={{ marginRight: '5px' }} />
                            {bookingData.hotelData.phone}
                          </span>
                        </div>
                        <div>
                          <span
                            style={{
                              fontWeight: 'normal',
                              fontSize: '14px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <AiOutlineMail style={{ marginRight: '5px' }} />
                            {bookingData.hotelData.email}
                          </span>
                        </div>
                        <div>
                          <span
                            style={{
                              fontWeight: 'normal',
                              fontSize: '14px',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <ImNotification style={{ marginRight: '5px' }} />
                            <i>
                              {t('checkout.check_in_text')}{' '}
                              {t('checkout.check_in_note')}
                            </i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <Divider />

          {bookingData && bookingData.selectedRoom && (
            <Row gutter={[16, 16]}>
              <Col xxl={16} xl={15} lg={15} md={24} sm={24} xs={24}>
                <div className="checkout__content__info">
                  <div className="checkout__content__top">
                    <div className="checkout__content__image">
                      <Image src={bookingData.selectedRoom.images[0].src} />
                    </div>
                    <div className="checkout__content__description">
                      <h2>{bookingData.selectedRoom.type}</h2>
                      <p>
                        {bookingData.hotelAddress.address},{' '}
                        {bookingData.hotelAddress.city},{' '}
                        {bookingData.hotelAddress.province}
                      </p>
                    </div>
                  </div>
                  <div className="checkout__content__itinerary">
                    <Row gutter={[10, 10]} style={{ width: '100%' }}>
                      <Col xxl={16} xl={16} lg={16} md={16} sm={16} xs={24}>
                        <Row gutter={[10, 10]}>
                          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
                            <div className="schedule__item">
                              <div className="title">
                                {t('checkout.check_in')}
                              </div>
                              <div className="content">
                                {moment(bookingData.checkIn * 1000).format(
                                  'ddd, MMM Do'
                                )}
                              </div>
                            </div>
                          </Col>
                          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
                            <div className="schedule__item">
                              <div className="title">
                                {t('checkout.check_out')}
                              </div>
                              <div className="content">
                                {moment(bookingData.checkOut * 1000).format(
                                  'ddd, MMM Do'
                                )}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={24}>
                        <div className="schedule__item">
                          <div className="title">{t('checkout.nights')}</div>
                          <div className="content">{nights}</div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="checkout__content__bottom">
                    <div className="room__type">{bookingData.type}</div>
                    <div className="room__assets">
                      <ul>
                        <li className="room__assets__item">
                          <IoBedSharp />
                          <span>
                            {t('checkout.beds')}
                            {': '} {bookingData.selectedRoom.beds}
                          </span>
                        </li>
                        <li className="room__assets__item">
                          <BsFillPeopleFill />
                          <span>
                            {t('checkout.adults')}
                            {': '}
                            {bookingData.selectedRoom.adults}
                          </span>
                        </li>
                        <li className="room__assets__item">
                          <MdOutlineChildCare />
                          <span>
                            {t('checkout.children')}
                            {': '}
                            {bookingData.selectedRoom.children}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {userData && (
                  <div className="checkout__content__form">
                    <CheckoutForm
                      form={form}
                      handleSubmitForm={handleSubmitForm}
                      userData={userData}
                      loading={loading}
                    />
                  </div>
                )}
              </Col>
              <Col xxl={8} xl={7} lg={7} md={24} sm={24} xs={24}>
                <div className="checkout__content__summary">
                  <div className="checkout__content__summary__list">
                    <div className="checkout__content__summary__item">
                      <span>{t('checkout.cost_per_night')}</span>
                      <span>
                        {t('hotels.price_value', {
                          val: formatCurrency(
                            bookingData.selectedRoom.price,
                            currentLanguage
                          ),
                        })}
                      </span>
                    </div>
                    <div className="checkout__content__summary__item">
                      <span>{t('checkout.num_of_nights')}</span>
                      <span>{nights}</span>
                    </div>
                    <div className="checkout__content__summary__item">
                      <span>{t('checkout.sub_total')}</span>
                      <span>
                        {t('hotels.price_value', {
                          val: formatCurrency(subTotal, currentLanguage),
                        })}
                      </span>
                    </div>
                    <div className="checkout__content__summary__item">
                      <span>{t('checkout.tax_and_fee')}</span>
                      <span>
                        {t('hotels.price_value', {
                          val: formatCurrency(tax, currentLanguage),
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="checkout__content__summary__total">
                    <span>{t('checkout.total_charges')}</span>
                    <span>
                      {t('hotels.price_value', {
                        val: formatCurrency(
                          bookingData.selectedRoom.price * nights + tax,
                          currentLanguage
                        ),
                      })}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </section>
      </div>
    </div>
  ) : (
    <div>Booking is not found</div>
  );
};

export default CheckoutPage;
