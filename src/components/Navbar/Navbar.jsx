import {
  CloseOutlined,
  MenuOutlined,
  RightOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { Badge, Drawer, Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

const Navbar = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onClose = () => {
    setVisibleDrawer(false);
  };
  return (
    <>
      <header className="header__wrapper">
        <div className="header__navbar__desktop">
          <div className="header__logo__wrapper">
            <TwitterOutlined className="header__logo__icon" />
            <Link to="/" className="header__logo__link">
              Yourhome29.
            </Link>
          </div>
          <nav className="header__navigation__wrapper">
            <ul className="header__navigation__menu">
              <li>Home</li>
              <li>About</li>
              <li>Room</li>
              <li>Contact</li>
              <li>Destination</li>
            </ul>

            <div className="header__navigation__icon">
              <span className="header__navigation__icon__wrapper">
                <SearchOutlined className="navbar__search__icon" />
              </span>
              <span className="header__navigation__icon__wrapper">
                <Badge count={0} showZero>
                  <ShoppingCartOutlined className="navbar__cart__icon" />
                </Badge>
              </span>
            </div>
          </nav>
        </div>

        <div className="header__navbar__mobile">
          {/* <div
          onClick={(e) => {
            e.target.classList.remove('hamburgur');
            e.target.classList.add('hamburgur__open__sidebar');
          }}
          className="hamburgur"
        >
          <div></div>
          <div></div>
          <div></div>
        </div> */}
          <MenuOutlined onClick={showDrawer} className="hamburgur" />
          <div className="header__logo__wrapper">
            <TwitterOutlined className="header__logo__icon" />
            <Link to="/" className="header__logo__link">
              Yourhome29.
            </Link>
          </div>
          <div className="header__navigation__icon">
            <span className="header__navigation__icon__wrapper">
              <SearchOutlined className="navbar__search__icon" />
            </span>
            <span className="header__navigation__icon__wrapper">
              <Badge count={0} showZero>
                <ShoppingCartOutlined className="navbar__cart__icon" />
              </Badge>
            </span>
          </div>
        </div>
      </header>

      <Drawer visible={visibleDrawer}>
        <div className="header__sidebar__wrapper">
          <CloseOutlined onClick={onClose} className="sidebar__close__icon" />
          <ul className="sidebar__menu">
            <li>
              Home <RightOutlined />
            </li>
            <li>
              About <RightOutlined />
            </li>
            <li>
              Room <RightOutlined />
            </li>
            <li>
              Contact <RightOutlined />
            </li>
            <li>
              Destination <RightOutlined />
            </li>
          </ul>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
