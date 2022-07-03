import { Button, Comment, Form, Input, Rate } from 'antd';
import React, { useState } from 'react';

import { feedbackApi } from '../../api/feedbackApi';

const { TextArea } = Input;
const Feedback = ({ bookingId }) => {
  const [cmt, setCmt] = useState('');
  const [rate, setRate] = useState();
  const [dataFeedback, setDataFeedback] = useState({});
  const onFinish = (value) => {
    setCmt(value.cmt);
    setDataFeedback({
      content: cmt,
      rating: rate,
    });
  };

  return (
    <div>
      <Rate onChange={(e) => setRate(e)} />
      <Comment
        content={
          <Form
            onFinish={onFinish}
            initialValues={{
              cmt: cmt,
            }}
          >
            <Form.Item name="cmt">
              <TextArea onChange={(e) => setCmt(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Submit</Button>
            </Form.Item>
          </Form>
        }
      />
    </div>
  );
};

export default Feedback;
