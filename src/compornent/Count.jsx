import { useEffect, useState } from "react";
import { FaSchool } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import student1 from '../img/student1.png';
import student2 from '../img/student2.png';
import E1 from '../img/E1.jpg';
import E2 from '../img/E2.png';
import E3 from '../img/E3.png';
import E4 from '../img/E4.png';
import E5 from '../img/E5.png';
import E6 from '../img/E6.png';
import E7 from '../img/E7.png';
import E8 from '../img/E8.png';
import E9 from '../img/E9.jpg';
import E10 from '../img/E10.jpg';
import E11 from '../img/E11.jpg';
import E12 from '../img/E12.jpg';
import E13 from '../img/E13.jpg';
import E14 from '../img/E14.jfif';
import E15 from '../img/E15.png';
import E16 from '../img/E16.jpg';
import { FaArrowRightLong } from "react-icons/fa6";

let NewE = [
    {
        Url: E8,
        p: "ระบบข้อมูลการบริจาค",
        a: "https://epayapp.rd.go.th/rd-edonation/portal/for-donation-unit"
    },
    {
        Url: E4,
        p: "ระบบยื่นภาษีออนไลน์",
        a: "https://efiling.rd.go.th/rd-efiling-web/login"
    },
    {
        Url: E9,
        p: "DMC : ระบบจัดเก็บข้อมูลนักเรียนรายบุคคล",
        a: "https://portal.bopp-obec.info/obec66/auth/login"
    },
    {
        Url: E11,
        p: "ระบบสารสนเทสเพื่อบริหารการศึกษา",
        a: "https://www.moe.go.th/%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A%E0%B8%AA%E0%B8%B2%E0%B8%A3%E0%B8%AA%E0%B8%99%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9A%E0%B8%A3/"
    },
    {
        Url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4sPE_vz0IuvSkLxbmcVN1pyLNWWBYwFVciC_-Y7xZmvJ6ITUpVWSVavZJdt-U7SiNKp4&usqp=CAU",
        p: "ระบบรายงานสิ้งก่อสร้าง",
        a: "https://asset.bopp-obec.info/"
    },
    {
        Url: E16,
        p: "Thai school lunch",
        a: "https://www.thaischoollunch.in.th/"
    },
    {
        Url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDBch5w26Beu-ADZA0WKB3xIsjlyaz_tHiWg&s",
        p: "Catas : ระบบติดตามการใช้สารเสพติด",
        a: "https://www.catas.in.th/home/login"
    },
    {
        Url: "https://image3.slideserve.com/6583937/slide1-l.jpg",
        p: "Nispa : ระบบรายงานยาเสพติด",
        a: "https://nispa.nccd.go.th/2013/"
    },
    {
        Url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP1Mk4qP0HydcaXSpzV9L79-_D41ni6sAZgg&s",
        p: "ระบบนำเข้ากำลังพลด้านยาเสพติด",
        a: "https://www.nccd.go.th/index.php?mod=content_list&cate=278"
    },
    {
        Url: "https://www.kruchiangrai.net/wp-content/uploads/2023/02/%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A8%E0%B8%9C%E0%B8%A5%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%A1%E0%B8%B4%E0%B8%99-RT-%E0%B8%9B.1-NT-%E0%B8%9B.3-%E0%B8%9B%E0%B8%B5%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A8%E0%B8%B6%E0%B8%81%E0%B8%A9%E0%B8%B2-2565.jpg",
        p: "ระบบรายงานผลการสอบ RT(ป.1) และ NT(ป.3)",
        a: "http://180.180.244.45/RTScoring_Index.html"
    },
    {
        Url: E1,
        p: "E-Budget : ระบบงบประมาณ",
        a: "https://e-budget.jobobec.in.th/"
    },
    {
        Url: "https://s.isanook.com/ca/0/ud/274/1370931/download.jpg",
        p: "O-NET : เว็บสทศ.รายงานผลสอบO-NET",
        a: "https://www.niets.or.th/th/"
    },
    {
        Url: E2,
        p: "AMSS : ระบบสารบรรณอิเล็กทรอนิกส์",
        a: "http://110.77.131.109/amssplus_2565/"
    },
    {
        Url: E13,
        p: "EGP : ระบบจัดซื้อจัดจ้างภาครัฐ",
        a: "http://www.gprocurement.go.th/new_index.html"
    },
    {
        Url: "https://cdn.pixabay.com/photo/2024/04/14/10/07/disabled-person-8695133_1280.png",
        p: "SET : ระบบ SET ข้อมูลนักเรียนพิการ",
        a: "http://specialbasic.specialset.bopp.go.th/specialbasic/"
    },
    {
        Url: "https://www.kruachieve.com/wp-content/uploads/2022/04/CCAE075B-F258-4557-AC07-A065EC3AE0F6.png",
        p: "School MIS : ระบบบริหารจัดการโรงเรียน",
        a: "https://a6702.obec.expert/authen/login"
    },
    {
        Url: "https://www.sesaonkp.go.th/wp-content/uploads/2021/12/%E0%B8%9B%E0%B8%B8%E0%B9%88%E0%B8%A1-%E0%B8%9B%E0%B8%9E3-%E0%B8%AD%E0%B8%AD%E0%B8%99%E0%B9%84%E0%B8%A5%E0%B8%99%E0%B9%8C.png",
        p: "ปพ.3 ออนไลน์",
        a: "https://www.obec.go.th/%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A%E0%B8%87%E0%B8%B2%E0%B8%99"
    },
    {
        Url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkOTL_edGbJ3dYzLFZegyLxaQSPnN3khjKXg&s",
        p: "CONNEXT ED : โรงเรียนคอนเน็กซ์อีดี",
        a: "https://www.niets.or.th/th/"
    },
  
   
    
   
   
   
   
  
    
]
// let Eservice = [
//     {
//         Url: E1,
//         p: "E-Budget",
//         a: "https://e-budget.jobobec.in.th/"
//     },
//     {
//         Url: E2,
//         p: "AMSS",
//         a: "http://110.77.131.109/amssplus_2565/"
//     },
//     {
//         Url: E3,
//         p: "ร้องเรียนเรื่องทั่วไป",
//         a: "https://docs.google.com/forms/d/e/1FAIpQLSfIMjueY5eXq0mzSdQSHs7lu-J2_I7HM1f4kXCZz9zkibyTxw/viewform"
//     },
//     {
//         Url: E4,
//         p: "ร้องเรียนการทุจริตและประพฤติมิชอบ",
//         a: "https://docs.google.com/forms/d/e/1FAIpQLSeYtEbrtpYDcVxlP2LXFCK7zSjxEmZZxVjGFLxPKZP4A2J9Mw/viewform"
//     },
//     {
//         Url: E5,
//         p: "Project 14",
//         a: "https://proj14.ipst.ac.th/"
//     },
//     {
//         Url: E6,
//         p: "DLTV",
//         a: "https://www.dltv.ac.th/"
//     },
//     {
//         Url: E7,
//         p: "OBEC Content Center",
//         a: "https://e-budget.jobobec.in.th/"
//     },
//     {
//         Url: E8,
//         p: "ข้อมูลนักเรียนรายบุคคล",
//         a: "https://schoolhealthhero.obec.go.th/"
//     },
//     {
//         Url: E9,
//         p: "ข้อมูลสิ่งก่อสร้าง",
//         a: "https://bobec.bopp-obec.info/form_login.php"
//     },
//     {
//         Url: E10,
//         p: "ระบบสารสนเทศเพื่อการบริหาร",
//         a: "https://data.bopp-obec.info/emis/"
//     },
//     {
//         Url: E11,
//         p: "ระบบสารสนเทศเพื่อการบริหาร",
//         a: "https://selfservice.ksp.or.th/ksp-esv/index.jbx"
//     },
//     {
//         Url: E12,
//         p: "คุรุสภา",
//         a: "https://selfservice.ksp.or.th/ksp-esv/index.jbx"
//     },
//     {
//         Url: E13,
//         p: "ระบบจัดซื้อจัดจ้างภาครัฐ",
//         a: "http://www.gprocurement.go.th/new_index.html"
//     },
//     {
//         Url: E14,
//         p: "ระบบบริหารจัดการโรงเรียนเรียนรวม",
//         a: "http://www.specialset.bopp.go.th/set_index/index.php"
//     },
//     {
//         Url: E15,
//         p: "ระบบวัดแววความสามารถพิเศษ",
//         a: "https://mi-test.obec.go.th/"
//     },
//     {
//         Url: E16,
//         p: "ระบบแนะนำสำรับอาหารกลางวันนักเรียน",
//         a: "https://www.thaischoollunch.in.th/"
//     },

// ]

export default function Count() {
    let [man, setMan] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchItem();
    }, []);

    const fetchItem = async () => {
        try {
            const response = await fetch(`${apiUrl}personnelcount/setcount/`);
            if (!response.ok) {
                throw new Error('Failed to fetch image names');
            }
            const data = await response.json();
            console.log(data);
            setMan(data);
        } catch (error) {
            console.error('Error fetching image names:', error);
        }
    };

    return (
        <div className="px-2">
            <div className="w-full lg:w-3/4 mx-auto bg-gray-500 h-full lg:my-8 rounded-lg p-2">
                <div className="bg-white p-2 m-2">
                    <main className="grid grid-cols-3">
                        <div className="flex flex-col items-center">
                            <PiStudentBold className="text-red-600 text-4xl sm:text-6xl lg:text-8xl" />
                            <p className="text-center">จำนวนนักเรียน</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <GiTeacher className="text-red-600 text-4xl sm:text-6xl lg:text-8xl" />
                            <p className="text-center">จำนวนคุณครู</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <FaSchool className="text-red-600 text-4xl sm:text-6xl lg:text-8xl" />
                            <p className="text-center">จำนวนห้องเรียน</p>
                        </div>
                    </main>
                    <div className="">
                        {man.map(item => (
                            <div className="grid grid-cols-3 justify-items-center" key={item.id}>
                                <p>{item.studentcount}</p>
                                <p>{item.teachercount}</p>
                                <p>{item.classroomcount}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-2xl mt-8 font-bold">ระดับชั้นที่เปิดสอน</p>
                    <div className="flex justify-center items-center mt-4">
                        <img src={student1} className="w-28 h-28" alt="" />
                        <FaArrowRightLong className="w-56 text-5xl" />
                        <img src={student2} className="w-28 h-28" alt="" />
                    </div>
                    <p className="text-center mt-8">ชั้นอนุบาล 2 - ชั้นมัธยมศึกษาชั้นปี่ที่ 3</p>
                </div>
            </div>
            <section className="mt-24 mx-auto w-full p-2 lg:w-3/4 text-center">
                <h1 className="text-2xl ">บริการออนไลน์ E-Service</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center mt-8">
                    {NewE.map((item, index) => (
                        <a href={item.a} key={index} className="" target="_blank">
                            <div className="flex flex-col items-center">
                                <img src={item.Url}  className="w-48 h-48 object-contain" alt={item.p} />
                                <p className="text-center text-base sm:text-xl lg:text-2xl mt-2 text-balance">{item.p}</p>
                            </div>
                        </a>
                    ))}
                </div>

            </section>
        </div>
    );
}
