import {
  BorderlessTableOutlined,
  BranchesOutlined,
  DownloadOutlined,
  HomeOutlined,
  MailOutlined,
  MessageOutlined,
  PhoneOutlined,
  PlusOutlined,
  RollbackOutlined,
  ShareAltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Button, Input, Modal, Upload } from 'antd';
import { Select } from 'antd';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { roomsApi } from '../../../api/roomsApi';
import './CreateHotel.scss';

const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const CreateHotel = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const [data, setData] = useState({
    number: '',
    type: 'GOLD',
    price: '',
    adults: '',
    children: '',
    beds: '',
    description: '',
    asset: [],
  });

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleChange = async ({ fileList: newFileList }) => {
    try {
      let formdata = new FormData();
      formdata.append('images[]', 'sss');
      console.log(formdata);

      // const upload = await roomsApi.uploadImage();
    } catch (error) {
      console.log(error);
    }
    console.log('====================================');
    console.log(newFileList);
    console.log('====================================');
    setFileList(newFileList);
  };

  const handleChangeItem = (value) => {
    setData({
      ...data,
      asset: [...value],
    });
  };

  const handleChangeForm = (item, key) => {
    const res = item.target?.value || item;
    setData({
      ...data,
      [key]: res,
    });
  };

  console.log(data);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div className="main_create">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin/hotel">
            <Button
              type="primary"
              className="py-2"
              shape="round"
              icon={<RollbackOutlined />}
              size={'large'}
            >
              Back
            </Button>
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="form__main">
        <Input
          size="large"
          className="width-400"
          placeholder="Number"
          value={data.number}
          onChange={(e) => handleChangeForm(e, 'number')}
          prefix={<UserOutlined />}
        />
        <Input
          size="large"
          className="width-400"
          placeholder="Price"
          value={data.price}
          onChange={(e) => handleChangeForm(e, 'price')}
          prefix={<BorderlessTableOutlined />}
        />
        <Select
          size="large"
          placeholder="Adult"
          className="width-400 p-10"
          value={data.adults}
          onChange={(e) => handleChangeForm(e, 'adults')}
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
        </Select>
        <Select
          size="large"
          placeholder="Children"
          value={data.children}
          className="width-400 p-10"
          onChange={(e) => handleChangeForm(e, 'children')}
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
        </Select>
        <Select
          size="large"
          placeholder="Beds"
          value={data.beds}
          className="width-400 p-10"
          onChange={(e) => handleChangeForm(e, 'beds')}
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
        </Select>
        {/* <Input size="large" className='width-400' onChange={(e)=>handleChangeForm(e,'description')} value={data.description} placeholder="Description" prefix={<MessageOutlined />} /> */}
        <Select
          size="large"
          mode="multiple"
          className="width-400"
          placeholder="Select Option"
          value={data.asset}
          onChange={handleChangeItem}
          optionLabelProp="label"
        >
          <Option value="tivi" label="Tivi">
            <div className="demo-option-label-item">
              <span role="img" aria-label="Tivi">
                Tivi
              </span>
            </div>
          </Option>
          <Option value="Desk" label="Desk">
            <div className="demo-option-label-item">
              <span role="img" aria-label="Desk">
                Desk
              </span>
            </div>
          </Option>
          <Option value="Flat-screen TV" label="Flat-screen TV">
            <div className="demo-option-label-item">
              <span role="img" aria-label="Flat-screen TV">
                Flat-screen TV
              </span>
            </div>
          </Option>
          <Option value="Electric kettle" label="Electric kettle">
            <div className="demo-option-label-item">
              <span role="img" aria-label="Electric kettle">
                Electric kettle
              </span>
            </div>
          </Option>
          <Option value="Mini Bar" label="Mini Bar">
            <div className="demo-option-label-item">
              <span role="img" aria-label="Mini Bar">
                Mini Bar
              </span>
            </div>
          </Option>
        </Select>
        <div className="button">
          <>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>
          </>
          <Button
            type="primary"
            className="float"
            shape="round"
            icon={<PlusOutlined />}
            size={'large'}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateHotel;
