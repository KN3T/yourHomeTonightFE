import { Button } from 'antd';
import React from 'react';

import NotFoundGif from '../../assets/images/NotFoundGif.gif';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="notfound__container">
      <img src={NotFoundGif} />

      <Button
        size="large"
        type="primary"
        className="notfound__btn"
        onClick={() => history.back()}
      >
        Back Home
      </Button>
    </div>
  );
};

export default NotFound;
