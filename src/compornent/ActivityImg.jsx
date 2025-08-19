import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';

export default function ActivityImg() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [man, setMan] = useState(null)
    useEffect(() => {

        fetchItem()
    }, []);
    const fetchItem = async () => {
        try {
            const response = await fetch(`${apiUrl}photoalbums/albums/`);
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
    return <>


        <div className='mt-4 mx-auto w-full  lg:w-3/4 p-4'>
            <h1 className='text-2xl text-red-600 my-4 ml-2'>รูปภาพกิจกรรม</h1>
            {man ? (<Splide options={{
                type: 'loop',
                perPage: 3,
                perMove: 1,
                gap: 7
            }} >
                {man.map(item => (

                    <SplideSlide key={item.id} className="h-[325px] w-full  sm:h-[225px] lg:h-[350px] group/item relative">
                        <Link key={item.id} to={`/GalleryPage/GalleryDetail/${item.id}`} > <img className='w-full object-cover   rounded-md h-full  hover:sepia hover:ease-in-out duration-200  ' src={item.cover_img} alt="" /></Link>
                        <p className='text-sm    lg:text-xl w-full bg-gray-500 rounded-lg  group/edit
 group-hover/item:visible invisible  text-white absolute bottom-0 flex items-center justify-center'>
                            {item.title}</p>
                    </SplideSlide>
                ))}



            </Splide>) : (<div className='text-center'>

                <PulseLoader color="rgba(255, 0, 0, 1)" />

            </div>)}



            <div className='mt-8 w-2/4 mx-auto'>
                <div className='flex justify-center'>
                    <Link to="/GalleryPage" className='text-sm md:text-2xl text-white p-2 bg-red-600 rounded-xl hover:transition-all hover:bg-gray-600 '>รูปภาพกิจกรรมทั้งหมด</Link>
                </div>

            </div>
        </div >
    </>
}