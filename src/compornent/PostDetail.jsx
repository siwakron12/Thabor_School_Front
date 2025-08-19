import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import HTMLReactParser from 'html-react-parser';
import PulseLoader from 'react-spinners/PulseLoader';




export default function PostDetail() {
    
    const { id } = useParams();
    const apiUrl = process.env.REACT_APP_API_URL;
    const [questions, setQuestions] = useState(null); // Initialize as null

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch(`${apiUrl}blogs/posts/${id}/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setQuestions(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors as needed
        }
    };
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() is zero-based
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }

    // Conditional rendering while waiting for data
    if (!questions) {
        return (
            <div>
                <Nav />
                <div className="  h-screen flex justify-center items-center ">
                <PulseLoader />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Nav />
            <div className=" w-full  p-2 lg:w-3/4 mx-auto">
                <div className="flex justify-between my-8">
                    <h1 className="text-4xl text-red-600">{questions.title}</h1>
                    <Link to="/BlogPage" className="text-2xl text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all rounded-xl p-2">ย้อนกลับ</Link>
                </div>
                <div className="w-full relative">
                    <p className="w-full border-gray-600 border-2 shadow-lg p-4">{HTMLReactParser(questions.content)}</p>

                    
                </div>


            </div>
            <div className="mt-auto">
            <Footer />
            </div>
           
        </div>
    );
}
