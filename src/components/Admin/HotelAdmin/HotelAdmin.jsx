import { Button, Col, Divider, Input, Row, Space, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useParams } from 'react-router-dom';

import { roomsApi } from '../../../api/roomsApi';
import './HotelAdmin.scss';

const HotelAdmin = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params.id;

  const getRooms = async (id) => {
    setLoading(true);
    const response = await roomsApi.getAll(id);
    if (response.data.status === 'success') {
      setDataSource(
        response.data.data.rooms.map((item) => {
          return {
            id: item.id,
            number: item.number,
            type: item.type,
            beds: item.beds,
            adults: item.adults,
            childrenData: item.children,
            price: item.price,
          };
        })
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    getRooms(id);
  }, [id]);

  const columns = [
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Beds',
      dataIndex: 'beds',
    },
    {
      title: 'Adults',
      dataIndex: 'adults',
    },
    {
      title: 'Children',
      dataIndex: 'childrenData',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => {
        return (
          <Space size="middle">
            <Button
              className="primary__button"
              type="primary"
              ghost
              onClick={() => onClickEdit(id)}
            >
              <AiFillEdit />
            </Button>
            <Button type="danger" onClick={() => onClickDelete(id)}>
              <AiFillDelete />
            </Button>
          </Space>
        );
      },
    },
  ];

  const onClickEdit = (id) => {
    console.log(id);
  };

  const onClickDelete = (id) => {
    console.log(id);
  };

  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>
          <Row gutter={12}>
            <Col span={8}>
              <Input className="search__input" />
            </Col>
            <Col>
              <Button type="primary">Add new room</Button>
            </Col>
          </Row>
        </Col>
        <Divider />
        <Col span={24}>
          {dataSource && dataSource.length > 0 && (
            <div>
              <Table dataSource={dataSource} columns={columns} />
            </div>
          )}
        </Col>
      </Row>
    </Spin>
  );
};

export default HotelAdmin;
