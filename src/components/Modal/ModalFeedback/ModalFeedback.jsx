import { Modal } from 'antd';
import React from 'react';

const ModalFeedback = ({ visible, onCancel, onOk }) => {
  return (
    <div>
      <Modal visible={visible} onOk={onOk} onCancel={onCancel}>
        asdfasdf
      </Modal>
    </div>
  );
};

export default ModalFeedback;
