/* eslint-disable react/prop-types */
import { StarFilled } from '@ant-design/icons';
import { Avatar, Comment, Rate, Space, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useLoadingContext } from 'react-router-loading';

import { feedbackApi } from '../../api/feedbackApi';
import handleRating from '../../utils/handleRating';

const FeedBack = ({ hotelId, hotelData }) => {
  const loadingContext = useLoadingContext();

  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const getAllFeedback = async () => {
      const { data } = await feedbackApi.getAll(hotelId);
      setFeedback(data.data);
      loadingContext.done();
    };
    getAllFeedback();
  }, [hotelId]);

  const columns = [
    {
      title: 'What customers say about our services',
      key: '',
      render: (_, record) => {
        return (
          <Comment
            author={record.user.fullName}
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            content={
              <Space direction="vertical">
                <Rate disabled defaultValue={record.rating} />
                <p>{record.content}</p>
              </Space>
            }
            datetime={
              <Space style={{ width: '100%' }}>
                <span>
                  {moment(record.createdAt.date).format('MM-DD-YYYY')}
                </span>
              </Space>
            }
          />
        );
      },
    },
  ];

  return (
    <div>
      <Space>
        <h1
          style={{
            fontSize: '2.5rem',
            background: '#158F50',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '10px',
          }}
        >
          {hotelData.rating}
          <span style={{ position: 'absolute', top: '10.2%' }}>
            <StarFilled style={{ fontSize: '15px' }} />
          </span>
        </h1>
        <div style={{ marginTop: '-20px', marginLeft: '10px' }}>
          <span style={{ display: 'block', fontSize: '15px' }}>
            {handleRating(hotelData.rating)}
          </span>
          <span style={{ display: 'block', fontSize: '15px' }}>
            Based on {hotelData.ratingCount} verified guest reviews
          </span>
        </div>
      </Space>
      {feedback && feedback.reviews && feedback.reviews.length > 3 ? (
        <Table
          pagination={{ pageSize: 3 }}
          rowKey="id"
          dataSource={feedback.reviews}
          columns={columns}
        />
      ) : (
        <Table
          pagination={false}
          rowKey="id"
          dataSource={feedback.reviews}
          columns={columns}
        />
      )}
    </div>
  );
};

export default FeedBack;
