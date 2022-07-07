import { CheckCircleOutlined } from '@ant-design/icons';
import { Avatar, Comment, Rate, Space, Tag, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { feedbackApi } from '../../api/feedbackApi';

const FeedBack = ({ hotelId }) => {
  const loadingContext = useLoadingContext();

  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const getAllFeedback = async () => {
      const { data } = await feedbackApi.getAll(hotelId);
      setFeedback(data.data);
    };
    getAllFeedback();
  }, [hotelId]);

  loadingContext.done();
  return (
    <div>
      <h2>Reviews</h2>
      <Space
        style={{ display: 'flex', alignItem: 'center', background: 'red' }}
      >
        <h1>4.5</h1>
        <Space direction="vertical">
          <h3 style={{ lineHeight: 0 }}>Very good</h3>
          <h5 style={{ lineHeight: 0 }}>
            Based on {feedback.total} verified guest reviews
          </h5>
        </Space>
      </Space>
      {feedback.reviews &&
        feedback.reviews.map((fb, key) => (
          <Comment
            key={key}
            author={<Link to="/userprofile">{fb.user.fullName}</Link>}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            content={
              <Space direction="vertical">
                <Rate disabled defaultValue={fb.rating} />
                <p>{fb.content}</p>
              </Space>
            }
            datetime={
              <Space style={{ width: '100%' }}>
                <span>{moment(fb.createdAt.date).format('MM-DD-YYYY')}</span>
                <Tag style={{ marginLeft: '10px' }} color="success">
                  <CheckCircleOutlined /> verified
                </Tag>
              </Space>
            }
          />
        ))}
    </div>
  );
};

export default FeedBack;
