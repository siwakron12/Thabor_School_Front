import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../compornent/Footer";
import Nav from "../compornent/Nav";
import {Helmet} from "react-helmet";

export default function NewQ() {
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [authorName, setAuthorName] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL;
    let token = localStorage.getItem("token")
    const handleSubmit = (e) => {
        e.preventDefault();

        const postData = {
            title: title,
            content: question,
            author: authorName
        };

        fetch(`${apiUrl}qanda/question/`, {
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
            console.log("Post successfully created:", data);
            // Optionally redirect or show success message
            setTitle("")
            setQuestion("")
            setAuthorName("")
        })
        .catch(error => {
            console.error("Error creating post:", error);
            // Handle error
        });
    };

    return (
        <>
            <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>ตั้งคำถาม</title>
             
                </Helmet>
                <Nav />
                <div className="w-full p-2 lg:w-3/4 mx-auto">
                    <div className="mt-4">
                        <Link to="/Question" className="hover:bg-red-600 transition-all cursor-pointer hover:text-white text-xl text-red-700 p-1 border-red-600 border-2 rounded-xl">
                            ย้อนกลับ
                        </Link>
                    </div>
                    <h1 className="mt-8 text-3xl">สร้างโพสต์ของคุณ</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-2 border-red-600 rounded-xl p-4 border-4 mt-8">
                        <input type="text" placeholder="หัวข้อ" className="p-2 border-2 border-black rounded-lg w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <textarea placeholder="ตั้งคำถามเลย" className="p-2 border-2 w-full h-36 border-black rounded-lg" value={question} onChange={(e) => setQuestion(e.target.value)}></textarea>
                        <input type="text" placeholder="ชื่อผู้เขียน" className="p-2 border-2 border-black rounded-lg w-full" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
                        <button type="submit" className="border-green-600 border-2 text-green-600 hover:bg-green-600 transition-all hover:text-white p-2 rounded-xl w-1/4">
                            สร้างโพสต์
                        </button>
                    </form>
                </div>
                <Footer />
            </div>
        </>
    );
}
