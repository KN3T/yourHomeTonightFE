import React from 'react';
// Import Swiper styles
// import Swiper core and required modules
import { Autoplay, EffectCoverflow, Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';

import img1 from '../../../assets/images/CarouselMain/1.jpg';
import img2 from '../../../assets/images/CarouselMain/2.jpg';
import img3 from '../../../assets/images/CarouselMain/3.jpg';
import img4 from '../../../assets/images/CarouselMain/4.jpg';
import Button from '../../Button/Button';
import './index.scss';

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
      modules={[Navigation, Autoplay, EffectCoverflow]}
      className="carousel__wrapper"
      autoplay={{ delay: 1500 }}
      navigation
      grabCursor={true}
      effect="coverflow"
      loop="infinite"
    >
      {data.map((item, index) => (
        <SwiperSlide className="carousel__item" key={index}>
          <div
            style={{ backgroundImage: `url(${item.img})` }}
            className="carousel__image__wrapper"
          >
            <div className="carousel__content__wrapper">
              <h1>{item.title}</h1>
              <Button text="Book now" />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainCarousel;
