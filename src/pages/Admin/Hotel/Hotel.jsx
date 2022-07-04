import {
  DeleteOutlined,
  EditOutlined,
  FundViewOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card } from 'antd';
import { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
// Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
// Import css
import { toast } from 'react-toastify';

import { hotelApi } from '../../../api';
import './Hotel.scss';

const { Meta } = Card;

const Hotel = () => {
  const [listHotel, setListHotel] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await hotelApi.getAll();
      if (response.status === 200) {
        setListHotel(response.data.data.hotels);
      }
    }

    fetchMyAPI();
  }, []);

  const handleRedirect = (id) => {
    navigate(`/admin/hotel/${id}`);
  };

  const alertDialog = (id) => {
    confirmAlert({
      title: 'Bạn có muốn xóa khách sạn này',
      message: 'Bạn thực sự muốn xóa nó.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(id),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const handleDelete = async (id) => {
    try {
      let response = await hotelApi.delete(id);
      if (response.status === 200) {
        toast.success('Delete Success');
      }
    } catch (error) {
      toast.error('Delete Fails');
    }
  };

  const createHotel = () => {
    navigate('/admin/hotel/create');
  };
  return (
    <div className="maim">
      <Button
        type="primary"
        className="py-2"
        shape="round"
        icon={<PlusCircleOutlined />}
        size={'large'}
        onClick={createHotel}
      >
        Create
      </Button>
      <div className="list_card">
        {listHotel &&
          listHotel.map((e) => (
            <Card
              key={e.id}
              style={{
                width: 300,
                boxShadow: '0px 0px 5px',
              }}
              cover={<img alt="example" src={e.images[0].src} />}
              actions={[
                <FundViewOutlined
                  key="View"
                  onClick={() => handleRedirect(e.id)}
                />,
                <EditOutlined key="edit" />,
                <DeleteOutlined
                  key="Delete"
                  onClick={() => alertDialog(e.id)}
                />,
              ]}
            >
              <Meta title={e.name} description={e.description} />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Hotel;
