import { Col, Row, Steps } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BiTimeFive } from 'react-icons/bi';
import { BsArrowDownCircle, BsFillPeopleFill } from 'react-icons/bs';
import { FaBed } from 'react-icons/fa';
import { IoBedSharp } from 'react-icons/io5';
import { MdSecurity } from 'react-icons/md';
import { MdOutlineChildCare } from 'react-icons/md';
import { RiShieldCheckFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

import formatCurrency from '../../utils/formatCurrency';
import './CheckoutConfirmationPage.scss';

const { Step } = Steps;

const CheckoutPageConfirmation = () => {
  const confirmationData = useSelector(
    (state) => state.booking.confirmation.booking
  )
    ? useSelector((state) => state.booking.confirmation)
    : JSON.parse(localStorage.getItem('confirmation'));
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const checkIn = moment(confirmationData.booking.checkIn.date);
  const checkOut = moment(confirmationData.booking.checkOut.date);
  const nights = checkOut.diff(checkIn, 'days');

  const subTotal =
    confirmationData.booking &&
    confirmationData.booking &&
    confirmationData.booking.room.price * nights;

  const tax = subTotal * 0.1;

  const total =
    confirmationData &&
    confirmationData.booking &&
    confirmationData.booking.total;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onClickDown = () => {
    const element = document.getElementById('content');

    element.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div className="checkout__confirmation__container">
      <div className="checkout__confirmation__wrapper">
        <div className="checkout__confirmation__banner">
          <div className="checkout__confirmation__banner__content">
            <div className="checkout__confirmation__banner__item">
              <RiShieldCheckFill />
              <span>SECURE TRANSACTIONS</span>
            </div>
            <div className="checkout__confirmation__banner__item">
              <BiTimeFive />
              <span>24-HOUR SERVICE</span>
            </div>
            <div className="checkout__confirmation__banner__item">
              <MdSecurity />
              <span>TRUSTED PAYMENTS</span>
            </div>
          </div>
        </div>
        <div className="checkout__confirmation__progress">
          <Steps current={2} size="small">
            <Step title="Choose Room" />
            <Step title="Guest & Payment Details" />
            <Step title="Booking Confirmation" />
          </Steps>
        </div>

        <section className="checkout__confirmation__content ctn">
          <Row gutter={[16, 0]}>
            <Col span={24}>
              <div className="checkout__confirmation__content__heading">
                <h1>Your trip to Da Lat</h1>
                <div>
                  <span className="tag__highlight">
                    Email sent to: <b>{confirmationData.booking.email}</b>
                  </span>
                  <div className="checkout__confirmation__small__summary">
                    <div className="icon__bed">
                      <FaBed />
                    </div>
                    <div>
                      <h3>Crowne Plaza Da Lat</h3>
                      <div>
                        <span>
                          {moment(confirmationData.booking.checkIn.date).format(
                            'ddd, MMM Do'
                          )}{' '}
                          -{' '}
                          {moment(
                            confirmationData.booking.checkOut.date
                          ).format('ddd, MMM Do')}
                        </span>
                        <span>Check-in: after 12:00 PM</span>
                      </div>
                      <div className="tag__highlight">
                        Confirmation: #<b>{confirmationData.booking.id}</b>
                      </div>
                      <div className="icon__arrow" onClick={onClickDown}>
                        <BsArrowDownCircle />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <div className="hr"></div>

          {confirmationData && confirmationData && (
            <Row gutter={[16, 0]}>
              <Col span={16}>
                <div
                  className="checkout__confirmation__content__info"
                  id="content"
                >
                  <div className="checkout__confirmation__content__top">
                    <div className="checkout__confirmation__content__image">
                      <img
                        src={confirmationData.booking.hotel.images[0].src}
                        alt=""
                      />
                    </div>
                    <div className="checkout__confirmation__content__description">
                      <h2>{confirmationData.booking.room.type}</h2>
                      <p>
                        {confirmationData.booking.hotel.address.address
                          ? confirmationData.booking.hotel.address.address
                          : ''}
                        {', '}
                        {confirmationData.booking.hotel.address.city
                          ? confirmationData.booking.hotel.address.city
                          : ''}
                        {', '}
                        {confirmationData.booking.hotel.address.province
                          ? confirmationData.booking.hotel.address.province
                          : ''}
                      </p>
                      <div className="checkout__confirmation__content__rating">
                        <div>
                          {/* {confirmationData.hotel.rating
                            ? confirmationData.hotel.rating
                            : 0}{' '} */}
                          5
                        </div>
                        <span>GUEST RATING</span>
                      </div>
                    </div>
                  </div>
                  <div className="checkout__confirmation__content__itinerary">
                    <div className="schedule">
                      <div className="schedule__item">
                        <div className="title">CHECK-IN</div>
                        <div className="content">
                          {moment(confirmationData.booking.checkIn.date).format(
                            'ddd, MMM Do YYYY'
                          )}
                        </div>
                      </div>
                      <hr />
                      <div className="schedule__item">
                        <div className="title">CHECK-OUT</div>
                        <div className="content">
                          {moment(
                            confirmationData.booking.checkOut.date
                          ).format('ddd, MMM Do YYYY')}
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
                  <div className="checkout__confirmation__content__bottom">
                    <div className="room__type">
                      {confirmationData.booking.type}
                    </div>
                    <div className="room__assets">
                      <ul>
                        <li className="room__assets__item">
                          <IoBedSharp />
                          <span>Beds {confirmationData.booking.room.beds}</span>
                        </li>
                        <li className="room__assets__item">
                          <BsFillPeopleFill />
                          <span>
                            Adults {confirmationData.booking.room.adults}
                          </span>
                        </li>
                        <li className="room__assets__item">
                          <MdOutlineChildCare />
                          <span>
                            Children {confirmationData.booking.room.children}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div className="checkout__confirmation__content__summary">
                  <div className="checkout__confirmation__content__summary__heading">
                    <h2>Payment Summary</h2>
                  </div>
                  <div className="line"></div>
                  <div className="checkout__confirmation__content__summary__list">
                    <div className="checkout__confirmation__content__summary__item">
                      <span>Billing name</span>
                      <span>{confirmationData.payment.billingName}</span>
                    </div>
                    <div className="checkout__confirmation__content__summary__item">
                      <span>Purchase date</span>
                      <span>
                        {moment(
                          confirmationData.payment.purchasedAt.date
                        ).format('MMM Do YYYY')}
                      </span>
                    </div>
                    <div className="checkout__confirmation__content__summary__item">
                      <span>Payment method</span>
                      <span>Stripe</span>
                    </div>
                  </div>
                  <div className="line"></div>
                  <div className="checkout__confirmation__content__summary__list">
                    <div className="checkout__confirmation__content__summary__item">
                      <span>Cost per night</span>
                      <span>
                        {t('hotels.price_value', {
                          val: formatCurrency(
                            confirmationData.booking.room.price,
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
                      <span>Subtotal</span>
                      <span>
                        {t('hotels.price_value', {
                          val: formatCurrency(subTotal, currentLanguage),
                        })}
                      </span>
                    </div>
                    <div className="checkout__confirmation__content__summary__item">
                      <span>Taxes and fees</span>
                      <span>
                        {t('hotels.price_value', {
                          val: formatCurrency(tax, currentLanguage),
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="line"></div>
                  <div className="checkout__confirmation__content__summary__total">
                    <span>Total charges</span>
                    <span>
                      {t('hotels.price_value', {
                        val: formatCurrency(total, currentLanguage),
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

export default CheckoutPageConfirmation;
