import { Link } from "react-router-dom";

export default function Asid() {
  return (
    <aside className="text-black border-2 border-black h-screen w-[300px] text-center">
      <h1 className="text-center text-4xl font-bold">ADMIN</h1>
      <div className="w-full space-y-2 mt-4">
        <Link
          to="/AdminSlide"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          รูปภาพslide (หน้าแรก)
        </Link>
        <Link
          to="/AdminBlog"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          ประชาสัมพันธ์
        </Link>
        <Link
          to="/AdminGallery"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          รูปภาพกิจกรรม (หน้าแรก)
        </Link>
        <Link
          to="/AdminManager"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          ทำเนียบผู้บริหารโรงเรียน
        </Link>
        <Link
          to="/AdminPerson"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          ทำเนียบบุคลากร
        </Link>
        <Link
          to="/AdminStudent"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          ข้อมูลนักเรียน
        </Link>
        <Link
          to="/AdminWork"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          โครงสร้างงานบริหาร
        </Link>
        <Link
          to="/AdminQuestion"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          Question
        </Link>
        <Link
          to="/AdminHistory"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          ประวัติโรงเรียน
        </Link>
        <Link
          to="/AdminTarget"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          วิสัยทัศน์
        </Link>
        <Link
          to="/AdminSymbol"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          สัญลักษณ์/เพลง ประจำโรงเรียน
        </Link>
        <Link
          to="/AdminDirector"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          รูปผู้อำนวยการ (หน้าแรก)
        </Link>
        <Link
          to="/AdminCount"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          จำนวนนักเรียน/ห้องเรียน/คุณครู (หน้าแรก)
        </Link>
        <Link
          to="/AdminSoloImg"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          รูปภาพสุดท้าย(หน้าแรก)
        </Link>
        <Link
          to="/AdminIta"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          ITA
        </Link>
        <Link
          to="/AdminEducationboard"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          คณะกรรมการสถานศึกษาขั้นพื้นฐาน
        </Link>
        <Link
          to="/AdminStudentcouncil"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          คณะกรรมการสภานักเรียน
        </Link>
        <Link
          to="/AdminPersonnelinform"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          ข้อมูลครูและบุคลากรทางการศึกษา
        </Link>
        <Link
          to="/AdminConfig"
          className="bg-red-500 w-full block text-white hover:bg-red-700 active:bg-red-900"
        >
          เบอร์มือถือ
        </Link>
      </div>
    </aside>
  );
}
