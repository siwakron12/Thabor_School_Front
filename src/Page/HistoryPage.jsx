import React, { useEffect, useState } from 'react';
import Nav from '../compornent/Nav';
import Footer from '../compornent/Footer';
import HTMLReactParser from 'html-react-parser';
import {Helmet} from "react-helmet";
import PulseLoader from 'react-spinners/PulseLoader';



export default function HistoryPage() {
    let[man,setMan] = useState()
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
       
        fetchItem()
    }, []);
    const fetchItem = async () => {
        try {
            const response = await fetch(`${apiUrl}schoolhistory/posts/`);
            if (!response.ok) {
                throw new Error('Failed to fetch image names');
            }
            const data = await response.json();
            console.log(data);
            setMan(data)

        } catch (error) {
            console.error('Error fetching image names:', error);
        }
    };
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // getUTCMonth() is zero-based
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    }
    if (!man) {
        return (
            <div>
                <Nav />
                <div className="w-3/4 mx-auto flex justify-center items-center mt-4 h-screen">
                <PulseLoader color="rgba(255, 0, 0, 1)"/>
                </div>
                <Footer />
            </div>
        );
    }
    return (
        <div className='font-thai min-h-screen flex flex-col '>
            <Helmet>
                <meta charSet="utf-8" />
                <title>ประวัติโรงเรียน</title>
             
                </Helmet>
             <Nav />
             
            <div className="w-full lg:w-3/4 mx-auto">
                <h1 className="text-4xl text-red-600 mt-4">ประวัติโรงเรียน</h1>
              {man.map(item=>(
                <div key={item.id} className='w-full p-2 border-gray-600 border-2 relative'>
                    <div>{HTMLReactParser(item.content)}</div>
                    <p className='absolute bottom-1 right-1'>{formatDate(item.created_at)} </p>
                </div>
              ))}
            </div>
            <div className='mt-auto'>
            <Footer />
            </div>
           
        </div>
    );
}
