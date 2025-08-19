import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { GoLinkExternal } from "react-icons/go";
import PulseLoader from 'react-spinners/PulseLoader';

export default function Post() {
    const [items, setItems] = useState([]);
    const [man, setMan] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchImageNames = async () => {
        try {
            const response = await fetch(`${apiUrl}blogs/posts/`);
            if (!response.ok) {
                throw new Error('Failed to fetch image names');
            }
            const data = await response.json();
            console.log(data);
            setItems(data);
        } catch (error) {
            console.error('Error fetching image names:', error);
        }
    };

    const fetchItem = async () => {
        try {
            const response = await fetch(`${apiUrl}director-imageslide/getimg/`);
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

    useEffect(() => {
        fetchImageNames();
        fetchItem();
    }, []);

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() is zero-based
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div className='w-full mx-auto lg:w-3/4 lg:mt-12 flex flex-col lg:flex-row md:flex items-center'>
            <div className='bg-red-500 w-full h-full p-2 rounded-xl sm:p-4 lg:mx-4'>
                <Link to="/BlogPage">
                    <div className='bg-white rounded-lg p-2 w-3/6 flex justify-center items-center cursor-pointer text-red-600 font-bold hover:transition-all hover:bg-red-600 hover:text-white sm:w-2/6'>
                        <h1 className='mx-4'>ประชาสัมพันธ์</h1>
                        <GoLinkExternal className='text-xl ' />
                    </div>
                </Link>
                <main className='mt-6 space-y-4'>
                    {items.length > 0 ? (
                        <div>
                            {items.slice(0, 5).map(item => (
                                <div key={item.id} className='mt-4 bg-white rounded-lg w-full p-4 sm:p-6 relative'>
                                    <Link to={`/BlogPage/Post/Detail/${item.id}`}>
                                        <h1 className='text-2xl sm:text-4xl'>{item.title}</h1>
                                        <p>{item.description}</p>
                                       
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center mt-4">
                            <PulseLoader />
                        </div>
                    )}
                    <div className='flex justify-center'>
                        <Link to="/BlogPage" className='text-white hover:text-gray-600 transition-all'>view all</Link>
                    </div>
                </main>
            </div>
            <div className='lg:w-[450px] w-[250px] sm:w-[300px] rounded-lg mt-12 lg:mt-12'>
                {man.length < 2 ? (
                    man.map(item => (
                        <div className="w-full h-[250px] relative flex flex-col items-center lg:h-[450px]" key={item.name}>
                            <img className='w-full h-full rounded-lg object-contain transition-all backdrop-blur-none' src={item.image} alt="Sample" />
                            <p className='mt-2 text-base font-bold text-center text-black'>{item.name}</p>
                        </div>
                    ))
                ) : (
                    <Splide options={{ type: 'loop', pagination: false }}>
                        {man.map(item => (
                            <SplideSlide className="w-full h-full flex flex-col items-center" key={item.name}>
                                <img className='p-2 w-full rounded-lg transition-all backdrop-blur-none' src={item.image} alt="Sample" />
                                <p className='text-center text-xl text-black'>{item.name}</p>
                            </SplideSlide>
                        ))}
                    </Splide>
                )}
            </div>
        </div>
    );
}
