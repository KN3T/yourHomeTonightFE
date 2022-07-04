import { HeartOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  Comment,
  Divider,
  Form,
  Image,
  Input,
  Rate,
  Row,
  Space,
  message,
} from 'antd';
import React, { useState } from 'react';

import { feedbackApi } from '../../api/feedbackApi';
import './index.scss';

const { Panel } = Collapse;
const { TextArea } = Input;

const Transaction = ({ bookings }) => {
  const [dataFeedback, setDataFeedback] = useState('');
  const onFinish = async (value) => {
    const response = await feedbackApi.addFeedback(value);
    const { data } = response;
    data && setDataFeedback(data);
  };
  // console.log(bookings);
  return (
    <div className="transaction__wrapper">
      <Row gutter={[10, 10]}>
        {bookings.map((booking, key) => (
          <Col
            className="col__transaction"
            key={key}
            xl={{ span: 24 }}
            lg={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
            <Collapse onChange={(e) => console.log(Boolean(e[0]))}>
              <Panel header={booking.hotel.name}>
                <Card key={key}>
                  <Avatar size={'large'}> {booking.fullName[0]} </Avatar>
                  <h3 style={{ margin: '30px 0' }}>
                    Thank you for your order{' '}
                    <span className="booking__username">
                      {' '}
                      {booking.fullName}
                    </span>{' '}
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
                      <div>
                        <h1>{dataFeedback}</h1>
                        <Comment
                          content={
                            <Form
                              onFinish={onFinish}
                              initialValues={{
                                id: booking.id,
                              }}
                            >
                              <Form.Item
                                style={{ display: 'none' }}
                                name={'id'}
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                name="rating"
                                rules={[
                                  {
                                    required: true,
                                  },
                                ]}
                              >
                                <Rate />
                              </Form.Item>
                              <Form.Item
                                rules={[
                                  {
                                    required: true,
                                  },
                                ]}
                                name="content"
                              >
                                <TextArea />
                              </Form.Item>
                              <Space
                                className="feedback__space"
                                direction="horizontal"
                              >
                                <Form.Item>
                                  <Button htmlType="submit">Submit</Button>
                                </Form.Item>

                                <Form.Item>
                                  <Button>View feedback this room</Button>
                                </Form.Item>
                              </Space>
                            </Form>
                          }
                        />
                      </div>
                    </Panel>
                  </Collapse>
                </Card>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Transaction;
