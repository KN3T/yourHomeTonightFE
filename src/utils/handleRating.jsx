import { Tag } from 'antd';
import React from 'react';

const handleRating = (ratingCount) => {
  if (ratingCount < 5 && ratingCount > 4) {
    return <Tag color="success">Excellent</Tag>;
  } else if (ratingCount > 3.5) {
    return <Tag color="cyan">Very good</Tag>;
  } else if (ratingCount > 3) {
    return <Tag color="geekblue">Good</Tag>;
  } else {
    return <Tag color="magenta">Nice</Tag>;
  }
};

export default handleRating;
