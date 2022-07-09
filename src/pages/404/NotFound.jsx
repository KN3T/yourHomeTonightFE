import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import NotFoundGif from '../../assets/images/NotFoundGif.gif';
import './NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound__container">
      <img src={NotFoundGif} />

      <Button
        size="large"
        type="primary"
        className="notfound__btn"
        onClick={() => navigate('/')}
      >
        Back Home
      </Button>
    </div>
  );
};

export default NotFound;
