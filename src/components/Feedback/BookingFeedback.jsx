import { EditOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Collapse,
  Comment,
  Form,
  Input,
  Rate,
  Space,
  Tooltip,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { feedbackApi } from '../../api/feedbackApi';
import './BookingFeedback.scss';

const { Panel } = Collapse;
const { TextArea } = Input;
const BookingFeedback = ({ id, status }) => {
  const [dataFeedback, setDataFeedback] = useState({});
  const [isFb, setIsFb] = useState(false);
  const [fbData, setFbData] = useState();
  const onFinish = async (value) => {
    const response = await feedbackApi.addFeedback(value);
    // const { data } = response;
    // data && setDataFeedback(data);
    console.log(value);
    console.log(id);
  };
  console.log(status);
  useEffect(() => {
    const getFbPerBooking = async () => {
      try {
        const response = await feedbackApi.getFeedbackPerBooking(id);
        const { data } = response;
        console.log(data);
        data.status === 'success' && setIsFb(true);
        setFbData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFbPerBooking();
  }, []);
  console.log(fbData);
  return (
    <Space className="booking__feedback__space" direction="vertical">
      {isFb ? (
        <Space direction="vertical">
          <Comment
            author={
              <Space direction="vertical">
                <span>
                  {fbData.user.fullName}
                  <span style={{ marginLeft: '5px' }}>
                    {moment(fbData.createdAt.date).format('YYYY-MM-DD')}
                  </span>
                </span>
                <Rate defaultValue={fbData.rating} />
              </Space>
            }
            avatar={
              <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
            }
            content={
              <p>
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </p>
            }
          />
          <Button
            onClick={() => setIsFb(false)}
            type="text"
            className="btn__edit"
          >
            <EditOutlined />
          </Button>
        </Space>
      ) : (
        status === 2 && (
          <Space direction="vertical">
            <h3>Your feedback would be greatly appreciated</h3>
            <Comment
              content={
                <Form
                  onFinish={onFinish}
                  initialValues={{
                    id: id,
                  }}
                >
                  <Form.Item style={{ display: 'none' }} name={'id'}>
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
                  <Space className="feedback__space" direction="horizontal">
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
          </Space>
        )
      )}
    </Space>
  );
};

export default BookingFeedback;
