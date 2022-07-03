import { HeartOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Collapse, Divider, Image, Row, Space } from 'antd';
import React from 'react';

import Feedback from '../FeedBack/FeedBack';
import './index.scss';

const { Panel } = Collapse;

const Transaction = ({ bookings }) => {
  console.log(bookings);
  return (
    <div className="transaction__wrapper">
      <Row gutter={[10, 10]}>
        {bookings.map((booking, key) => (
          <Col
            key={key}
            xl={{ span: 12 }}
            lg={{ span: 12 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Card key={key}>
              <Avatar size={'large'}> {booking.fullName} </Avatar>
              <h3 style={{ margin: '30px 0' }}>
                Thank you for your order{' '}
                <span className="booking__username"> {booking.fullName}</span>{' '}
              </h3>
              <h3 style={{ margin: '30px 0' }}>
                There's so much choice out there but you still choose us{' '}
                <HeartOutlined />{' '}
              </h3>
              <Space className="space" direction="horizontal">
                <Image
                  width={100}
                  height={100}
                  src={booking.room.images[0].src}
                />
                <Space direction="vertical">
                  <span>{booking.room.type}</span>
                  <span>{booking.room.adults} adults</span>
                  <span> {booking.room.children} children</span>
                </Space>
                <h3>${booking.room.price}</h3>
              </Space>
              <Divider />
              <Space className="space" direction="vertical">
                <Space className="horizontal__space" direction="horizontal">
                  <span>Subtotal</span>
                  <span>${booking.room.price}</span>
                </Space>
                <Space className="horizontal__space" direction="horizontal">
                  <span>Discount</span>
                  <span>-${3}</span>
                </Space>
                <Space className="horizontal__space" direction="horizontal">
                  <span>Tax</span>
                  <span>20%</span>
                </Space>
                <Space className="horizontal__space" direction="horizontal">
                  <span>Total</span>
                  <span>${booking.total}</span>
                </Space>
              </Space>
              <Divider />
              <h4 style={{ marginBottom: '10px' }}>
                If you need anything, don't hesitate to send us an email
                help@yourhome29.com
              </h4>
              <Collapse>
                <Panel header="Feedback">
                  <Feedback bookingId={booking.id} roomId={booking.room.id} />
                </Panel>
              </Collapse>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Transaction;
