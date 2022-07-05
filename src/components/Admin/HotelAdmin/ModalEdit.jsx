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
import { Breadcrumb, Button, Input, InputNumber, Modal, Upload } from 'antd';
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { roomsApi } from '../../../api/roomsApi';

const { Option } = Select;

const ModalEdit = ({
  isModalEditVisible,
  handleEditOk,
  handleEditCancel,
  data,
}) => {
  const [previewVisibleEdit, setPreviewVisibleEdit] = useState(false);
  const [previewImageEdit, setPreviewImageEdit] = useState('');
  const [previewTitleEdit, setPreviewTitleEdit] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleCancell = () => setPreviewVisibleEdit(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImageEdit(file.url || file.preview);
    setPreviewVisibleEdit(true);
    setPreviewTitleEdit(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleChange = async ({ fileList: newFileList }) => {
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

  const handleUploadData = async () => {
    try {
      const data = await roomsApi.uploadImg({
        'images[]': fileList,
      });
      // khi có data img
      setData({
        ...data,
        images: [], // data cua img o tren
      });
      // create
      const response = await roomsApi.updateRoom(data, 6);
      if (response.status === 200) {
        toast.success('create thanh cong');
        // tat popup
        handleEditCancel();
      }
    } catch (error) {
      toast.error('fail to create');
    }
  };
  return (
    <>
      <Modal
        title="Edit Room"
        visible={isModalEditVisible}
        onOk={() => handleUploadData()}
        onCancel={handleEditCancel}
      >
        <div className="main_create">
          <div className="form__main">
            <InputNumber
              size="large"
              className="width-400"
              placeholder="Number"
              min={1}
              max={100}
              value={data.number}
              onChange={(e) => handleChangeForm(e, 'number')}
              // prefix={<UserOutlined />}
            />
            <Input
              size="large"
              className="width-400"
              placeholder="Price"
              value={data.price}
              onChange={(e) => handleChangeForm(e, 'price')}
              //   prefix={<BorderlessTableOutlined />}
            />
            <InputNumber
              size="large"
              className="width-400"
              placeholder="Adults"
              min={1}
              max={100}
              value={data.adults}
              onChange={(e) => handleChangeForm(e, 'adults')}
              // prefix={<UserOutlined />}
            />
            <InputNumber
              size="large"
              className="width-400"
              placeholder="Children"
              min={1}
              max={100}
              value={data.children}
              onChange={(e) => handleChangeForm(e, 'children')}
              // prefix={<UserOutlined />}
            />
            <InputNumber
              size="large"
              className="width-400"
              placeholder="Adults"
              min={1}
              max={100}
              value={data.beds}
              onChange={(e) => handleChangeForm(e, 'beds')}
              // prefix={<UserOutlined />}
            />
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
            <Input
              size="large"
              className="width-400"
              placeholder="Description"
              value={data.description}
              onChange={(e) => handleChangeForm(e, 'description')}
            />
            <div className="button">
              <>
                <Upload
                  action="https://api.yourhometonight.com/api/images"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisibleEdit}
                  title={previewTitleEdit}
                  footer={null}
                  onCancel={handleCancell}
                >
                  <img
                    alt="example"
                    style={{
                      width: '100%',
                    }}
                    src={previewImageEdit}
                  />
                </Modal>
              </>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalEdit;
