/* eslint-disable react/prop-types */
import { PlusOutlined } from '@ant-design/icons';
import {
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Upload,
} from 'antd';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

import { roomsApi } from '../../../api/roomsApi';

const { Option } = Select;
const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const ModalEdit = ({ visible, onCancel, handleEditRoom, editRoomData }) => {
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState(editRoomData);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const defaultImagesId =
    editRoomData && editRoomData.images.map((item) => item.imageId);

  useEffect(() => {
    setData(editRoomData);
  }, [editRoomData]);

  useEffect(() => {
    data &&
      form.setFieldsValue({
        number: data.number,
        price: data.price,
        type: data.type,
        beds: data.beds,
        adults: data.adults,
        children: data.childrenData,
        description: data.description,
        asset: data.asset,
      });
    data &&
      setFileList(
        data.images.map((item, index) => {
          return {
            uid: item.id,
            url: item.src,
            status: 'done',
            name: `Image-${index + 1}`,
          };
        })
      );
  }, [data]);

  const [form] = Form.useForm();

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

  const handleUploadImage = async (value) => {
    const images = new FormData();
    images.append('images[]', value);
    const response = await roomsApi.uploadImage(images);
    if (response.data.status === 'success') {
      const id = response.data.data[0].id;
      setImagesId((prev) => [...prev, id]);
    }
  };

  const onCreate = (values) => {
    handleEditRoom({
      ...values,
      images: [...defaultImagesId, ...imagesId],
    });

    setFileList([]);
    setImagesId([]);
  };

  return (
    <>
      <Modal
        width={800}
        visible={visible}
        title="Edit room"
        okText="Update room"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Row gutter={12}>
            <Col span={8}>
              <Form.Item
                name="number"
                label="Number of Room"
                rules={[
                  {
                    required: true,
                    message: 'Please input the number of room!',
                  },
                ]}
              >
                <InputNumber
                  placeholder="Enter room's number"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="price"
                label="Price (USD)"
                rules={[
                  {
                    required: true,
                    message: 'Please input the price of room!',
                  },
                ]}
              >
                <InputNumber
                  placeholder="Enter price"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="type"
                label="Type of Room"
                rules={[
                  {
                    required: true,
                    message: 'Please input the type of room!',
                  },
                ]}
              >
                <Input placeholder="Enter room's type" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={8}>
              <Form.Item
                name="beds"
                label="Beds"
                rules={[
                  {
                    required: true,
                    message: 'Please select the number of beds!',
                  },
                ]}
              >
                <Select>
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                  <Option value={4}>4</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="adults"
                label="Adults"
                rules={[
                  {
                    required: true,
                    message: 'Please select the number of adults!',
                  },
                ]}
              >
                <Select>
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                  <Option value={4}>4</Option>
                  <Option value={5}>5</Option>
                  <Option value={6}>6</Option>
                  <Option value={7}>7</Option>
                  <Option value={8}>8</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="children"
                label="Children"
                rules={[
                  {
                    required: true,
                    message: 'Please select the number of children!',
                  },
                ]}
              >
                <Select>
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                  <Option value={4}>4</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="asset" label="Assets">
            <Checkbox.Group
              style={{
                width: '100%',
              }}
            >
              <Row>
                <Col span={8}>
                  <Checkbox value="Air condition">Air condition</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Flat-screen TV">Flat-screen TV</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Free WiFi">Free WiFi</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Minibar">Minibar</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Ensuite bathroom">Ensuite bathroom</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Soundproofing">Soundproofing</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Safety deposit box">
                    Safety deposit box
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Electric kettle">Electric kettle</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Microwave">Microwave</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Coffee machine">Coffee machine</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Dishwasher">Dishwasher</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Fireplace">Fireplace</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Clothes rack">Clothes rack</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Ceiling fan">Ceiling fan</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Balcony">Balcony</Checkbox>
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
              progress={{
                strokeColor: {
                  '0%': '#108ee9',
                  '100%': '#87d068',
                },
                strokeWidth: 3,
                format: (percent) =>
                  percent && `${parseFloat(percent.toFixed(2))}%`,
              }}
            >
              {fileList && fileList.length >= 8 ? null : uploadButton}
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
        </Form>
      </Modal>
    </>
  );
};

export default ModalEdit;
