import { Breadcrumb, Col, Row } from 'antd';
import React, { useEffect } from 'react';

import './index.scss';

const DetailsHotelPage = () => {
  useEffect(() => {
    const getSingle = async () => {
      const data = await getByIdAsync(1);
    };
  }, []);
  return (
    <Row>
      <Col>
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
      </Col>
    </Row>
  );
};

export default DetailsHotelPage;
