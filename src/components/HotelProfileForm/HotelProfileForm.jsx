/* eslint-disable react/prop-types */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Modal, Row, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLoadingContext } from 'react-router-loading';

import { hotelApi } from '../../api';
import './HotelProfileForm.scss';

const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const HotelProfileForm = (props) => {
  const { handleUpdateHotel, form, hotelData } = props;
  const loadingContext = useLoadingContext();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    form.setFieldsValue({
      name: hotelData && hotelData.name,
      email: hotelData && hotelData.email,
      phone: hotelData && hotelData.phone,
      address: hotelData && hotelData.address.address,
      city: hotelData && hotelData.address.city,
      province: hotelData && hotelData.address.province,
      rules: hotelData && hotelData.rules,
      description: hotelData && hotelData.description,
    });

    hotelData &&
      setFileList(
        hotelData.images.map((item, index) => {
          return {
            uid: item.id,
            url: item.src,
            status: 'done',
            name: `Image-${index + 1}`,
          };
        })
      );
    loadingContext.done();
  }, [hotelData]);

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

  const handleChangeImage = async ({ fileList: newFileList }) => {
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
  const [imagesSrc, setImagesSrc] = useState([]);

  const defaultImagesId =
    hotelData && hotelData.images.map((item) => item.imageId);

  const handleUploadImage = async (value) => {
    const images = new FormData();
    images.append('images[]', value);
    const response = await hotelApi.uploadImage(images);
    if (response.data.status === 'success') {
      const id = response.data.data[0].id;
      const src = response.data.data[0].src;
      setImagesId((prev) => [...prev, id]);
      setImagesSrc((prev) => [...prev, src]);
    }
  };

  const onCreate = (values) => {
    handleUpdateHotel({
      ...values,
      images: [...defaultImagesId, ...imagesId],
      imagesSrc: imagesSrc,
    });

    setFileList([]);
    setImagesId([]);
  };

  return (
    <Row>
      <Col span={24}>
        <h2>{hotelData && hotelData.hotelName}</h2>
      </Col>
      <Col span={24}>
        <Form onFinish={onCreate} form={form} layout="vertical">
          <Row gutter={12}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Hotel Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input the name of hotel!',
                  },
                ]}
              >
                <Input placeholder="Enter hotel's name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Hotel Email"
                rules={[
                  {
                    required: true,
                    message: 'Please input the email of hotel!',
                  },
                ]}
              >
                <Input placeholder="Enter hotel's email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone number"
                rules={[
                  {
                    required: true,
                    message: 'Please input phone number!',
                  },
                ]}
              >
                <Input placeholder="Enter hotel's phone number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={8}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: 'Please input address',
                  },
                ]}
              >
                <Input placeholder="Enter address!" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="city"
                label="City"
                rules={[
                  {
                    required: true,
                    message: 'Please input city',
                  },
                ]}
              >
                <Input placeholder="Enter city!" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="province"
                label="Province"
                rules={[
                  {
                    required: true,
                    message: 'Please input province!',
                  },
                ]}
              >
                <Input placeholder="Enter province!" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="rules" label="Rules">
            <Checkbox.Group
              style={{
                width: '100%',
              }}
            >
              <Row>
                <Col span={6}>
                  <Checkbox value="No dogs">No dogs</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value="Non-Refundable">Non-Refundable</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="images">
            <Upload
              multiple={true}
              action={handleUploadImage}
              listType="picture-card"
              fileList={fileList}
              onChange={handleChangeImage}
              onPreview={handlePreview}
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
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{ width: '100%' }} htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default HotelProfileForm;
