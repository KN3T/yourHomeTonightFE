import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoneyCollectOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import React from 'react';

const handleTag = (status) => {
  switch (status) {
    case 2:
      return {
        color: 'processing',
        text: 'Paid',
        icon: <MoneyCollectOutlined />,
      };
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
        icon: <SyncOutlined spin />,
      };
  }
};
export default handleTag;
