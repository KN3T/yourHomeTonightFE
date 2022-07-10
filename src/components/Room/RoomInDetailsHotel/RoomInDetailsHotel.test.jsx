import { render } from '@testing-library/react';
import React from 'react';
import { describe } from 'vitest';

import RoomInDetailsHotel from './RoomInDetailsHotel';

describe('RoomInDetailsHotel', () => {
  it('Should return an item room in table', () => {
    const room = {
      adults: 3,
      asset: ['Dishwasher', 'Flat-screen TV'],
      beds: 1,
      children: 1,
      description: 'This triple room has a balcony, sofa and minibar.',
      id: 20,
      images: [
        { imageId: 112, src: 'URL1' },
        { imageId: 113, src: 'URL2' },
        { imageId: 114, src: 'URL3' },
      ],
      number: 6,
      price: 36,
      rating: 0,
      type: 'Deluxe Triple Room',
    };
    const showRoom = () => console.log('Show room ID');
    const roomInDetailsHotel = render(
      <RoomInDetailsHotel room={room} showRoom={showRoom} />
    );
    expect(roomInDetailsHotel).toMatchSnapshot();
  });
});
