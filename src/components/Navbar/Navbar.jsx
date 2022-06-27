import {
  CloseOutlined,
  MenuOutlined,
  RightOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  TwitterOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Badge, Button, Drawer, Form, Input, Menu, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import us from '../../assets/images/englandIcon.jpg';
import vn from '../../assets/images/vietnamIcon.png';
import './index.scss';

const { Search } = Input;
const { Option } = Select;
const Navbar = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActive, setIsActive] = useState();
  // const [value, setValue] = useState('');
  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
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
                <li>Home</li>
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'header__navigation__item' : ''
                }
              >
                <li>About</li>
              </NavLink>
              <NavLink
                to="/rooms"
                className={({ isActive }) =>
                  isActive ? 'header__navigation__item' : ''
                }
              >
                <li>Room</li>
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'header__navigation__item' : ''
                }
              >
                <li>Contact</li>
              </NavLink>
              <NavLink
                to="/destination"
                className={({ isActive }) =>
                  isActive ? 'header__navigation__item' : ''
                }
              >
                <li>Destination</li>
              </NavLink>
            </ul>
            <div className="header__navigation__icon">
              <span className="header__navigation__icon__wrapper">
                <SearchOutlined
                  onClick={showModal}
                  className="navbar__search__icon"
                />
              </span>
              <Select
                defaultValue={defaultLanguage}
                options={languageOptions}
              />
              <Link className="user__icon__link" to="/login">
                <Button className="login__btn" type="link">
                  Login
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
              Yourhome29.
            </Link>
          </div>
          <div className="header__navigation__icon">
            <span className="header__navigation__icon__wrapper">
              <SearchOutlined
                onClick={showModal}
                className="navbar__search__icon"
              />
            </span>
            <Select defaultValue={defaultLanguage} options={languageOptions} />
            <Link className="user__icon__link" to="/login">
              <Button size="small" className="login__btn" type="link">
                Login
              </Button>
            </Link>
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
                Home <RightOutlined />
              </li>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'sidebar__item' : undefined
              }
              onClick={onClose}
            >
              <li>
                About <RightOutlined />
              </li>
            </NavLink>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                isActive ? 'sidebar__item' : undefined
              }
              onClick={onClose}
            >
              <li>
                Room <RightOutlined />
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
                Contact <RightOutlined />
              </li>
            </NavLink>
            <NavLink
              to="/destination"
              className={({ isActive }) =>
                isActive ? 'sidebar__item' : undefined
              }
              onClick={onClose}
            >
              <li>
                Destination <RightOutlined />
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
