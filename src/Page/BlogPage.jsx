import { useEffect, useState } from "react";
import Footer from "../compornent/Footer";
import Nav from "../compornent/Nav";
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet";
import PulseLoader from 'react-spinners/PulseLoader';
export default function BlogPage() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [questions, setQuestions] = useState([]);  // Initialize as empty array
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);

    useEffect(() => {
        fetchQuestions();
    }, []);
        
    const fetchQuestions = async () => {
        try {
            const response = await fetch(`${apiUrl}blogs/posts/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors as needed
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() is zero-based
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);

    if (!questions.length) { // Check if questions array is empty
        return (
            <div>
                <Nav />
                <div className="justify-center h-screen flex items-center">
                    <PulseLoader color="rgba(255, 0, 0, 1)" />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="font-thai flex flex-col min-h-screen">
                <Helmet>
                <meta charSet="utf-8" />
                <title>ประชาสัมพันธ์</title>
             
                </Helmet>
            <Nav />
            <section className="p-2">
            <div className=" w-full lg:w-3/4 mx-auto">
                <h1 className=" text-xl lg:text-4xl text-red-600 mt-8">ประชาสัมพันธ์</h1>
            </div>
            <div className="lg:w-3/4 w-full mx-auto flex items-center flex-col space-y-4 mt-4">
                {currentItems.map((item) => (
                    <div key={item.id} className="bg-red-400 w-full rounded-md p-4">
                        <Link to={`Post/Detail/${item.id}`}>
                            <div className="bg-white text-black rounded-lg p-4 relative">
                                <h1 className="text-2xl">{item.title}</h1>
                                <p className="text-pretty">{item.description}</p>
                              
                            </div>
                        </Link>
                    </div>
                ))}

                <div>
                    <ul className="pagination flex space-x-4 mt-4">
                        {Array.from({ length: Math.ceil(questions.length / itemsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
                            <li key={pageNumber} className="">
                                <a href="#" className="border-red-600 text-red-600 p-3 border-2 rounded-md hover:bg-red-600 hover:text-white transition-all" onClick={() => paginate(pageNumber)}>
                                    {pageNumber}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            </section>

            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
