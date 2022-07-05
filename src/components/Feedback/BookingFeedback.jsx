import { EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Comment, Form, Input, Rate, Space } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { feedbackApi } from '../../api/feedbackApi';
import './BookingFeedback.scss';

const { TextArea } = Input;

const Editor = ({
  rating,
  content,
  onChangeRating,
  onChangeContent,
  onSubmit,
}) => {
  return (
    <>
      <Form.Item>
        <Rate onChange={(value) => onChangeRating(value)} value={rating} />
      </Form.Item>
      <Form.Item>
        <TextArea onChange={(e) => onChangeContent(e)} value={content} />
      </Form.Item>
      <Form.Item>
        <Button onClick={onSubmit} htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </>
  );
};

const BookingFeedback = ({ id, status }) => {
  const [isFb, setIsFb] = useState(false);
  const [fbData, setFbData] = useState();

  const [rating, setRating] = useState();
  const [content, setContent] = useState();

  const [newFb, setNewFb] = useState({});

  useEffect(() => {
    const getFbPerBooking = async () => {
      try {
        const response = await feedbackApi.getFeedbackPerBooking(id);
        const { data } = response;
        data.status === 'success' && setIsFb(true);
        setFbData(data.data);
        setRating(data.data.rating);
        setContent(data.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    getFbPerBooking();
  }, []);

  const onFinish = () => {
    const addFbAsync = async () => {
      const dataUpdate = await feedbackApi.addFeedback({ rating, content, id });
      dataUpdate && setFbData(dataUpdate.data.data);
    };
    setIsFb(true);
    addFbAsync();
  };

  const onChangeRating = (e) => {
    setRating(e);
    fbData.rating = e;
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
    fbData.content = e.target.value;
  };

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
                <Rate
                  disabled
                  defaultValue={newFb.rating ? newFb.rating : fbData.rating}
                />
              </Space>
            }
            avatar={
              <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
            }
            content={<p>{newFb.content ? newFb.content : fbData.content}</p>}
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
        status === 4 && (
          <Space direction="vertical">
            <h3>Your feedback would be greatly appreciated</h3>
            <Comment
              content={
                <Editor
                  rating={rating}
                  content={content}
                  onSubmit={onFinish}
                  onChangeContent={onChangeContent}
                  onChangeRating={onChangeRating}
                />
              }
            />
          </Space>
        )
      )}
    </Space>
  );
};

export default BookingFeedback;
