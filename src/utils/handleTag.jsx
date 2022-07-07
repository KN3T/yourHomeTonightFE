import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import React from 'react';

const handleTag = (status) => {
  switch (status) {
    case 2:
      return { color: 'processing', text: 'Paid', icon: <SyncOutlined spin /> };
    case 3:
      return {
        color: 'error',
        text: 'Cancelled',
        icon: <CloseCircleOutlined />,
      };
    case 4:
      return { color: 'success', text: 'Done', icon: <CheckCircleOutlined /> };
    default:
      return {
        color: 'warning',
        text: 'Pending',
        icon: <ClockCircleOutlined />,
      };
  }
};
export default handleTag;
