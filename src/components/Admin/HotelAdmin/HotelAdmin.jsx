import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Input,
  Row,
  Space,
  Spin,
  Table,
  message,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillEdit } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { roomsApi } from '../../../api/roomsApi';
import './HotelAdmin.scss';
import ModalAdd from './ModalAdd/ModalAdd';
import ModalEdit from './ModalEdit/ModalEdit';

const HotelAdmin = () => {
  const { t } = useTranslation();
  const [dataSource, setDataSource] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params.id;

  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [editRoomData, setEditRoomData] = useState();
  const loadingContext = useLoadingContext();

  const date = [
    moment('02-07-2000').format('X'),
    moment('08-02-2000').format('X'),
  ];

  const getRooms = async (id) => {
    setLoading(true);
    const response = await roomsApi.getAll({ id, date });
    if (response.data.status === 'success') {
      setRoomData(
        response.data.data &&
          response.data.data.rooms &&
          response.data.data.rooms.length > 0 &&
          response.data.data.rooms.map((item) => {
            return {
              id: item.id,
              number: item.number,
              type: item.type,
              beds: item.beds,
              adults: item.adults,
              childrenData: item.children,
              description: item.description,
              price: item.price,
              asset: item.asset,
              images: item.images,
            };
          })
      );
      loadingContext.done();
      setLoading(false);
    }
  };

  useEffect(() => {
    getRooms(id);
  }, [id]);

  useEffect(() => {
    setDataSource(roomData);
  }, [roomData]);

  const navigate = useNavigate();

  const columns = [
    {
      title: 'Room Number',
      dataIndex: 'number',
      key: 'number',
      render: (_, record) => (
        <Button
          onClick={() => navigate(`/manageHotel/${id}/rooms/${record.id}`)}
          type="link"
        >
          No. {record.number}
        </Button>
      ),
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Beds',
      dataIndex: 'beds',
      sorter: (a, b) => a.beds - b.beds,
    },
    {
      title: 'Adults',
      dataIndex: 'adults',
      sorter: (a, b) => a.adults - b.adults,
    },
    {
      title: 'Children',
      dataIndex: 'childrenData',
      sorter: (a, b) => a.childrenData - b.childrenData,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
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
          </Space>
        );
      },
    },
  ];

  const onClickEdit = (id) => {
    const data = dataSource.find((item) => item.id === id);
    setEditRoomData(data);
    setEditVisible(true);
  };

  const handleAddRoom = async (values) => {
    setAddVisible(false);
    setLoading(true);
    try {
      const response = await roomsApi.add({ ...values, id });
      if (response.data.status === 'success') {
        dataSource && dataSource.length > 0
          ? setDataSource((prev) => [
              ...prev,
              {
                id: response.data.data.id,
                number: response.data.data.number,
                type: response.data.data.type,
                beds: response.data.data.beds,
                adults: response.data.data.adults,
                childrenData: response.data.data.children,
                description: response.data.data.description,
                price: response.data.data.price,
                asset: response.data.data.asset,
                images: values.imagesSrc,
              },
            ])
          : setDataSource([
              {
                id: response.data.data.id,
                number: response.data.data.number,
                type: response.data.data.type,
                beds: response.data.data.beds,
                adults: response.data.data.adults,
                childrenData: response.data.data.children,
                description: response.data.data.description,
                price: response.data.data.price,
                asset: response.data.data.asset,
                images: values.imagesSrc,
              },
            ]);
        setLoading(false);
        message.success(`Room ${response.data.data.number} is added!!!`);
      }
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong, please try it again!');
    }
  };

  const handleEditRoom = async (values) => {
    setLoading(true);
    setEditVisible(false);
    try {
      const response = await roomsApi.update({
        ...values,
        hotelId: id,
        roomId: editRoomData.id,
      });
      if (response.data.status === 'success') {
        const index = dataSource.findIndex(
          (item) => item.id === editRoomData.id
        );
        let initialData = dataSource;
        initialData[index] = {
          id: response.data.data.id,
          number: response.data.data.number,
          type: response.data.data.type,
          beds: response.data.data.beds,
          adults: response.data.data.adults,
          childrenData: response.data.data.children,
          description: response.data.data.description,
          price: response.data.data.price,
          asset: response.data.data.asset,
          images: response.data.data.images,
        };
        setDataSource([...initialData]);
        setLoading(false);
        message.success(`Room ${response.data.data.number} is updated!!!`);
      }
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong, please try it again!');
    }
  };

  const [searchValue, setSearchValue] = useState('');
  // Handle search product by name
  const onSearch = (value) => {
    const currValue = value;
    setSearchValue(value);
    const filteredData = roomData.filter(
      (entry) =>
        entry.number.toString().includes(currValue) ||
        entry.number.toString().includes(currValue) ||
        entry.price.toString().includes(currValue) ||
        entry.type.toLowerCase().includes(currValue) ||
        entry.type.toUpperCase().includes(currValue)
    );
    setDataSource(filteredData);
  };

  return (
    <Spin spinning={loading}>
      <Row>
        <ModalAdd
          visible={addVisible}
          onCancel={() => setAddVisible(false)}
          handleAddRoom={handleAddRoom}
        />
        <ModalEdit
          visible={editVisible}
          onCancel={() => setEditVisible(false)}
          editRoomData={editRoomData}
          handleEditRoom={handleEditRoom}
        />
        <Col span={24}>
          <Row gutter={12}>
            <Col span={8}>
              <Input
                className="search__input"
                onChange={(e) => onSearch(e.target.value)}
                value={searchValue}
                placeholder="Search by room no, type, price"
              />
            </Col>
            <Col>
              <Button
                onClick={() => setAddVisible(true)}
                type="primary"
                icon={<PlusOutlined />}
              >
                {t('admin.add_room')}
              </Button>
            </Col>
          </Row>
        </Col>
        <Divider />
        <Col span={24}>
          <Table dataSource={dataSource} columns={columns} />
        </Col>
      </Row>
    </Spin>
  );
};

export default HotelAdmin;
