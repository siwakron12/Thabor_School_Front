import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../compornent/Footer';
import Nav from '../compornent/Nav';
import {Helmet} from "react-helmet";

export default function QuestionDetail() {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [text, setText] = useState("");
    const [user, setUser] = useState("");
  
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        fetchQuestion();
    }, [id]); 

    const fetchQuestion = async () => {
        try {
            const response = await fetch(`${apiUrl}qanda/question/${id}/`); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setQuestion(data); // Update state with fetched data
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors as needed
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const postData = {
            comment_content: text,
            author: user,
            question: id
        };

        fetch(`${apiUrl}qanda/comment/`, { // Adjust the endpoint as needed
            method: "POST",
            headers: {
              
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log("Comment successfully created:", data);
                // Optionally clear form fields or update the UI
                setText("");
                setUser("");
                fetchQuestion(); // Refresh the comments
            })
            .catch(error => {
                console.error("Error creating comment:", error);
                // Handle error
            });
    };

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() is zero-based
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='flex flex-col  min-h-screen'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>รายละเอียดคำถาม</title>
             
                </Helmet>
                <Nav />
                <div className="w-full p-2 lg:w-2/4 mx-auto">
                    <div className="mt-8 border-gray-200 border-2 rounded-xl p-2 shadow-lg h-full">
                        <h1 className="text-3xl">{question.title}</h1>
                        <p className="text-xl">{question.content}</p>
                        <p className="">
                            {formatDate(question.created_at)}
                        </p>
                        <div>

                            <ul>
                                {question.comments.map((comment, i) => (
                                    <li key={i} className="border-t border-gray-200 mt-4 pt-4">
                                        <p className="font-semibold">คุณ : {comment.author}</p>
                                        <p className='text-gray-700'>{comment.comment_content}</p>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                    <div className='mt-8'>
                        <form onSubmit={handleSubmit} className='flex flex-col space-y-2'>
                        <input
                                type="text"
                                placeholder='ชื่อผู้เขียน'
                                className='border-2 border-gray-600 p-2 rounded-lg'
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder='ตอบกลับข้อความ'
                                className='border-2 border-gray-600 p-2 rounded-lg'
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                           
                            <button type='submit' className='w-full p-2 md:w-1/4 hover:bg-green-600 hover:text-white border-2 border-green-600 text-green-600 rounded-lg'>
                                ตอบกลับ
                            </button>
                        </form>
                    </div>
                </div>
                <div className='mt-auto'>
                <Footer  />
                </div>
               
            </div>
        </>
    );
}
