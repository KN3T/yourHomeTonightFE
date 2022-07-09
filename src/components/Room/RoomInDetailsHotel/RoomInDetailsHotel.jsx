/* eslint-disable react/prop-types */
import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Col, Image, Row, Space } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import formatCurrency from '../../../utils/formatCurrency';
import './index.scss';

const RoomInDetailsHotel = ({ room, showModal }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <Row gutter={[20, 20]}>
      <Col span={6}>
        <span>{room.type}</span>
      </Col>
      <Col span={6}>
        <Space direction="vertical">
          {room.asset.slice(0, 3).map((asset, key) => (
            <span style={{ color: '#148A57' }} key={key}>
              {asset}
            </span>
          ))}
        </Space>
      </Col>

      <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
        <span className="price" style={{ fontSize: '20px' }}>
          <b>
            {t('details__hotel.price_value', {
              val: formatCurrency(room.price, currentLanguage),
            })}
          </b>
        </span>
      </Col>
      <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={() => showModal(room.id)}
          icon={<CaretRightOutlined />}
          type="primary"
        >
          {t('details__hotel.view_details')}
        </Button>
      </Col>
    </Row>
  );
};

export default RoomInDetailsHotel;
