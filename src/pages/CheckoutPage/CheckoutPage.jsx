import { Col, Form, Row, Steps } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BiTimeFive } from 'react-icons/bi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoBedSharp } from 'react-icons/io5';
import { MdOutlineChildCare, MdSecurity } from 'react-icons/md';
import { RiShieldCheckFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

import bookingApi from '../../api/bookingApi';
import { CheckoutForm } from '../../components';
import formatCurrency from '../../utils/formatCurrency';
import './CheckoutPage.scss';

const { Step } = Steps;
const CheckoutPage = () => {
  const [form] = Form.useForm();
  const bookingData = useSelector((state) => state.booking.orders);
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const checkIn = moment(bookingData.dateCheckin);
  const checkOut = moment(bookingData.dateCheckout);
  const nights = checkOut.diff(checkIn, 'days');
  const tax =
    bookingData &&
    bookingData.selectedRoom &&
    bookingData.selectedRoom.price * 0.1;

  const userData = JSON.parse(window.localStorage.getItem('userData'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmitForm = async (values) => {
    const data = {
      ...values,
      checkIn: parseInt(moment(bookingData.dateCheckin).format('X')),
      checkOut: parseInt(moment(bookingData.dateCheckout).format('X')),
      userId: userData.id,
      roomId: bookingData.selectedRoom.id,
    };

    const response = await bookingApi.book(data);
    if (response.data.status === 'success') {
      location.replace(response.data.data[0]);
    }
  };

  return (
    <div className="checkout__container">
      <div className="checkout__wrapper">
        <div className="checkout__banner">
          <div className="checkout__banner__content">
            <div className="checkout__banner__item">
              <RiShieldCheckFill />
              <span>SECURE TRANSACTIONS</span>
            </div>
            <div className="checkout__banner__item">
              <BiTimeFive />
              <span>24-HOUR SERVICE</span>
            </div>
            <div className="checkout__banner__item">
              <MdSecurity />
              <span>TRUSTED PAYMENTS</span>
            </div>
          </div>
        </div>
        <div className="checkout__progress">
          <Steps current={1} size="small">
            <Step title="Choose Room" />
            <Step title="Guest & Payment Details" />
            <Step title="Booking Confirmation" />
          </Steps>
        </div>

        <section className="checkout__content ctn">
          <div className="checkout__content__heading">
            <span>Almost done!</span>
            <span>Enter your details and complete your booking now.</span>
          </div>
          {bookingData && bookingData.selectedRoom && (
            <Row gutter={[16, 0]}>
              <Col span={16}>
                <div className="checkout__content__info">
                  <div className="checkout__content__top">
                    <div className="checkout__content__image">
                      <img
                        src="https://q-xx.bstatic.com/xdata/images/hotel/max300/351902045.jpg?k=8c2f8bc5e9983ecc8791d4a219b89ad362bb41e5d83a501d93131db64a5bbe62&o="
                        alt=""
                      />
                    </div>
                    <div className="checkout__content__description">
                      <h2>{bookingData.selectedRoom.name}</h2>
                      <p>
                        {bookingData.hotelAddress.address},{' '}
                        {bookingData.hotelAddress.city},{' '}
                        {bookingData.hotelAddress.province}
                      </p>
                      <div className="checkout__content__rating">
                        <div>
                          {bookingData.hotelRating
                            ? bookingData.hotelRating
                            : 0}{' '}
                        </div>
                        <span>GUEST RATING</span>
                      </div>
                    </div>
                  </div>
                  <div className="checkout__content__itinerary">
                    <div className="schedule">
                      <div className="schedule__item">
                        <div className="title">CHECK-IN</div>
                        <div className="content">
                          {moment(bookingData.dateCheckin).format(
                            'ddd, MMM Do YYYY'
                          )}
                        </div>
                      </div>
                      <hr />
                      <div className="schedule__item">
                        <div className="title">CHECK-OUT</div>
                        <div className="content">
                          {moment(bookingData.dateCheckout).format(
                            'ddd, MMM Do YYYY'
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="room__info">
                      <div className="room__info__item">
                        <div className="title">Nights</div>
                        <div className="content">{nights}</div>
                      </div>
                      <hr />
                      <div className="room__info__item">
                        <div className="title">ROOMS</div>
                        <div className="content">1</div>
                      </div>
                    </div>
                  </div>
                  <div className="checkout__content__bottom">
                    <div className="room__type">{bookingData.tpe}</div>
                    <div className="room__assets">
                      <ul>
                        <li className="room__assets__item">
                          <IoBedSharp />
                          <span>Beds {bookingData.selectedRoom.beds}</span>
                        </li>
                        <li className="room__assets__item">
                          <BsFillPeopleFill />
                          <span>Adults {bookingData.selectedRoom.adults}</span>
                        </li>
                        <li className="room__assets__item">
                          <MdOutlineChildCare />
                          <span>
                            Children {bookingData.selectedRoom.children}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="checkout__content__form">
                  <CheckoutForm
                    form={form}
                    handleSubmitForm={handleSubmitForm}
                    userData={userData}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div className="checkout__content__summary">
                  <div className="checkout__content__summary__list">
                    <div className="checkout__content__summary__item">
                      <span>Cost per night</span>
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
                      <span>Number of nights</span>
                      <span>{nights}</span>
                    </div>
                    <div className="checkout__content__summary__item">
                      <span>Taxes and fees</span>
                      <span>
                        {t('hotels.price_value', {
                          val: formatCurrency(tax, currentLanguage),
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="checkout__content__summary__total">
                    <span>Total charges</span>
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
  );
};

export default CheckoutPage;
