import { UserOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import englandIcon from '../../../assets/images/englandIcon.jpg';
import vietnamIcon from '../../../assets/images/vietnamIcon.png';
import './index.scss';

const HeaderNav = () => {
  const { t, i18n } = useTranslation();

  const languageOptions = [
    {
      key: 'en',
      value: 'en',
      label: (
        <div>
          <img src={englandIcon} alt="" style={{ width: '20px' }} />
        </div>
      ),
    },
    {
      key: 'vi',
      value: 'vi',
      label: (
        <div>
          <img src={vietnamIcon} alt="" style={{ width: '20px' }} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    i18n.changeLanguage(defaultLanguage);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  };

  const defaultLanguage = window.localStorage.getItem('lng');

  return (
    <div className="navbar__header__wrapper">
      <Select
        defaultValue={defaultLanguage}
        options={languageOptions}
        onChange={changeLanguage}
      />
      <Link to="/login">
        <Button
          type="link"
          style={{ margin: '0 10px' }}
          icon={<UserOutlined />}
        >
          Sign in{' '}
        </Button>
      </Link>
    </div>
  );
};

export default HeaderNav;