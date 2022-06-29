import { Button, Form, InputNumber, Space } from 'antd';
import React from 'react';

const PopoverDetailsHotel = ({ beds, guests, setVisiblePopover }) => {
  return (
    <Space direction="vertical">
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          bed: beds,
          guest: guests,
        }}
      >
        <Form.Item name="bed" label="Bed">
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="guest" label="Guest">
          <InputNumber min={1} />
        </Form.Item>
      </Form>
      <Button onClick={() => setVisiblePopover(false)} type="primary">
        Submit
      </Button>
    </Space>
  );
};

export default PopoverDetailsHotel;
