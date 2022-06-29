/* eslint-disable react/prop-types */
import { Modal } from 'antd';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const RoomDetailsModal = ({ isModalVisible, handleOk, handleCancel }) => {
  return (
    <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <div className="gallery__section">
        <Carousel>
          {/* <div>
            <img src="assets/1.jpeg" />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <img src="assets/2.jpeg" />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <img src="assets/3.jpeg" />
            <p className="legend">Legend 3</p>
          </div> */}
        </Carousel>
      </div>
      <div className="info__section"></div>
    </Modal>
  );
};

export default RoomDetailsModal;
