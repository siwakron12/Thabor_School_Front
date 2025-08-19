import React, { useState, useEffect, useRef } from 'react';
import bor from '../img/thabor_logo.png';
import { FaBars, FaArrowCircleLeft } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function Nav() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRefs = useRef({});

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (!Object.values(dropdownRefs.current).some(ref => ref && ref.contains(event.target))) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="w-full h-[15px] sm:h-[25px] bg-red-600 text-white hidden sm:block">
        <p className="text-base flex justify-center lg:ml-24 lg:block">
        โรงเรียนขยายโอกาสทางการศึกษา สังกัดสำนักงานเขตพื้นที่การศึกษาประถมศึกษาอุบลราชธานี เขต 1
        </p>
      </div>

      <nav className="w-full h-[85px] bg-gradient-to-r from-gray-300 to-red-400">
        <div className="mx-auto  lg:w-3/4 lg:flex lg:justify-between items-center h-[85px]">
          <div className=" flex items-center justify-center text-white font-bold pt-2">
            <Link to="/" className='flex items-center justify-center text-white font-bold '>
            <img src={bor} alt="" className="w-[70px] h-[70px]" />
            <p className="ml-4 text-xs md:text-xl text-pretty">
              โรงเรียนบ้านท่าบ่อ <br />
              <span className="ml-2">BAN THA BOR</span>
            </p>
            </Link>
            
            <p className="lg:hidden" onClick={toggleSidebar}>
              <FaBars className="ml-8 cursor-pointer hover:transition-all hover:text-red-700" />
            </p>
          </div>

          <ul className="hidden space-x-4 text-white font-semibold lg:flex">
            <li className="hover:text-gray-700 transition">
              <Link to="/" onClick={() => setOpenDropdown(null)}>หน้าแรก</Link>
            </li>
            <li className="hover:text-gray-700 transition">
              <Link to="/BlogPage" onClick={() => setOpenDropdown(null)}>ข่าวประชาสัมพันธ์</Link>
            </li>
            <li className="relative" ref={el => dropdownRefs.current.schoolInfo = el}>
              <button
                className="cursor-pointer flex items-center"
                onClick={() => toggleDropdown('schoolInfo')}
              >
                ข้อมูลโรงเรียน <IoIosArrowDown />
              </button>
              {openDropdown === 'schoolInfo' && (
                <ul className="absolute p-2 shadow bg-red-400 rounded-box w-52 z-10 space-y-4 text-base">
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md  ">
                    <Link to="/HistoryPage" onClick={() => setOpenDropdown(null)}>ประวัติโรงเรียน</Link>
                  </li>
                  
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md ">
                    <Link to="/TargetPage" className='' onClick={() => setOpenDropdown(null)}>วิสัยทัศน์/พันธกิจ/เป้าประสงค์</Link>
                  </li>
                  
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md ">
                    <Link to="/MusicPage" className='' onClick={() => setOpenDropdown(null)}>สัญลักษณ์/เพลง ประจำโรงเรียน</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md ">
                    <Link to="/Educationboard" className='' onClick={() => setOpenDropdown(null)}>คณะกรรมการสถานศึกษาขั้นพื้นฐาน</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md  ">
                    <Link to="/Studentcouncil" className='' onClick={() => setOpenDropdown(null)}>คณะกรรมการสภานักเรียน</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md ">
                    <Link to="/Personnelinform" className='' onClick={() => setOpenDropdown(null)}>ข้อมูลครูและบุคลากรทางการศึกษา</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="relative" ref={el => dropdownRefs.current.management = el}>
              <button
                className="cursor-pointer flex items-center"
                onClick={() => toggleDropdown('management')}
              >
                ฝ่ายบริหารเเละบุคลากร <IoIosArrowDown />
              </button>
              {openDropdown === 'management' && (
                <ul className="absolute p-2 shadow bg-red-400 rounded-box w-52 z-10">
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md">
                    <Link to="/ManagerPage" onClick={() => setOpenDropdown(null)}>ทำเนียบผู้บริหาร</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md">
                    <Link to="/PersonPage" onClick={() => setOpenDropdown(null)}>ทำเนียบบุคลากร</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md">
                    <Link to="/Student" onClick={() => setOpenDropdown(null)}>ข้อมูลนักเรียน</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md">
                    <Link to="/Service" onClick={() => setOpenDropdown(null)}>โครงสร้างบริการงาน</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="relative" ref={el => dropdownRefs.current.additional = el}>
              <button
                className="cursor-pointer flex items-center"
                onClick={() => toggleDropdown('additional')}
              >
                ส่วนเสริม <IoIosArrowDown />
              </button>
              {openDropdown === 'additional' && (
                <ul className="absolute p-2 shadow bg-red-400 rounded-box w-52 z-10 text-base">
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md">
                    <Link to="/Ita" onClick={() => setOpenDropdown(null)}>ITA Online</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md">
                    <Link to="/GalleryPage" onClick={() => setOpenDropdown(null)}>Picture Gallery</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md">
                    <Link to="/ContactPage" onClick={() => setOpenDropdown(null)}>ติดต่อเรา</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md">
                    <Link to="/Question" onClick={() => setOpenDropdown(null)}>กระทู้ตอบกลับ</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed bg-red-400 z-20 top-0 left-0 h-screen w-2/4 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <p className="absolute right-3 top-1 cursor-pointer text-white" onClick={toggleSidebar}>
          <FaArrowCircleLeft />
        </p>
        <div className="flex flex-col items-center">
          <img src={bor} alt="" className="w-[70px] h-[70px]" />
          <p className="text-white mt-4 font-bold">
            โรงเรียนบ้านท่าบ่อ <br />
            <span className="ml-2">BAN THA BOR</span>
          </p>
        </div>
        <div>
          <ul className="space-x-2 space-y-2 mt-4 text-white font-semibold text-sm lg:text-xl">
            <li className="hover:text-gray-700 transition ml-2">
              <Link to="/" onClick={() => setIsSidebarOpen(false)}>หน้าแรก</Link>
            </li>
            <li className="hover:text-gray-700 transition">
              <Link to="/BlogPage" onClick={() => setIsSidebarOpen(false)}>ข่าวประชาสัมพันธ์</Link>
            </li>
            <li className="relative" ref={el => dropdownRefs.current.sidebarSchoolInfo = el}>
              <button
                className="cursor-pointer flex items-center"
                onClick={() => toggleDropdown('sidebarSchoolInfo')}
              >
                ข้อมูลโรงเรียน <IoIosArrowDown />
              </button>
              {openDropdown === 'sidebarSchoolInfo' && (
                <ul className="absolute p-2 shadow bg-red-400 rounded-box w-52 z-10 space-y-4">
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md ">
                    <Link to="/HistoryPage" onClick={() => { setOpenDropdown(null); setIsSidebarOpen(false); }}>ประวัติโรงเรียน</Link>
                  </li>
                 
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md ">
                    <Link to="/TargetPage"className='text-sm' onClick={() => { setOpenDropdown(null); setIsSidebarOpen(false); }}>วิสัยทัศน์/พันธกิจ/เป้าประสงค์</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md ">
                    <Link to="/MusicPage"className='text-sm ' onClick={() => { setOpenDropdown(null); setIsSidebarOpen(false); }}>สัญลักษณ์/เพลง ประจำโรงเรียน</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md ">
                    <Link to="/Educationboard" className='text-sm' onClick={() => setOpenDropdown(null)}>คณะกรรมการสถานศึกษาขั้นพื้นฐาน</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md  ">
                    <Link to="/Studentcouncil" className='text-sm' onClick={() => setOpenDropdown(null)}>คณะกรรมการสภานักเรียน</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md ">
                    <Link to="/Personnelinform" className='text-sm' onClick={() => setOpenDropdown(null)}>ข้อมูลครูและบุคลากรทางการศึกษา</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="relative" ref={el => dropdownRefs.current.sidebarManagement = el}>
              <button
                className="cursor-pointer flex items-center"
                onClick={() => toggleDropdown('sidebarManagement')}
              >
                ฝ่ายบริหารเเละบุคลากร <IoIosArrowDown />
              </button>
              {openDropdown === 'sidebarManagement' && (
                <ul className="absolute p-2 shadow bg-red-400 rounded-box w-52 z-10">
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md">
                    <Link to="/ManagerPage" onClick={() => { setOpenDropdown(null); setIsSidebarOpen(false); }}>ทำเนียบผู้บริหาร</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md">
                    <Link to="/PersonPage" onClick={() => { setOpenDropdown(null); setIsSidebarOpen(false); }}>ทำเนียบบุคลากร</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md">
                    <Link to="/Student" onClick={() => { setOpenDropdown(null); setIsSidebarOpen(false); }}>ข้อมูลนักเรียน</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md">
                    <Link to="/Service" onClick={() => { setOpenDropdown(null); setIsSidebarOpen(false); }}>โครงสร้างบริการงาน</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="relative" ref={el => dropdownRefs.current.sidebarAdditional = el}>
              <button
                className="cursor-pointer flex items-center"
                onClick={() => toggleDropdown('sidebarAdditional')}
              >
                ส่วนเสริม <IoIosArrowDown />
              </button>
              {openDropdown === 'sidebarAdditional' && (
                <ul className="absolute p-2 shadow bg-red-400 rounded-box w-52 z-10">
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md">
                    <Link to="/Ita" onClick={() => { setOpenDropdown(null); setIsSidebarOpen(false); }}>ITA 2024</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md">
                    <Link to="/GalleryPage" onClick={() => { setOpenDropdown(null); setIsSidebarOpen(false); }}>Picture Gallery</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md">
                    <Link to="/ContactPage" onClick={() => { setOpenDropdown(null); setIsSidebarOpen(false); }}>ติดต่อเรา</Link>
                  </li>
                  <li className="hover:bg-gray-400 transition-all delay-50 rounded-md">
                    <Link to="/Question" onClick={() => setOpenDropdown(null)}>กระทู้ตอบกลับ</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
