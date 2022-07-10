import { Button, Form, InputNumber, Popover } from 'antd';
import React, { useState } from 'react';

const PopoverMain = () => {
  const [visible, setVisible] = useState(false);
  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };
  //   const content = <InputNumber placeholder="beds" />);
  return (
    <Form.Item>
      <Popover
        content={content}
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <Button onClick={() => setVisible(true)}>1 beds, 1 rooms</Button>
      </Popover>
    </Form.Item>
  );
};

export default PopoverMain;
