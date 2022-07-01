import { Button, Form, InputNumber, Space } from 'antd';
import { t } from 'i18next';
import React from 'react';

import './index.scss';

const PopoverDetailsHotel = ({
  beds,
  guests,
  setVisiblePopover,
  setBeds,
  setGuests,
}) => {
  const onFinish = ({ bed, guest }) => {
    setBeds(bed);
  };
  return (
    <Form
      onFinish={onFinish}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        bed: beds,
      }}
    >
      <Form.Item name="bed" label={t('details__hotel.beds')}>
        <InputNumber min={1} />
      </Form.Item>
      <Button
        htmlType="submit"
        onClick={() => setVisiblePopover(false)}
        type="primary"
      >
        Submit
      </Button>
    </Form>
  );
};

export default PopoverDetailsHotel;
