/* eslint-disable react/prop-types */
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Input, Skeleton, Space, Table, Tag } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

import { hotelApi } from '../../../api';
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

  const handleMarkAsDone = async (id) => {
    await hotelApi.markAsDoneBooking(id);
    const newData = dataSearch.map((item) => {
      if (item.id === id) {
        item.status = 4;
        return item;
      } else {
        return item;
      }
    });
    setDataSearch(newData);
  };

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
      render: (item) => {
        const { color, text, icon } = handleTag(item);
        return (
          <Tag color={color} icon={icon}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: '',
      render: (_, record) => {
        return record.status === 2 ? (
          <Button
            shape="circle"
            onClick={() => handleMarkAsDone(record.id)}
            danger
          >
            <CheckCircleOutlined />
          </Button>
        ) : (
          <Button
            disabled
            shape="circle"
            onClick={() => handleMarkAsDone(record.id)}
            danger
          >
            <CheckCircleOutlined />
          </Button>
        );
      },
    },
  ];

  const handleChange = (e) => {
    const newData = data.filter((item) => {
      if (
        item.fullName.toLowerCase().includes(e.toLowerCase()) ||
        item.id + '' === e ||
        item.email.includes(e.toLowerCase())
      ) {
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
          placeholder="Search id, email, name ..."
          className="table__bookings__space__search"
        />
      </Space>
      <Skeleton loading={dataSearch.length < 0}>
        <Table columns={columns} dataSource={dataSearch} />
      </Skeleton>
    </Space>
  );
};

export default TableBookings;
