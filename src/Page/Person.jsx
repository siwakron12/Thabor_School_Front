import { useEffect, useState } from "react";
import Footer from "../compornent/Footer";
import Nav from "../compornent/Nav";
import man from "../img/man.jpg"; // Fallback image in case profile_img is missing
import {Helmet} from "react-helmet";
import PulseLoader from 'react-spinners/PulseLoader';
export default function PersonPage() {
    let [persons, setPersons] = useState(null);
    console.log(persons);
    useEffect(() => {
        fetchPersons();
    }, []);

  
    const apiUrl = process.env.REACT_APP_API_URL;
    const fetchPersons = async () => {
        try {
            const response = await fetch(`${apiUrl}personnel/category/`, {
                
            });

            if (!response.ok) {
                throw new Error('Failed to fetch persons');
            }

            const data = await response.json();
            setPersons(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching persons:', error);
     
        }
    };
    if (!persons) {
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
        <div className="font-thai">
            <Helmet>
                <meta charSet="utf-8" />
                <title>ทำเนียบบุคลากร</title>
             
                </Helmet>
            <Nav />
            <div className="w-full lg:w-3/4 mx-auto mt-8 p-2">
                <h1 className="text-red-600 text-4xl">ทำเนียบบุคลากร</h1>
                {persons.map((person, index) => (
                    <div key={index}>
                        <p className="my-4 text-2xl">{person.category_name}</p>
                        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-4 lg:gap-8">
                            {person.category_personnal.map((personnel, i) => (
                                <div key={i} className="bg-red-400 w-full h-auto rounded-lg flex justify-center p-4">
                                    <div className="text-white text-center lg:text-left">
                                        <img className="rounded-lg h-64 w-full mb-4" src={personnel.profile_img || man} alt={`${personnel.first_name} ${personnel.last_name}`} />
                                        <p className="leading-normal text-base lg:text-xl">ชื่อ: {personnel.personnal_name}</p>
                                        <p className="text-base lg:text-xl">ตำแหน่ง: <span>{personnel.rank}</span></p>
                                    </div>
                                </div>
                            ))}
                        </main>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}
