import { Col, Form, Row, Steps } from 'antd';
import React from 'react';
import { BiTimeFive } from 'react-icons/bi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { IoBedSharp } from 'react-icons/io5';
import { MdOutlineChildCare, MdSecurity } from 'react-icons/md';
import { RiShieldCheckFill } from 'react-icons/ri';

import { CheckoutForm } from '../../components';
import './CheckoutPage.scss';

const { Step } = Steps;
const CheckoutPage = () => {
  const [form] = Form.useForm();

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
                    <h2>HANZ Bao Hoang Hotel Dalat</h2>
                    <p>Da Lat</p>
                    <div className="checkout__content__rating">
                      <div>8.2</div>
                      <span>GUEST RATING</span>
                    </div>
                  </div>
                </div>
                <div className="checkout__content__itinerary">
                  <div className="schedule">
                    <div className="schedule__item">
                      <div className="title">CHECK-IN</div>
                      <div className="content">Wed, Jul 6, 2022</div>
                    </div>
                    <hr />
                    <div className="schedule__item">
                      <div className="title">CHECK-OUT</div>
                      <div className="content">Sat, Jul 9, 2022</div>
                    </div>
                  </div>

                  <div className="room__info">
                    <div className="room__info__item">
                      <div className="title">Nights</div>
                      <div className="content">3</div>
                    </div>
                    <hr />
                    <div className="room__info__item">
                      <div className="title">ROOMS</div>
                      <div className="content">1</div>
                    </div>
                  </div>
                </div>
                <div className="checkout__content__bottom">
                  <div className="room__type">Standard Queen Room</div>
                  <div className="room__assets">
                    <ul>
                      <li className="room__assets__item">
                        <IoBedSharp />
                        <span>Beds 2</span>
                      </li>
                      <li className="room__assets__item">
                        <BsFillPeopleFill /> Adults 4
                      </li>
                      <li className="room__assets__item">
                        <MdOutlineChildCare /> Children 2
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="checkout__content__form">
                <CheckoutForm form={form} handleSubmitForm={handleSubmitForm} />
              </div>
            </Col>
            <Col span={8}>
              <div className="checkout__content__summary">
                <div className="checkout__content__summary__list">
                  <div className="checkout__content__summary__item">
                    <span>Cost per night</span>
                    <span>14</span>
                  </div>
                  <div className="checkout__content__summary__item">
                    <span>Number of nights</span>
                    <span>3</span>
                  </div>
                  <div className="checkout__content__summary__item">
                    <span>Taxes and fees</span>
                    <span>2.99</span>
                  </div>
                </div>
                <div className="checkout__content__summary__total">
                  <span>Total charges</span>
                  <span>40.37</span>
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
