import { UserOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import usa from '../../../assets/images/usa.svg';
import vietnamIcon from '../../../assets/images/vietnamIcon.png';
import UserControl from '../../UserControl/UserControl';
import './index.scss';

const HeaderNav = () => {
  const { t, i18n } = useTranslation();

  const userData = window.localStorage.getItem('userData')
    ? JSON.parse(window.localStorage.getItem('userData'))
    : '';

  const accessToken = userData.token;

  const languageOptions = [
    {
      key: 'en',
      value: 'en',
      label: (
        <div>
          <img src={usa} alt="" style={{ width: '20px' }} />
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
        defaultValue={
          i18n.language === 'en' ? languageOptions[0] : languageOptions[1]
        }
        options={languageOptions}
        onChange={changeLanguage}
      />
      {accessToken ? (
        <Button
          type="link"
          style={{ margin: '0 10px' }}
          icon={<UserOutlined />}
        >
          <UserControl />
        </Button>
      ) : (
        <Link to="/login">
          <Button
            type="link"
            style={{ margin: '0 10px' }}
            icon={<UserOutlined />}
          >
            {t('navbar.login')}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default HeaderNav;
