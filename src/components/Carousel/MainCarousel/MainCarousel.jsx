import React from 'react';
// Import Swiper styles
// import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';

import img1 from '../../../assets/images/CarouselMain/1.jpg';
import img2 from '../../../assets/images/CarouselMain/2.jpg';
import img3 from '../../../assets/images/CarouselMain/3.jpg';
import img4 from '../../../assets/images/CarouselMain/4.jpg';

const data = [
  {
    img: img1,
    title: 'Find your perfect place to stay',
  },
  {
    img: img2,
    title: 'Find your perfect place to stay',
  },
  {
    img: img3,
    title: 'Find your perfect place to stay',
  },
  {
    img: img4,
    title: 'Find your perfect place to stay',
  },
];

const MainCarousel = () => {
  return (
    <Swiper
      // install Swiper modules
      rewind={true}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <img src={item.img} />
          <h1>{item.title}</h1>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainCarousel;
