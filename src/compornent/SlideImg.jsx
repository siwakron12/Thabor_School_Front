import React, { useState, useEffect } from 'react';
import '@splidejs/react-splide/css';
import PulseLoader from 'react-spinners/PulseLoader';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SlideImg.css'; // Import the CSS file
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function SlideImg() {
  const [imageNames, setImageNames] = useState(undefined);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchImageNames = async () => {
    try {
      const response = await fetch(`${apiUrl}imageslide/getimg-slide/`);

      if (!response.ok) {
        throw new Error('Failed to fetch image names');
      }

      const names = await response.json();
      setImageNames(names);
    } catch (error) {
      console.error('Error fetching image names:', error);
    }
  };

  useEffect(() => {
    fetchImageNames();
  }, []);

  if (!imageNames) {
    return (
      <div className='h-[350px] w-full sm:h-[450px] lg:h-[700px] flex justify-center items-center'>
        <PulseLoader color="rgba(255, 0, 0, 1)" />
      </div>
    );
  }

  return (
  
      <Swiper
        className='h-[350px] w-full sm:h-[450px] lg:h-[650px] '
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {imageNames.map((item, index) => (
          <SwiperSlide key={index} className="">
            <img className='w-full h-full ' src={item.image} alt={`Slide ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
   
  );
}
