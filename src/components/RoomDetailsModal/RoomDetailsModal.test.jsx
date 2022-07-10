import { render, screen } from '@testing-library/react';
import moment from 'moment';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { store } from '../../store';
import RoomDetailsModal from './RoomDetailsModal';

describe('Room details modal', () => {
  it('Should return a modal show details information about room', () => {
    const roomData = {
      id: 15,
      number: 1,
      type: 'Standard Double Room',
      beds: 2,
      price: 25,
      adults: 4,
      children: 2,
      description:
        'This double room has a cable TV, air conditioning and seating area.',
      images: [{ imagesId: 1, src: 'imagesURL' }],
      asset: ['abc', 'xyz'],
      rating: 5,
    };
    const dataOrder = {
      checkIn: parseInt(moment(1657346717).format('X')),
      checkOut: parseInt(moment(1657493084).format('X')),
      selectedRoom: roomData,
    };
    const roomDetailsModal = render(
      <Provider store={store}>
        <HashRouter>
          <RoomDetailsModal
            isModalVisible="true"
            handleBooking={() => console.log('Navigate to checkout page')}
            handleCancel={() => console.log('Turn off modal')}
            roomData={roomData}
            roomImages={'Images URL'}
            dataOrder={dataOrder}
            setIsModalVisible={() => console.log(123)}
          />
        </HashRouter>
      </Provider>
    );
    expect(roomDetailsModal).toMatchSnapshot();
  });

  it('should render button booking', () => {
    const btn = screen.queryByTestId('btn__booking');
    expect(
      <btn
        handleBooking={() => console.log('booking button')}
        setIsModalVisible={() => console.log('close modal')}
      />
    ).toMatchSnapshot();
  });
});
