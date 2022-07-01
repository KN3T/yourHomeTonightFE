import {
  CloseOutlined,
  MenuOutlined,
  RightOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { Button, Drawer, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

import us from '../../assets/images/englandIcon.jpg';
import vn from '../../assets/images/vietnamIcon.png';
import './index.scss';

const { Search } = Input;
const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSearch = (e) => {
    setIsModalVisible(false);
    console.log(e);
  };

  const languageOptions = [
    {
      key: 'en',
      value: 'en',
      label: (
        <div>
          <img src={us} alt="" style={{ width: '20px' }} />
        </div>
      ),
    },
    {
      key: 'vi',
      value: 'vi',
      label: (
        <div>
          <img src={vn} alt="" style={{ width: '20px' }} />
        </div>
      ),
    },
  ];

  const defaultLanguage = window.localStorage.getItem('lng');

  useEffect(() => {
    i18n.changeLanguage(defaultLanguage);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  };

  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const isLogin = Boolean(userData);

  return (
    <>
      <header className="header__wrapper">
        {/* navbar for desktop */}
        <div className="header__navbar__desktop">
          <div className="header__logo__wrapper">
            <TwitterOutlined className="header__logo__icon" />
            <Link to="/" className="header__logo__link">
              Yourhome<span className="logo__emphasize">29.</span>
            </Link>
          </div>
          <nav className="header__navigation__wrapper">
            <ul className="header__navigation__menu">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'header__navigation__item' : ''
                }
              >
                <li>{t('navbar.home')}</li>
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'header__navigation__item' : ''
                }
              >
                <li>{t('navbar.about')}</li>
              </NavLink>
              <NavLink
                to="/hotels"
                className={({ isActive }) =>
                  isActive ? 'header__navigation__item' : ''
                }
              >
                <li>{t('navbar.hotels')}</li>
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'header__navigation__item' : ''
                }
              >
                <li>{t('navbar.contact')}</li>
              </NavLink>
            </ul>
            <div className="header__navigation__icon">
              <Select
                onChange={changeLanguage}
                defaultValue={defaultLanguage}
                options={languageOptions}
              />
              <Link className="user__icon__link" to="/login">
                <Button className="login__btn" type="link">
                  {t('navbar.login')}
                </Button>
              </Link>
            </div>
          </nav>
        </div>

        {/* navbar for mobile */}
        <div className="header__navbar__mobile">
          <MenuOutlined onClick={showDrawer} className="hamburgur" />
          <div className="header__logo__wrapper">
            <TwitterOutlined className="header__logo__icon" />
            <Link to="/" className="header__logo__link">
              Yourhome <span className="logo__emphasize">29.</span>
            </Link>
          </div>
          <div className="header__navigation__icon">
            <Select
              onChange={changeLanguage}
              defaultValue={defaultLanguage}
              options={languageOptions}
            />
            {isLogin ? (
              console.log(isLogin) && (
                <Link className="user__icon__link" to="/login">
                  <Button size="small" className="login__btn" type="link">
                    {userData.fullName}
                  </Button>
                </Link>
              )
            ) : (
              <Link className="user__icon__link" to="/login">
                <Button size="small" className="login__btn" type="link">
                  {t('navbar.login')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* drawer for sidebar mobile */}
      <Drawer
        className="modal__mobile__device"
        maskClosable={true}
        keyboard={true}
        placement="left"
        visible={visibleDrawer}
        closable={false}
        onClose={onClose}
      >
        <div className="header__sidebar__wrapper">
          <CloseOutlined onClick={onClose} className="sidebar__close__icon" />
          <ul className="sidebar__menu">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'sidebar__item' : undefined
              }
              onClick={onClose}
            >
              <li>
                {t('navbar.home')} <RightOutlined />
              </li>
            </NavLink>
            <NavLink
              to="/hotels"
              className={({ isActive }) =>
                isActive ? 'sidebar__item' : undefined
              }
              onClick={onClose}
            >
              <li>
                {t('navbar.about')} <RightOutlined />
              </li>
            </NavLink>
            <NavLink
              to="/hotels"
              className={({ isActive }) =>
                isActive ? 'sidebar__item' : undefined
              }
              onClick={onClose}
            >
              <li>
                {t('navbar.hotels')} <RightOutlined />
              </li>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? 'sidebar__item' : undefined
              }
              onClick={onClose}
            >
              <li>
                {t('navbar.contact')} <RightOutlined />
              </li>
            </NavLink>
          </ul>
        </div>
      </Drawer>
      <Modal
        title="  "
        mask={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form>
          <Form.Item>
            <Search onSearch={onSearch} placeholder="Search here..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Navbar;
