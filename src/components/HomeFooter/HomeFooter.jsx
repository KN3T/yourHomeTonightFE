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
import { useTranslation } from 'react-i18next';

import dollar from '../../assets/images/dollar.jpg';
import us from '../../assets/images/englandIcon.jpg';
import usa from '../../assets/images/usa.svg';
import vn from '../../assets/images/vietnamIcon.png';
import vietnamdong from '../../assets/images/vietnamdong.jpg';
import './HomeFooter.scss';

const { Option, OptGroup } = Select;

const { Footer } = Layout;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const HomeFooter = () => {
  const { t } = useTranslation();
  return (
    <Footer className="footer">
      <section className="container ctn">
        <div className="item-1">
          <p className="footer-title" data-testid="label">
            {t('footer.company')}
          </p>
          <a>
            <p>{t('footer.about')}</p>
          </a>
          <a>
            <p>{t('footer.careers')}</p>
          </a>
          <a>
            <p>{t('footer.mobile')}</p>
          </a>
          <a>
            <p>{t('footer.blog')}</p>
          </a>
          <a>
            <p>{t('footer.how_we_work')}</p>
          </a>
          <a>
            <p>{t('footer.sustainability')}</p>
          </a>
        </div>
        <div className="item-2">
          <p className="footer-title" data-testid="label">
            {t('footer.contact')}
          </p>
          <a>
            <p>
              {t('footer.help')}/{t('footer.faq')}
            </p>
          </a>
          <a>
            <p>{t('footer.press')}</p>
          </a>
          <a>
            <p>{t('footer.affiliates')}</p>
          </a>
          <a>
            <p>{t('footer.hotels_owners')}</p>
          </a>
          <a>
            <p>{t('footer.partners')}</p>
          </a>
          <a>
            <p>{t('footer.advertise_with_us')}</p>
          </a>
        </div>
        <div className="item-3">
          <p className="footer-title" data-testid="label">
            {t('footer.more')}
          </p>
          <a>
            <p>{t('footer.airline_fees')}</p>
          </a>
          <a>
            <p>{t('footer.airlines')}</p>
          </a>
          <a>
            <p>{t('footer.low_fare_tips')}</p>
          </a>
          <a>
            <p>{t('footer.badges_certificates')}</p>
          </a>
        </div>
        <div className="item-4">
          <p className="footer-title" data-testid="label">
            {t('footer.site')} / {t('footer.currency')}
          </p>
          <div className="lng-select" style={{ paddingBottom: 10 }}>
            <Select
              defaultValue="United State"
              style={{
                width: 200,
              }}
              onChange={handleChange}
            >
              <OptGroup label="Site">
                <Option value="United State">
                  {' '}
                  <img src={usa} alt="" style={{ width: '20px' }} /> United
                  State
                </Option>
                <Option value="Vietnamese">
                  {' '}
                  <img src={vn} alt="" style={{ width: '20px' }} /> Vietnam
                </Option>
              </OptGroup>
            </Select>
          </div>
        </div>
        <div className="item-5">
          <div className="footer-info">
            <a>
              <div className="item-a">{t('footer.privacy')}</div>
            </a>
            <a>
              <div className="item-b">{t('footer.term')}</div>
            </a>
            <a>
              <div className="item-c">{t('footer.imprint')}</div>
            </a>
            <a>
              <div className="item-d">©2022 Yourhome29.</div>
            </a>
            <div className="item-e">{t('footer.footer_description')}</div>
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
          <div className="subfooter">{t('footer.sub_footer')}</div>
        </div>
      </section>
    </Footer>
  );
};

export default HomeFooter;
