import { Col, Row, Space, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import bookingApi from '../../../api/bookingApi';
import hotelApi from '../../../api/hotelApi';
import { BarChart, TableBookings } from '../../../components';
import './Dashboard.scss';

const Dashboard = () => {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState();
  const [data, setData] = useState();
  const [total, setTotal] = useState({});
  const { id } = useParams();
  const loadingContext = useLoadingContext();

  useEffect(() => {
    const getAllBookings = async () => {
      const { data } = await bookingApi.getAllBookingHotel(id);
      data && setBookings(data.data.bookings);
    };
    const getRevenueAllYear = async () => {
      const { data } = await hotelApi.revenue(id);
      setData({
        labels: data.data.map((data) => data.month),
        datasets: [
          {
            label: 'Revenue',
            data: data.data.map((data) => data.revenue),
          },
        ],
      });
    };

    const getTotalRevenue3Months = async () => {
      const { data } = await hotelApi.getTotalRevenue(id);
      setTotal(data.data[0]);
    };
    getAllBookings();
    getRevenueAllYear();
    getTotalRevenue3Months();
    data && loadingContext.done();
  }, []);

  loadingContext.done();
  return (
    <Space className="dashboard">
      <Row gutter={[0, 20]} className="dashboard__row">
        <Col
          className="dashboard__row__card"
          xl={24}
          lg={24}
          md={24}
          sm={24}
          xs={24}
        >
          <Tag className="dashboard__row__card__revenue__tag" color="cyan">
            {t('admin.totalrevenue')}
            <Tag
              className="dashboard__row__card__revenue__tag__countUp"
              color="cyan"
            >
              {<CountUp duration={1} end={total.totalRevenue} />}
            </Tag>
          </Tag>
          <Tag className="dashboard__row__card__bookings__tag" color="blue">
            {t('admin.totalbookings')}
            <Tag
              className="dashboard__row__card__bookings__tag__countUp"
              color="blue"
            >
              {<CountUp duration={1} end={total.totalBookings} />}
            </Tag>
          </Tag>
        </Col>

        <Col
          className="dashboard__row__chart"
          xl={24}
          lg={24}
          md={24}
          sm={24}
          xs={24}
        >
          <Space className="dashboard__row__chart__space" direction="vertical">
            {data && <BarChart datasets={data} />}
          </Space>
        </Col>
        <Col
          className="dashboard__row__bookings"
          xl={24}
          lg={24}
          md={24}
          sm={24}
          xs={24}
        >
          {bookings && <TableBookings bookings={bookings} />}
        </Col>
      </Row>
    </Space>
  );
};

export default Dashboard;
