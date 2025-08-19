import { useEffect, useState } from "react";
import Footer from "../compornent/Footer";
import Nav from "../compornent/Nav";
import {Helmet} from "react-helmet";

export default function Studentcouncill() {
    const [man, setMan] = useState(null); // State for PDF URL
    const [img, setImg] = useState([]); // State for images
    let [Id,setId] = useState()
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log(img)
    useEffect(() => {
        fetchImg();

    }, []);
    useEffect(() => {
        fetchItem();
      
    }, [Id]);

    const fetchItem = async () => {
        try {
            const response = await fetch(`${apiUrl}studentcouncil/servepdf/${Id}/`);
            if (!response.ok) {
                throw new Error('Failed to fetch PDF');
            }
            const data = await response // Parse JSON response
            console.log(data);
            setMan(data.url); // Assuming the response has a 'pdf' property for the PDF URL
        } catch (error) {
            console.error('Error fetching PDF:', error);
        }
    };

    const fetchImg = async () => {
        try {
            const response = await fetch(`${apiUrl}studentcouncil/uploads/`);
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            const data = await response.json(); // Parse JSON response
            setId(data[0].id)
            setImg(data); // Set `img` state directly with the array of images
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    return (
        <>
            <div className="font-thai">
            <Helmet>
                <meta charSet="utf-8" />
                <title>คณะกรรมการสภานักเรียน</title>
             
                </Helmet>
                <Nav />
                <div className="mx-auto mt-8 w-full lg:w-3/4 p-2">
                    <h1 className="text-red-600 text-3xl my-4">คณะกรรมการสภานักเรียน</h1>

                    {/* Display PDF */}
                    {man && (
                        <div className='w-full p-2 border-gray-600 border-2 '>
                            <iframe className="mt-4 w-full h-[600px] lg:h-[800px] " src={man}></iframe>
                            <a href={man} target="_blank" className="text-white bg-red-600 p-2 rounded-lg ">ดูเต็มหน้า</a>
                        </div>
                    )}

                    {/* Display Images */}
                    {img.length > 0 && (
                        <div className="mt-4 ">
                            {img.map((item) => (
                                <div key={item.id}>
                                   {item.images.map(photo=>
                                   <div className="w-full   border-gray-600 border-2 h-[850px]">
                                    <img className="w-full object-contain p-4 h-full" src={photo.image}></img>
                                   </div>
                                    
                                   ) }
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
}
