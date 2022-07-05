/* eslint-disable react/prop-types */
import { PlusOutlined } from '@ant-design/icons';
import { Input, InputNumber, Modal, Upload } from 'antd';
import { Select } from 'antd';
import React, { useState } from 'react';

import { roomsApi } from '../../../api/roomsApi';

const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const ModalAdd = ({ visible, onCancel }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

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

  const [imagesId, setImagesId] = useState([]);

  const handleUploadImage = async (value) => {
    const images = new FormData();
    images.append('images[]', value);
    const response = await roomsApi.uploadImage(images);
    if (response.data.status === 'success') {
      const id = response.data.data[0].id;
      setImagesId((prev) => [...prev, id]);
    }
  };

  console.log(imagesId);

  return (
    <>
      <Modal title="Add Room" visible={visible} onCancel={onCancel}>
        <>
          <Upload
            multiple={true}
            action={handleUploadImage}
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
            onCancel={onCancel}
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
      </Modal>
    </>
  );
};

export default ModalAdd;
