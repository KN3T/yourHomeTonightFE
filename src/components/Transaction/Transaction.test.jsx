import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';

import Transaction from './Transaction';

const bookings = [
  {
    id: 151,
    fullName: 'nhut',
    phone: '0911000333',
    email: 'user@gg.com',
    checkIn: {
      date: '2022-07-08 00:00:00.000000',
      timezone_type: 3,
      timezone: 'UTC',
    },
    checkOut: {
      date: '2022-07-11 00:00:00.000000',
      timezone_type: 3,
      timezone: 'UTC',
    },
    total: 112.2,
    status: 2,
    createdAt: {
      date: '2022-07-08 10:42:29.000000',
      timezone_type: 3,
      timezone: 'UTC',
    },
    user: {
      id: 3,
      email: 'user@gg.com',
      fullName: 'Võ Người Dùng',
      phone: '0944112233',
      role: 'ROLE_USER',
    },
    room: {
      id: 29,
      number: 4,
      type: 'Superior Twin Room with Ocean View',
      price: 34,
      adults: 2,
      children: 2,
      asset: ['Ceiling fan', 'Coffee machine', 'Microwave'],
      beds: 1,
      description:
        'This twin room features a balcony, view and patio. Additional benefits: - Complimentary sauna, steam bath service, access to fitness center at 5th floor',
      images: [
        {
          imageId: 139,
          src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/226441291.jpg?k=86d3367ed26a628e391c475ab487094138195a71ae89b55b53956e52328d6542&o=&hp=1',
        },
        {
          imageId: 140,
          src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/203209485.jpg?k=819522a5ddf4186ecec3c0caa21564a3310c89d716425fb9c09bbe09d4975e82&o=&hp=1',
        },
        {
          imageId: 141,
          src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/363364861.jpg?k=5d1163f659ba1967c0068e97c320df24beaa10a257295bfe4b68de794a1226d3&o=&hp=1',
        },
      ],
    },
    hotel: {
      id: 7,
      name: 'Sel de Mer Hotel & Suites',
      description:
        'This property is 5 minutes walk from the beach. Set in Da Nang, Sel de Mer Hotel & Suites offers beachfront accommodation 7 km from Marble Mountains and just 5 km from Son Tra Peninsula. The hotel offers various facilities, such as a fitness centre, a swimming pool, a bar and a shared lounge.\n\nAt the hotel, each room has a patio. At Sel de Mer Hotel & Suites the rooms are equipped with a desk, a flat-screen TV and a private bathroom.\n\nContinental and buffet breakfast options are available every morning at the accommodation.\n\nAt Sel de Mer Hotel & Suites guests are welcome to take advantage of free salt sauna and steam bath services.\n\nThere is a tour desk and car rentals are available, while the business centre has newspapers.\n\nSong Han Bridge is 2.2 km from the hotel, while Love Lock Bridge Da Nang is 3.1 km from the property. The nearest airport is Da Nang International Airport, 7 km from Sel de Mer Hotel & Suites, and the property offers a paid airport shuttle service.\n\nCouples particularly like the location — they rated it 8.9 for a two-person trip.\n\nSel de Mer Hotel & Suites has been welcoming Booking.com guests since 3 Jun 2019.',
      phone: '0236 3868 288',
      email: 'support@seldemer.com',
      rules: ['No cat'],
      address: {
        id: 7,
        city: 'Da Nang',
        province: 'Da Nang',
        address: '92 Vo Nguyen Giap, Son Tra',
      },
      images: [
        {
          imageId: 37,
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/255358341.jpg?k=1d3a3348c8bce29fe6cb33a6b37c6dc9e5ef846fd963601ce889d50c57413b08&o=&hp=1',
        },
        {
          imageId: 38,
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/226434430.jpg?k=9d4fdab222ade82631992354860871420b67f37e4a1c6b7537c27288c6092f79&o=&hp=1',
        },
        {
          imageId: 39,
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/362410897.jpg?k=ea27dff5c9d7b9bf0e583cb2a706c83f99046ca70a0344e061d689f422db74b3&o=&hp=1',
        },
        {
          imageId: 40,
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/255358156.jpg?k=92459e16535a06d3aea8ac71dfc6d5a246c0a21a61162b9abf5a712ca8dcca10&o=&hp=1',
        },
        {
          imageId: 41,
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/255358289.jpg?k=fbdefdebbf102bb095a76ca1fa4c6ac7ef0834a2a373f9faa1fb5d45b822b2a7&o=&hp=1',
        },
        {
          imageId: 42,
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/255358332.jpg?k=df422cbd47ffdf8520cc239f1f0bca0b90141e76402977f5a38881c5f56bfcc4&o=&hp=1',
        },
      ],
    },
  },
  {
    id: 152,
    fullName: 'Nhut Le',
    phone: '0911000333',
    email: 'user@gg.com',
    checkIn: {
      date: '2022-07-08 00:00:00.000000',
      timezone_type: 3,
      timezone: 'UTC',
    },
    checkOut: {
      date: '2022-07-11 00:00:00.000000',
      timezone_type: 3,
      timezone: 'UTC',
    },
    total: 46.2,
    status: 2,
    createdAt: {
      date: '2022-07-08 10:43:22.000000',
      timezone_type: 3,
      timezone: 'UTC',
    },
    user: {
      id: 3,
      email: 'user@gg.com',
      fullName: 'Võ Người Dùng',
      phone: '0944112233',
      role: 'ROLE_USER',
    },
    room: {
      id: 24,
      number: 1,
      type: 'Premier Suite Double',
      price: 14,
      adults: 4,
      children: 1,
      asset: [
        'Ensuite bathroom',
        'Ensuite bathroom',
        'Balcony',
        'Safety deposit box',
        'Ceiling fan',
      ],
      beds: 1,
      description:
        'This twin/double room features a balcony, seating area and bathrobe.',
      images: [
        {
          imageId: 124,
          src: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/235325816.jpg?k=a689508c2e1149b0bd5dbc5b9948b634226868a80808e3fad4617f783ee3f1de&o=',
        },
        {
          imageId: 125,
          src: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/235327919.jpg?k=440ae0b1475be2d1bb26a9b8f1b8bd7ced51d047cfb1ee7c19beee631f48f02f&o=',
        },
        {
          imageId: 126,
          src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/235326854.jpg?k=dc23d2af7bf79ec204e0d351aa0a1f16022df4f5e02d87e8a15503d76ffca1f2&o=&hp=1',
        },
      ],
    },
    hotel: {
      id: 6,
      name: 'TMS Hotel Da Nang Beach',
      description:
        "TMS Hotel Da Nang Beach features a restaurant, outdoor swimming pool, a fitness centre and bar in Da Nang. Featuring family rooms, this property also provides guests with a children's playground. The accommodation offers a 24-hour front desk, airport transfers, room service and free WiFi throughout the property.\n\nAt the hotel all rooms are equipped with air conditioning, a seating area, a flat-screen TV with cable channels, a safety deposit box and a private bathroom with a shower, bathrobes and slippers. All rooms come with a kettle, while some rooms come with a kitchen with a microwave and a fridge. The units feature a desk.\n\nTMS Hotel Da Nang Beach offers a buffet or American breakfast.\n\nThe accommodation offers a terrace.\n\nThere is a kids' club for the children and guests can make use of the business centre.\n\nMy Khe Beach is 50 m from TMS Hotel Da Nang Beach, while Bac My An Beach is 600 m away. The nearest airport is Da Nang International Airport, 6 km from the hotel.\n\nCouples particularly like the location — they rated it 9.0 for a two-person trip.\n\nTMS Hotel Da Nang Beach has been welcoming Booking.com guests since 13 Sept 2018.",
      phone: '0236 3755 999',
      email: 'support@tmshotel.com',
      rules: ['Non-Refundable'],
      address: {
        id: 6,
        city: 'Da Nang',
        province: 'Da Nang',
        address: '292 Vo Nguyen Giap Street, My An Ward, Ngu Hanh Son District',
      },
      images: [
        {
          imageId: 31,
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/347576576.jpg?k=8f9f1dbd85a8d7d357788db83c379757b80a47194d74f49a820dff49ca8edf3f&o=&hp=1',
        },
        {
          imageId: 32,
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/207520605.jpg?k=b4715bbe96b84026984f22e278cfd4b02b18cbc1be72f2fb922bdd6672d6f680&o=&hp=1',
        },
        {
          imageId: 33,
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/175525741.jpg?k=66c58dfd5a2b911a45fb19000f89ce8a3e1f7352d2d1410abc419204dd3d1109&o=&hp=1',
        },
        {
          imageId: 34,
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/228795943.jpg?k=9033c74e2841c1a680a045b173039fc059f2c940e43569fad79646cd73ce8993&o=&hp=1',
        },
        {
          imageId: 35,
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/235326854.jpg?k=dc23d2af7bf79ec204e0d351aa0a1f16022df4f5e02d87e8a15503d76ffca1f2&o=&hp=1',
        },
        {
          imageId: 36,
          src: 'https://t-cf.bstatic.com/xdata/images/hotel/max1024x768/373225701.jpg?k=398cb873f5263a89f7acfc58f1514470f73ac67c91780a01131dd7c79d18b0b8&o=&hp=1',
        },
      ],
    },
  },
];

describe('tracsaction testing', () => {
  it('should render correctly', () => {
    const component = render(
      <HashRouter>
        <Transaction bookings={bookings} />
      </HashRouter>
    );
    expect(component).toMatchSnapshot();
  });

  it('should render view details button', () => {});
});
