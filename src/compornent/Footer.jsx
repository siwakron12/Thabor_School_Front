import { useEffect, useState } from 'react';
import bor from '../img/thabor_logo.png';
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
export default function Footer() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [man, setMan] = useState([])
   
        useEffect(() => {
    
            fetchItem()
        }, []);
        const fetchItem = async () => {
            try {
                const response = await fetch(`${apiUrl}phonenumber-config/phonenumber/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch image names');
                }
                const data = await response.json();
                
                setMan(data)
    
            } catch (error) {
                console.error('Error fetching image names:', error);
            }
        };
    return <>
        <footer className=" bg-gradient-to-b from-gray-400 to-red-500  h-[250px] mt-20 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 justify-items-center content-center gap-2 relative bottom-0 w-full">
            <div className='flex items-center flex-col'>
                <img className='w-[80px] sm:w-[120px] ' src={bor} alt="" />
                <h1 className=' font-bold text-xl text-center text-white mt-4 sm:text-2xl'>โรงเรียนบ้านท่าบ่อ </h1>
                <h1 className='text-white'>สังกัดสำนักงานเขตพื้นที่การศึกษาประถมศึกษาอุบลราชธานี เขต 1</h1>
            </div>
            <div className='flex  flex-col text-white'>
                <h1 className='text-base font-bold md:text-xl lg:text-4xl'>BAN THA BOR</h1>
                <p className='sm:text-xs md:text-sm text-xs lg:text-lg'>
                โรงเรียนขยายโอกาสทางการศึกษา เลขที่ 132 หมู่ที่ 2 ต.แจระแม อ.เมืองอุบลราชธานี จ.อุบลราชธานี 34000
                   <br /> School for Expanding Educational Opportunities, No. 132 Village No. 2, Jaramae Subdistrict, Mueang Ubon Ratchathani District Ubon Ratchathani Province 34000 </p>
            </div>
            <div className='hidden lg:flex items-center flex-col text-white  space-y-6 text-sm md:text-xl justify-center '>
            <p className='flex space-x-2'><FaPhoneAlt className='text-base sm:text-2xl'/>  <span className=''>{man[0]?.phone_number } <span>({man[0]?.name_owner})</span> </span></p>
            <p className='flex space-x-2'><FaPhoneAlt className='text-base sm:text-2xl'/>  <span className=''>{man[1]?.phone_number} <span>({man[1]?.name_owner})</span> </span></p>
            <p className='flex'>< FaFacebookSquare className='text-base sm:text-2xl' /> <span className=''> <a href="https://www.facebook.com/profile.php?id=100057064105468 " target='_blank'>โรงเรียนบ้านท่าบ่อ</a></span> </p>
            <p className='flex ml-6'><MdEmail  className='text-base sm:text-2xl '/> <span className=''>bantaboschoolubon@gmail.com</span> </p>
               
            </div>

        </footer>
        <div className='w-full text-white bg-red-600 text-center text-xs sm:text-xs'>ลิขสิทธิ์ © 2567 โรงเรียนบ้านท่าบ่อ. สงวนลิขสิทธิ์.</div>
    </>

}