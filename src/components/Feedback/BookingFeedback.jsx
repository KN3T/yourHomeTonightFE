import { Button, Collapse, Comment, Form, Input, Rate, Space } from 'antd';
import React, { useState } from 'react';

import { feedbackApi } from '../../api/feedbackApi';

const { Panel } = Collapse;
const { TextArea } = Input;
const BookingFeedback = ({ booking }) => {
  const [dataFeedback, setDataFeedback] = useState({});

  const onFinish = async (value) => {
    const response = await feedbackApi.addFeedback(value);
    const { data } = response;
    data && setDataFeedback(data);
  };
  console.log(booking);
  return (
    <div>
      <Collapse onChange={(e) => Boolean(e[0]) && setIdBooking(booking.id)}>
        <Panel header="Feedback">
          <div>
            <Comment
              content={
                <Form
                  onFinish={onFinish}
                  initialValues={{
                    id: booking.id,
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
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default BookingFeedback;
