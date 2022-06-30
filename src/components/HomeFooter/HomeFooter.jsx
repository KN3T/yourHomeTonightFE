import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Select } from 'antd';
import { Layout } from 'antd';
import 'antd';
import React from 'react';

import dollar from '../../assets/images/dollar.jpg';
// import { useTranslation } from 'react-i18next'
import us from '../../assets/images/englandIcon.jpg';
import vn from '../../assets/images/vietnamIcon.png';
import vietnamdong from '../../assets/images/vietnamdong.jpg';
import './HomeFooter.scss';

const { Option, OptGroup } = Select;

const { Footer } = Layout;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const HomeFooter = () => {
  // const { t } = useTranslation()
  return (
    <Footer className="footer">
      {/* <div className='ctn'> */}
      <section className="container ctn">
        <div className="item-1">
          <p className="footer-title">Company</p>
          <a>
            <p>About</p>
          </a>
          <a>
            <p>Careers</p>
          </a>
          <a>
            <p>Mobile</p>
          </a>
          <a>
            <p>Blog</p>
          </a>
          <a>
            <p>How we work</p>
          </a>
          <a>
            <p>Sustainability</p>
          </a>
        </div>
        <div className="item-2">
          <p className="footer-title">Contact</p>
          <a>
            <p>Help/FAQ</p>
          </a>
          <a>
            <p>Press</p>
          </a>
          <a>
            <p>Affiliates</p>
          </a>
          <a>
            <p>Hotel owners</p>
          </a>
          <a>
            <p>Partners</p>
          </a>
          <a>
            <p>Advertise with us</p>
          </a>
        </div>
        <div className="item-3">
          <p className="footer-title">More</p>
          <a>
            <p>Airline fees</p>
          </a>
          <a>
            <p>Airlines</p>
          </a>
          <a>
            <p>Low fare tips</p>
          </a>
          <a>
            <p>Badges & Certificates</p>
          </a>
        </div>
        <div className="item-4">
          <p className="footer-title">Site / Currency</p>
          <div className="lng-select" style={{ paddingBottom: 10 }}>
            <Select
              defaultValue="United Kingdom"
              style={{
                width: 200,
              }}
              onChange={handleChange}
            >
              <OptGroup label="Site">
                <Option value="United Kingdom">
                  {' '}
                  <img src={us} alt="" style={{ width: '20px' }} /> United
                  Kingdom
                </Option>
                <Option value="Vietnamese">
                  {' '}
                  <img src={vn} alt="" style={{ width: '20px' }} /> Vietnam
                </Option>
              </OptGroup>
            </Select>
          </div>

          <div className="lng-select">
            <Select
              defaultValue="&nbsp;£ &nbsp; Pound Sterling"
              style={{
                width: 200,
              }}
              onChange={handleChange}
            >
              <OptGroup label="Most-Used Currencies">
                <Option value="Euro">
                  <img src={vietnamdong} alt="" style={{ width: '20px' }} />{' '}
                  Vietnamese Dong
                </Option>
                <Option value="United States Dollars">
                  <img src={dollar} alt="" style={{ width: '20px' }} /> United
                  States Dollars
                </Option>
              </OptGroup>
            </Select>
          </div>
        </div>
        <div className="item-5">
          <div className="footer-info">
            <a>
              <div className="item-a">Privacy</div>
            </a>
            <a>
              <div className="item-b">Terms & Conditions</div>
            </a>
            <a>
              <div className="item-c">Imprint</div>
            </a>
            <a>
              <div className="item-d">©2022 Yourhome29.</div>
            </a>
            <div className="item-e">
              Search flights, hotels, hire cars, travel guides and more with
              Yourhome29. searches hundreds of other travel sites at once to get
              you the information you need to make the right decisions.
            </div>
            <div className="item-f">
              <p className="contact-footer">
                <a>
                  {' '}
                  <FacebookOutlined />{' '}
                </a>
                <a>
                  {' '}
                  <TwitterOutlined />{' '}
                </a>
                <a>
                  {' '}
                  <YoutubeOutlined />{' '}
                </a>
                <a>
                  {' '}
                  <InstagramOutlined />{' '}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="item-6">
          <div className="subfooter">
            Yourhome29. is part of Booking Holdings Inc., the world leader in
            online travel & related services.
          </div>
        </div>
      </section>
    </Footer>
  );
};

export default HomeFooter;
