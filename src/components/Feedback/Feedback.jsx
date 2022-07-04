import { Avatar, Comment, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { feedbackApi } from '../../api/feedbackApi';

const FeedBack = ({ hotelId }) => {
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    const getAllFeedback = async () => {
      const response = await feedbackApi.getAll(hotelId);
      response && setFeedback(response.data.data.reviews);
    };

    getAllFeedback();
  }, []);
  console.log(feedback);
  return (
    <div>
      {feedback &&
        feedback.map((fb, key) => (
          <Comment
            key={key}
            author={<Link to="/profile">{fb.user.fullName}</Link>}
            avatar={<Avatar>{fb.user.fullName[0]}</Avatar>}
            content={<p>{fb.content}</p>}
            datetime={
              <Tooltip>
                <span>{moment(fb.createdAt.date).format('MM-DD-YYYY')}</span>
              </Tooltip>
            }
          />
        ))}
    </div>
  );
};

export default FeedBack;
