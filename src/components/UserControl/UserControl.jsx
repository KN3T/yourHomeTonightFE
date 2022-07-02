import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserControl = () => {
  const user = JSON.parse(localStorage.getItem('userData'));
  console.log(user);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const menu = (
    <Menu
      items={[
        {
          label: <Link to={'/userprofile'}>Your profile</Link>,
          key: '0',
        },
        {
          type: 'divider',
        },
        {
          label: <span onClick={logout}>Logout</span>,
          key: '1',
        },
      ]}
    />
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {user.fullName}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default UserControl;
