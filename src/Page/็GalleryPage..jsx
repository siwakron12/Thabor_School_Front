
import { FaDove } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Nav from '../compornent/Nav';
import Footer from '../compornent/Footer';
import { useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import PulseLoader from 'react-spinners/PulseLoader';
const apiUrl = process.env.REACT_APP_API_URL;

const GalleryPage = () => {
    const [albums, setAlbums] = useState(undefined);
    console.log(albums)

    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        try {
            const response = await fetch(`${apiUrl}photoalbums/albums/`);
            if (!response.ok) {
                throw new Error('Failed to fetch albums');
            }
            const data = await response.json();
            setAlbums(data);
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };

    if(!albums){
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
        <div className="font-thai flex flex-col min-h-screen">
            <Helmet>
                <meta charSet="utf-8" />
                <title>รูปภาพกิจกรรมทั้งหมด</title>
             
                </Helmet>
            <Nav/>
            <div className="lg:w-3/4 mx-auto mt-8 w-full  ">
            <h1 className='text-red-600 text-2xl my-4'>รูปภาพกิจกรรมทั้งหมด</h1>
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center p-3'>
                {albums.map(album=>(
                    <div key={album.id} className='bg-red-700 p-6 rounded-md h-full w-full' >
                        
                    <Link to={`/GalleryPage/GalleryDetail/${album.id}`} >
                    <img src={album.cover_img} className='h-fit w-full object-cover' alt="" />
                    <p className=' my-4 text-white text-xl lg:text-xl'>กิจกรรม :{album.title}</p>
                    
                    </Link>
                       
                    </div>
                    
                    
                ))}
                    
                </div>
            </div>
            <div className='mt-auto'>
            <Footer />
            </div>
          
        </div>
    );
};

export default GalleryPage;

