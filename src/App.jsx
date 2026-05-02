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
        <div className='fixed inset-0 z-[9999] flex min-h-screen items-stretch justify-center bg-[#f7e7a8] px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-5'>
          <div className='relative flex h-[calc(100vh-1.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[30px] border border-white/50 bg-[#fff7d9] shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:h-[calc(100vh-2.5rem)]'>
            <button
              type='button'
              onClick={() => setIsPopupOpen(false)}
              className='absolute right-4 top-4 z-20 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-slate-700 shadow-lg transition hover:bg-white'
              aria-label='ปิด popup'
            >
              ปิด
            </button>

            <div className='grid flex-1 grid-rows-[auto_1fr] lg:grid-cols-[1.2fr_0.8fr] lg:grid-rows-none'>
              <section className='flex items-center justify-center bg-[#f2d985] p-5 sm:p-8 lg:p-10'>
                <div className='w-full max-w-3xl'>
                  <div className='overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_16px_40px_rgba(120,84,20,0.18)]'>
                    <img
                      src='https://www.nstda.or.th/agritec/wp-content/uploads/2024/05/Banner_%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%89%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%A1%E0%B8%87%E0%B8%84%E0%B8%A567-07_0-scaled.jpg'
                      alt='โรงเรียนบ้านท่าบ่อ'
                      className='h-full w-full object-contain'
                    />
                  </div>

                  <div className='mt-5 text-center text-[#6d4f1a]'>
                    <p className='font-thai text-sm font-semibold tracking-[0.35em] text-[#9a7728]'>
                      ประกาศจากโรงเรียน
                    </p>
                    <h2 className='mt-2 font-thai text-3xl font-bold sm:text-4xl'>
                      ยินดีต้อนรับสู่เว็บไซต์โรงเรียนบ้านท่าบ่อ
                    </h2>
                  
                  </div>
                </div>
              </section>

              <section className='flex items-center bg-[#fffaf0] p-5 sm:p-8 lg:p-10'>
                <form onSubmit={handlePopupSubmit} className='w-full'>
                  <div className='rounded-[28px] border border-[#ead9ab] bg-white px-5 py-6 shadow-[0_12px_30px_rgba(126,88,15,0.1)] sm:px-6 sm:py-7'>
                    <div className='mb-5 flex items-center justify-center'>
                      <div className='h-3 w-28 rounded-full bg-gradient-to-r from-transparent via-[#c9a34a] to-transparent' />
                    </div>

                    <div className='space-y-4'>
                      <div>
                        <label className='mb-2 block font-thai text-sm font-semibold text-[#7b5b20]'>
                          ชื่อ-สกุล
                        </label>
                        <input
                          type='text'
                          value={formData.name}
                          onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                          className='w-full rounded-2xl border border-[#dfc98f] bg-[#fffdf8] px-4 py-3 font-thai text-base text-slate-800 outline-none transition focus:border-[#c89a2a] focus:ring-4 focus:ring-[#f1d27a]/35'
                          placeholder='กรอกชื่อของคุณ'
                        />
                      </div>

                      <div>
                     
                    
                      </div>
                    </div>

                    <button
                      type='submit'
                      className='mt-6 w-full rounded-full bg-gradient-to-r from-[#f0b43b] to-[#d68b1f] px-5 py-3.5 font-thai text-lg font-bold text-white shadow-[0_10px_24px_rgba(214,139,31,0.35)] transition hover:brightness-105'
                    >
                     ส่ง
                    </button>
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
       
        />,
        <div className='mt-auto'>
          <Footer/>
          
        </div>

       
      </div>

    </>
  );
}

export default App;
