import { Button, Card, Col, Divider, Row, Tag } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsArrowDownCircle, BsFillPeopleFill } from 'react-icons/bs';
import { FaBed } from 'react-icons/fa';
import { IoBedSharp } from 'react-icons/io5';
import { MdOutlineChildCare } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import bookingApi from '../../api/bookingApi';
import { BookingFeedback } from '../../components';
import formatCurrency from '../../utils/formatCurrency';
import './DetailsBookingPage.scss';

const CheckoutPageConfirmation = () => {
  const loadingContext = useLoadingContext();

  const [confirmationData, setConfirmationData] = useState();
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const params = useParams();
  const bookingId = params.id;

  const getBookingData = async (id) => {
    const response = await bookingApi.get(id);
    if (response.data.status === 'success') {
      setConfirmationData(response.data.data);
      loadingContext.done();
    }
  };

  useEffect(() => {
    getBookingData(bookingId);
  }, [bookingId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const checkIn =
    confirmationData &&
    confirmationData &&
    moment(confirmationData.checkIn.date);

  const checkOut =
    confirmationData &&
    confirmationData &&
    moment(confirmationData.checkOut.date);

  const nights = checkOut && checkIn && checkOut.diff(checkIn, 'days');

  const subTotal =
    confirmationData &&
    confirmationData &&
    confirmationData.room.price * nights;

  const tax = subTotal * 0.1;

  const total = confirmationData && confirmationData && confirmationData.total;

  const onClickDown = () => {
    const element = document.getElementById('content');

    element.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const [loading, setLoading] = useState(false);

  const handleRepay = async () => {
    setLoading(true);
    const response = await bookingApi.repay(bookingId);
    if (response.data.status === 'success') {
      location.replace(response.data.data[0]);
      setLoading(false);
    }
  };

  const handleStatusBooking = (status) => {
    switch (status) {
      case 2:
        return 'PAID';
      case 3:
        return 'CANCELED';
      case 4:
        return 'DONE';
      default:
        return 'PENDING';
    }
  };

  const handleTypeBtn = (status) => {
    switch (status) {
      case 2:
        return '#87d068';
      case 3:
        return '#f50';
      case 4:
        return '#87d068';
      default:
        return 'magenta';
    }
  };

  return (
    <div className="details__booking__container">
      <div className="details__booking__wrapper">
        {confirmationData && (
          <section className="details__booking__content ctn">
            <Row gutter={[16, 0]}>
              <Col span={24}>
                <div className="details__booking__content__heading">
                  <h1>Your trip to Da Lat</h1>
                  <div>
                    <span className="tag__highlight">
                      Email sent to: <b>{confirmationData.email}</b>
                    </span>
                    <div className="details__booking__small__summary">
                      <div className="icon__bed">
                        <FaBed />
                      </div>
                      <div>
                        <h3>Crowne Plaza Da Lat</h3>
                        <div>
                          <span>
                            {moment(confirmationData.checkIn.date).format(
                              'ddd, MMM Do'
                            )}{' '}
                            -{' '}
                            {moment(confirmationData.checkOut.date).format(
                              'ddd, MMM Do'
                            )}
                          </span>
                          <span>Check-in: after 12:00 PM</span>
                        </div>
                        <div className="tag__highlight">
                          Confirmation: #<b>{confirmationData.id}</b>
                        </div>
                        <div className="icon__arrow" onClick={onClickDown}>
                          <BsArrowDownCircle />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Divider />
              </Col>
              {confirmationData && confirmationData && (
                <>
                  <Col xl={16} lg={16} md={24} sm={24} xs={24}>
                    <div
                      className="details__booking__content__info"
                      id="content"
                    >
                      <div className="details__booking__content__top">
                        <div className="details__booking__content__image">
                          <img
                            src={confirmationData.hotel.images[0].src}
                            alt=""
                          />
                        </div>
                        <div className="details__booking__content__description">
                          <h2>{confirmationData.room.type}</h2>
                          <p>
                            {confirmationData.hotel.address.address
                              ? confirmationData.hotel.address.address
                              : ''}
                            {', '}
                            {confirmationData.hotel.address.city
                              ? confirmationData.hotel.address.city
                              : ''}
                            {', '}
                            {confirmationData.hotel.address.province
                              ? confirmationData.hotel.address.province
                              : ''}
                          </p>
                          <div className="details__booking__content__rating">
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
                      <div className="details__booking__content__itinerary">
                        <div className="schedule">
                          <div className="schedule__item">
                            <div className="title">CHECK-IN</div>
                            <div className="content">
                              {moment(confirmationData.checkIn.date).format(
                                'ddd, MMM Do YYYY'
                              )}
                            </div>
                          </div>
                          <hr />
                          <div className="schedule__item">
                            <div className="title">CHECK-OUT</div>
                            <div className="content">
                              {moment(confirmationData.checkOut.date).format(
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
                      <div className="details__booking__content__bottom">
                        <div className="room__type">
                          {confirmationData.type}
                        </div>
                        <div className="room__assets">
                          <ul>
                            <li className="room__assets__item">
                              <IoBedSharp />
                              <span>Beds {confirmationData.room.beds}</span>
                            </li>
                            <li className="room__assets__item">
                              <BsFillPeopleFill />
                              <span>Adults {confirmationData.room.adults}</span>
                            </li>
                            <li className="room__assets__item">
                              <MdOutlineChildCare />
                              <span>
                                Children {confirmationData.room.children}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                    <div className="details__booking__content__summary">
                      {confirmationData.payment ? (
                        <>
                          <div className="details__booking__content__summary__heading">
                            <h2>Payment Summary</h2>
                          </div>
                          <div className="line"></div>
                          <div className="details__booking__content__summary__list">
                            <div className="details__booking__content__summary__item">
                              <span>Billing name</span>
                              <span>
                                {confirmationData.payment.billingName}
                              </span>
                            </div>
                            <div className="details__booking__content__summary__item">
                              <span>Purchase date</span>
                              <span>
                                {moment(
                                  confirmationData.payment.purchasedAt.date
                                ).format('MMM Do YYYY')}
                              </span>
                            </div>
                            <div className="details__booking__content__summary__item">
                              <span>Payment method</span>
                              <span>Stripe</span>
                            </div>
                          </div>
                          <div className="line"></div>
                        </>
                      ) : (
                        ''
                      )}

                      <div className="details__booking__content__summary__list">
                        <div className="details__booking__content__summary__item">
                          <span>Status</span>
                          <Tag color={handleTypeBtn(confirmationData.status)}>
                            {handleStatusBooking(confirmationData.status)}
                          </Tag>
                        </div>
                        <div className="details__booking__content__summary__item">
                          <span>Cost per night</span>
                          <span>
                            {t('hotels.price_value', {
                              val: formatCurrency(
                                confirmationData.room.price,
                                currentLanguage
                              ),
                            })}
                          </span>
                        </div>
                        <div className="details__booking__content__summary__item">
                          <span>Cost per night</span>
                          <span>
                            {t('hotels.price_value', {
                              val: formatCurrency(
                                confirmationData.room.price,
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
                        <div className="details__booking__content__summary__item">
                          <span>Taxes and fees</span>
                          <span>
                            {t('hotels.price_value', {
                              val: formatCurrency(tax, currentLanguage),
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="line"></div>
                      <div className="details__booking__content__summary__total">
                        <span>Total charges</span>
                        <span>
                          {t('hotels.price_value', {
                            val: formatCurrency(total, currentLanguage),
                          })}
                        </span>
                      </div>
                    </div>
                    {confirmationData.status === 1 && (
                      <div className="button__purchase">
                        <p>
                          <i>
                            *Your booking will expire in five minutes, please
                            complete the payment in time
                          </i>
                        </p>
                        <Button
                          onClick={handleRepay}
                          type="primary"
                          loading={loading}
                        >
                          Purchase now
                        </Button>
                      </div>
                    )}
                  </Col>
                </>
              )}
            </Row>
            {confirmationData.status === 4 && (
              <Row>
                <Divider />
                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                  <Card>
                    <BookingFeedback
                      status={confirmationData.status}
                      id={params.id}
                    />
                  </Card>
                </Col>
              </Row>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default CheckoutPageConfirmation;
