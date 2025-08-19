import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Nav from './compornent/Nav';
import SlideImg from './compornent/SlideImg.jsx';
import Post from './compornent/Post.jsx';
import ActivityImg from './compornent/ActivityImg.jsx';
import Count from './compornent/Count.jsx';
import SoloImg from './compornent/SoloImg.jsx';
import Footer from './compornent/Footer.jsx';
import { Helmet } from "react-helmet";

import MessengerCustomerChat from 'react-messenger-customer-chat';
function App() {
  useEffect(() => {
    AOS.init({
      // Global settings
      offset: 120,
      delay: 100,
      duration: 400,
      easing: 'ease',
      once: false,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
  }, []);
  AOS.init()
  return (
    <>

<Helmet>
  <meta charSet="utf-8" />
  <title>โรงเรียนบ้านท่าบ่อ โรงเรียนขยายโอกาสทางการศึกษา สังกัดสำนักงานเขตพื้นที่การศึกษาประถมศึกษาอุบลราชธานี เขต 1</title>
  

  <meta name="description" content="โรงเรียนบ้านท่าบ่อ เป็นโรงเรียนขยายโอกาสทางการศึกษาในจังหวัดอุบลราชธานี ที่เน้นการเรียนรู้ที่มีคุณภาพและการพัฒนานักเรียนให้เป็นผู้นำในอนาคต" />
  <meta name="keywords" content="โรงเรียนบ้านท่าบ่อ, ขยายโอกาส, การศึกษา, อุบลราชธานี, การพัฒนาเด็ก, โรงเรียนประถมศึกษา" />
  <meta name="author" content="โรงเรียนบ้านท่าบ่อ" />
  <meta name="robots" content="index, follow" />

  
  <meta property="og:title" content="โรงเรียนบ้านท่าบ่อ - ขยายโอกาสทางการศึกษาในอุบลราชธานี" />
  <meta property="og:description" content="โรงเรียนบ้านท่าบ่อมุ่งเน้นการให้การศึกษาที่มีคุณภาพแก่เด็กนักเรียนในพื้นที่ และการพัฒนาศักยภาพของนักเรียนในทุกด้าน" />
  <meta property="og:image" content="https://thabor.ac.th/static/media/thabor_logo.7cd6e4fbcfc1baf12e63.png" />
  <meta property="og:url" content="https://thabor.ac.th/" />
  <meta property="og:type" content="website" />

 
 
</Helmet>

      <div className='font-thai flex flex-col min-h-screen' >
        
        <Nav />
        <SlideImg />

        <div data-aos="fade-down" className='mt-28'>
          <Post />
        </div>
        <div data-aos="fade-right" className='my-28'>
          <ActivityImg />
        </div>
        <div data-aos="zoom-in-up">
          <Count />
        </div>
        <div data-aos="fade-up">
          <SoloImg />
        </div>
        <MessengerCustomerChat
          pageId="100057064105468"
          appId="495279939819580"
       
        />,
        <div className='mt-auto'>
          <Footer/>
          
        </div>

       
      </div>

    </>
  );
}

export default App;
