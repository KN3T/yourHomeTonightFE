import { Col, Form, Row, Steps } from 'antd';
import moment from 'moment';
import React from 'react';
import { BiTimeFive } from 'react-icons/bi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoBedSharp } from 'react-icons/io5';
import { MdOutlineChildCare, MdSecurity } from 'react-icons/md';
import { RiShieldCheckFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

import { CheckoutForm } from '../../components';
import './CheckoutPage.scss';

const { Step } = Steps;
const CheckoutPage = () => {
  const [form] = Form.useForm();
  const bookingData = useSelector((state) => state.booking.orders[0]);

  const checkIn = moment(bookingData.dateCheckIn);
  const checkOut = moment(bookingData.dateCheckOut);
  const nights = checkOut.diff(checkIn, 'days');
  const tax = bookingData.roomData.price * 0.1;

  const userData = JSON.parse(window.localStorage.getItem('userData'));

  const handleSubmitForm = (values) => {
    console.log(values);
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
                    <h2>{bookingData.roomData.name}</h2>
                    <p>{bookingData.hotelAddress}</p>
                    <div className="checkout__content__rating">
                      <div>{bookingData.hotelRating}</div>
                      <span>GUEST RATING</span>
                    </div>
                  </div>
                </div>
                <div className="checkout__content__itinerary">
                  <div className="schedule">
                    <div className="schedule__item">
                      <div className="title">CHECK-IN</div>
                      <div className="content">
                        {moment(bookingData.dateCheckIn).format(
                          'ddd, MMM Do YYYY'
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="schedule__item">
                      <div className="title">CHECK-OUT</div>
                      <div className="content">
                        {moment(bookingData.dateCheckOut).format(
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
                        <span>Beds {bookingData.roomData.beds}</span>
                      </li>
                      <li className="room__assets__item">
                        <BsFillPeopleFill />
                        <span>Adults {bookingData.roomData.adults}</span>
                      </li>
                      <li className="room__assets__item">
                        <MdOutlineChildCare />
                        <span>Children {bookingData.roomData.children}</span>
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
                    <span>{bookingData.roomData.price}</span>
                  </div>
                  <div className="checkout__content__summary__item">
                    <span>Number of nights</span>
                    <span>{nights}</span>
                  </div>
                  <div className="checkout__content__summary__item">
                    <span>Taxes and fees</span>
                    <span>{tax}</span>
                  </div>
                </div>
                <div className="checkout__content__summary__total">
                  <span>Total charges</span>
                  <span>{bookingData.roomData.price + tax}</span>
                </div>
              </div>
            </Col>
          </Row>
        </section>
      </div>
    </div>
  );
};

export default CheckoutPage;
