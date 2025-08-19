import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../compornent/Footer';
import Nav from '../compornent/Nav';
import {Helmet} from "react-helmet";
<Helmet>
                <meta charSet="utf-8" />
                <title>ประชาสัมพันธ์</title>
             
                </Helmet>
export default function Question() {
    const [questions, setQuestions] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        fetchQuestions();
    }, []); // Empty dependency array means this effect runs only once after the initial render

    const fetchQuestions = async () => {
        try {
            const response = await fetch(`${apiUrl}qanda/question/`); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setQuestions(data); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors as needed
        }
    };

    return (
        <>
            <div className='flex flex-col min-h-screen'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>กระทู้ตอบกลับ</title>
             
                </Helmet>
                <Nav />
                <div className="w-3/4 mx-auto">
                    <div className="flex justify-between mt-8">
                        <h1 className="text-3xl text-red-600">กระทู้ตอบกลับ</h1>
                        <Link to="/Question/NewQ">
                            <p className="hover:bg-red-600 transition-all cursor-pointer hover:text-white text-xl text-red-700 p-1 border-red-600 border-2 rounded-xl">
                                สร้างโพสต์ใหม่
                            </p>
                        </Link>
                    </div>
                    <div>
                        {questions.map((question) => (
                            <div key={question.id} className="mt-4 border border-gray-200 p-4 rounded-xl shadow-lg">
                                <h2 className="text-lg font-semibold">{question.title}</h2>
                                <p className="text-gray-600">{question.content}</p>
                                <Link to={`/Question/Detail/${question.id}`} className="text-blue-500 hover:underline">
                                   ตอบกลับข้อความ
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='mt-auto'>
                <Footer />
                </div>
              
            </div>
        </>
    );
}
