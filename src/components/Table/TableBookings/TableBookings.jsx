import { Input, Skeleton, Space, Table, Tag } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

import handleTag from '../../../utils/handleTag';
import './TableBookings.scss';

const { Search } = Input;

const TableBookings = ({ bookings }) => {
  const data = bookings.map((booking) => ({
    ...booking,
    checkIn: moment(booking.checkIn.date).format('DD-MM-YYYY'),
    checkOut: moment(booking.checkOut.date).format('DD-MM-YYYY'),
    createdAt: moment(booking.createdAt.date).format('DD-MM-YYYY'),
    total: '$' + booking.total,
  }));

  const [dataSearch, setDataSearch] = useState(data);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Check In',
      dataIndex: 'checkIn',
      key: 'checkIn',
    },
    {
      title: 'Check Out',
      dataIndex: 'checkOut',
      key: 'checkOut',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { record }) => {
        const { color, text } = handleTag(record);
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ];

  const handleChange = (e) => {
    const newData = data.filter((item) => {
      if (item.fullName.toLowerCase().includes(e.toLowerCase())) {
        return item;
      }
    });
    setDataSearch(newData);
  };

  return (
    <Space className="table__bookings" direction="vertical">
      <Space className="table__bookings__space">
        <h1 className="table__bookings__space__tag">Total bookings</h1>
        <Search
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search..."
          className="table__bookings__search"
        />
      </Space>
      <Skeleton loading={dataSearch.length < 0}>
        <Table columns={columns} dataSource={dataSearch} />
      </Skeleton>
    </Space>
  );
};

export default TableBookings;
