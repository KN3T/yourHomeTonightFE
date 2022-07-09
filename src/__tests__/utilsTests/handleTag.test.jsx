import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

import handleTag from '../../utils/handleTag';

test('handle tag testing', () => {
  expect(handleTag(2)).toEqual({
    color: 'processing',
    text: 'Paid',
    icon: <SyncOutlined spin />,
  });

  expect(handleTag(3)).toEqual({
    color: 'error',
    text: 'Cancelled',
    icon: <CloseCircleOutlined />,
  });

  expect(handleTag(4)).toEqual({
    color: 'success',
    text: 'Done',
    icon: <CheckCircleOutlined />,
  });

  expect(handleTag(1)).toEqual({
    color: 'warning',
    text: 'Pending',
    icon: <ClockCircleOutlined />,
  });

  expect(handleTag(5)).toEqual({
    color: 'warning',
    text: 'Pending',
    icon: <ClockCircleOutlined />,
  });
});
