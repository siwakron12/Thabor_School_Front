import { useEffect, useState } from "react";
import Footer from "../compornent/Footer";
import Nav from "../compornent/Nav";
import man from "../img/man.jpg"
import {Helmet} from "react-helmet";
import PulseLoader from 'react-spinners/PulseLoader';

export default function ManagerPage() {
    let [person, SetPerson] = useState()
    useEffect(() => {
        fetchFiles();
    }, []);
    const apiUrl = process.env.REACT_APP_API_URL;
    const fetchFiles = async () => {
        try {
            const response = await fetch(`${apiUrl}director/directorlist/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            SetPerson(data)

        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };
    if (!person) {
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
    return <>
        <div className="font-thai flex flex-col ">
        <Helmet>
                <meta charSet="utf-8" />
                <title>ทำเนียบผู้บริหารโรงเรียน</title>
             
                </Helmet>
            <Nav />
            <div className="mt-8  w-full lg:w-3/4 mx-auto p-2">
                <h1 className="lg:text-4xl text-red-600 text-xl">ทำเนียบผู้บริหารโรงเรียน</h1>
                <div className=" w-full sm:w-5/6mx-auto mt-4 ">
                    <div className=" h-[45px] place-items-center text-xl text-white bg-red-500 grid grid-cols-4 justify-items-center">
                        <p>ลำดับที่</p>
                        <p>ชื่อสกุล</p>
                        <p>พ.ศ.</p>
                        <p>รูปภาพ</p>
                    </div>
                    <div className="space-y-4 mt-4">
                        {person.map((person,index) => (
                            <section key={index} className=" text-base lg:text-xl text-white bg-red-300 grid grid-cols-4 justify-items-center place-items-center ">
                                <p>{index+1}</p>
                                <p className="p-2 text-center text-xs sm:text-xl sm:text-start text-balance">{person.name}</p>
                                <p>{person.startdate}-{person.enddate}</p>
                                <img src={person.profile} className="w-[100px] h-full object-contain" alt="" />

                            </section>
                        ))}

                      

                    </div>

                </div>
            </div>
            <footer className=" ">
                <Footer />
            </footer>
        </div>

    </>

}