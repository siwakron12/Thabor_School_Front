
import { FaFacebookSquare } from "react-icons/fa";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaLine } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import Nav from "../compornent/Nav";
import Footer from "../compornent/Footer";
import {Helmet} from "react-helmet";
import { MdEmail } from "react-icons/md";
export default function ContactPage() {
    let [title, setTitle] = useState("");
    let [content, setContent] = useState("");
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [capVal, setCapVal] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    function onSubmit(e) {
        e.preventDefault();

        const formData = {
            topic: title,
            content: content,
            name: name,
            email: email,
            phonenumber: phoneNumber
        };

        fetch(`${apiUrl}formreport/send/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        setTitle("")
        setContent("")
        setName("")
        setEmail("")
        setPhoneNumber("")
        
    }

    return (
        <>
            <div className="font-thai">
            <Helmet>
                <meta charSet="utf-8" />
                <title>ช่องทางการติดต่อ</title>
             
            </Helmet>
                <Nav />
                <div className="lg:w-3/4 w-full mx-auto my-8 p-2">
                    <h1 className="lg:text-3xl text-xl text-red-600">ช่องทางการติดต่อ</h1>
                    <section>
                        <h1 className="text-2xl my-4 text-center">กรอกแบบฟอร์มติดต่อ/ร้องเรียน</h1>
                        <form action="" className="flex flex-col" onSubmit={onSubmit}>
                            <label>ติดต่อเรื่อง:</label>
                            <input
                                type="text"
                                value={title}
                                className="p-2 border-gray-600 border-2 rounded-md"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label>รายละเอียด:</label>
                            <textarea
                                value={content}
                                className="p-2 border-gray-600 border-2 rounded-md h-32"
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                            <div className="flex flex-col lg:w-1/4 w-full p-2 lg:mx-0 my-4">
                                <label>ชื่อ:</label>
                                <input
                                    type="text"
                                    value={name}
                                    className="p-2 border-gray-600 border-2 rounded-md"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label>อีเมล:</label>
                                <input
                                    type="email"
                                    value={email}
                                    className="p-2 border-gray-600 border-2 rounded-md"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label>เบอร์โทร:</label>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    className="p-2 border-gray-600 border-2 rounded-md"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <ReCAPTCHA
                                    className="mt-4"
                                    sitekey="6LelvBMqAAAAAF4cuDIrSnGCNinEz2jLua-3LEA7"
                                    onChange={(val) => setCapVal(val)}
                                />
                                <button
                                    disabled={!capVal}
                                    className="border-red-800 border-2 text-red-600 p-2 rounded-lg w-2/4 hover:bg-red-800 hover:text-white transition-all"
                                    type="submit"
                                >
                                    ส่งข้อมูล
                                </button>
                            </div>
                        </form>
                    </section>
                    <main className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 grid justify-items-center place-items-center">
                        <div className="mt-12 flex flex-col items-center">
                            <FaFacebookSquare className="text-7xl text-blue-800" />
                            <a href="https://www.facebook.com/profile.php?id=100057064105468" target="_blank"><p className="sm:text-xl">facebook : โรงเรียนบ้านท่าบ่อ</p></a>
                        </div>
                        <div className="mt-12 flex flex-col items-center">
                            <FaPhoneSquareAlt className="text-7xl text-green-500" />
                            <p className="sm:text-xl">เบอร์โทรศัพท์ : 092-5561991 ผอ.</p>
                            <p className="sm:text-xl">เบอร์โทรศัพท์ : 086-4887656 ธุรการ</p>
                        </div>
                        <div className="mt-12 flex flex-col items-center">
                            <MdEmail className="text-7xl text-red-400" />
                            <p className="sm:text-xl">gmail : bantaboschoolubon@gmail.com</p>
                        </div>
                    </main>
                </div>
                <div className="mt-12">
                    <iframe
                        className="w-full h-[450px]"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3849.152559666786!2d104.82794092839052!3d15.259473941064627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31168813494f87af%3A0xa560fa0a6dd15c17!2zN1I1SCtISlcg4LiV4Liz4Lia4LilIOC5geC4iOC4o-C4sOC5geC4oSDguK3guLPguYDguKDguK3guYDguKHguLfguK3guIfguK3guLjguJrguKXguKPguLLguIrguJjguLLguJnguLUg4Lit4Li44Lia4Lil4Lij4Liy4LiK4LiY4Liy4LiZ4Li1IDM0MDAw!5e0!3m2!1sth!2sth!4v1719325629317!5m2!1sth!2sth"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <Footer/>
            </div>
        </>
    );
}
