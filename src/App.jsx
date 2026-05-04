import React, { useEffect, useState } from 'react';
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
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    className: '',
  });

  const handlePopupSubmit = (event) => {
    event.preventDefault();
    setIsPopupOpen(false);
  };

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

      {isPopupOpen && (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-5 overflow-auto'>
          <div className='relative flex w-full max-w-6xl flex-col rounded-[30px] max-h-[90vh] sm:max-h-[80vh] overflow-auto'>
          

            <div className=''>
              <section className='flex items-center justify-center bg-[#f2d985] p-5 sm:p-8 lg:p-10'>
                <div className='w-full max-w-3xl'>
                  <div className='overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_16px_40px_rgba(120,84,20,0.18)]'>
                    <img
                      src='https://cdn.discordapp.com/attachments/1247903036920168539/1500818848868335626/Screenshot_2026-05-04_at_18.17.30.png?ex=69f9d1f9&is=69f88079&hm=1dc9c7c07db84d0adf5911a4b8ee3fe18b8732587590811fd272a91dbf1c6ab8&'
                      alt='โรงเรียนบ้านท่าบ่อ'
                      className='w-full h-auto  max-h-[60vh] '
                    />
                  </div>

                  <div className='mt-5 text-center text-[#6d4f1a]'>
                   
                    <h2 className='mt-2 font-thai text-3xl font-bold sm:text-4xl'>
                      ยินดีต้อนรับสู่เว็บไซต์โรงเรียนบ้านท่าบ่อ
                    </h2>

                  </div>
                </div>
              </section>

              <section className='flex items-center bg-[#fffaf0] p-5 sm:p-8 lg:p-10'>
                <form onSubmit={handlePopupSubmit} className='w-full'>
                  <div className='rounded-[28px] border border-[#ead9ab] bg-white px-5 py-6 shadow-[0_12px_30px_rgba(126,88,15,0.1)] sm:px-6 sm:py-7'>
                  

                    <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
                      <a href="https://forms.gle/njESQqyCnqMSiMJH6" target="_blank" rel="noopener noreferrer" className='w-full rounded-full bg-gradient-to-r from-[#f0b43b] to-[#d68b1f] px-5 py-3.5 font-thai text-lg font-bold text-white shadow-[0_10px_24px_rgba(214,139,31,0.35)] transition hover:brightness-105 text-center'>
                        ลงนามถวายพระพร
                      </a>

                      <button
                        type='submit'
                        className='w-full rounded-full bg-gradient-to-r from-[#f0b43b] to-[#d68b1f] px-5 py-3.5 font-thai text-lg font-bold text-white shadow-[0_10px_24px_rgba(214,139,31,0.35)] transition hover:brightness-105'
                      >
                        เข้าสู่เว็บไซต์
                      </button>
                    </div>

                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      )}

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

        />
        <div className='mt-auto'>
          <Footer />

        </div>


      </div>

    </>
  );
}

export default App;
