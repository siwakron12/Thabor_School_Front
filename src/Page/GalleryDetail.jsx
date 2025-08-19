import React, { useEffect, useState } from 'react';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import "./gallery.css"
import Nav from '../compornent/Nav';
import Footer from '../compornent/Footer';
import { useParams } from 'react-router-dom';
import {Helmet} from "react-helmet";
import PulseLoader from 'react-spinners/PulseLoader';
export default function GalleryDetail() {
    const { id } = useParams();
    const [albums, setAlbums] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log(albums)
    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        try {
            const response = await fetch(`${apiUrl}photoalbums/albums/${id}/`);
            if (!response.ok) {
                throw new Error('Failed to fetch albums');
            }
            const data = await response.json();
            // Assuming data is expected to be an array of albums
            setAlbums([data]); // This assumes data is an array of albums
        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    };

    const onInit = () => {
        console.log('LightGallery initialized');
    };
    if (!albums) {
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
        <div className="font-thai min-h-screen flex flex-col">
            <Helmet>
                <meta charSet="utf-8" />
                <title>รูปภาพกิจกรรมทั้งหมด</title>
             
                </Helmet>
            <Nav />

            <div className="lg:w-3/4 mx-auto mt-8 w-full ">
                <div>
                    {albums.map(album => (
                        <div key={album.id}>
                            <h1 className='text-2xl text-red-600'>กิจกรรม : {album.title}</h1>
                            <LightGallery
                                onInit={onInit}
                                speed={500}
                                plugins={[lgThumbnail]}
                                elementClassNames="custom-lightgallery"
                                autoplayFirstVideo={false}
                                thumbnail={true}
                                pager={false}
                            >
                                {album.photos.map(photo => (
                                    <a key={photo.id} href={photo.image}>
                                        <img src={photo.image} className='lg:w-56' alt={album.description} />
                                    </a>
                                ))}
                            </LightGallery>
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
