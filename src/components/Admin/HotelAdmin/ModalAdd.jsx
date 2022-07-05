/* eslint-disable react/prop-types */
import { PlusOutlined } from '@ant-design/icons';
import { Input, InputNumber, Modal, Upload } from 'antd';
import { Select } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

const ModalAdd = ({ isModalAddVisible, handleCancel }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const [data, setData] = useState({
    number: '',
    type: 'GOLD',
    price: '',
    adults: '',
    children: '',
    beds: '',
    description: '',
    asset: [],
    images: [],
  });

  const handleCancell = () => setPreviewVisible(false);

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

  return (
    <>
      <Modal
        title="Add Room"
        visible={isModalAddVisible}
        onCancel={handleCancel}
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
            />
            <Input
              size="large"
              className="width-400"
              placeholder="Price"
              value={data.price}
              onChange={(e) => handleChangeForm(e, 'price')}
            />
            <InputNumber
              size="large"
              className="width-400"
              placeholder="Adults"
              min={1}
              max={100}
              value={data.adults}
              onChange={(e) => handleChangeForm(e, 'adults')}
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
            />

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
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancell}
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
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalAdd;
