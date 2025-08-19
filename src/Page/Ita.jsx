import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react';
import Nav from "../compornent/Nav";
import Footer from "../compornent/Footer";
import { Helmet } from "react-helmet";


export default function Ita() {
    const [ITA, setITA] = useState([]);
    const [pdfFile, setPdfFile] = useState(null);
    const [Img, setImg] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchFiles = async () => {
        try {
            const response = await fetch(`${apiUrl}ita-online/itayearcategories/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setITA(data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchOnclick = async (id) => {
        try {
            const response = await fetch(`${apiUrl}ita-online/servepdf/${id}/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response;
            setPdfFile(data);
            setImg([]);
        } catch (error) {
            console.error('Error fetching file:', error);
        }
    };

    const fetchImg = async (id) => {
        try {
            const response = await fetch(`${apiUrl}ita-online/fileuploads/${id}/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setPdfFile(null);
            setImg([...data.images]);
        } catch (error) {
            console.error('Error fetching file:', error);
        }
    };

    return (
        <div className="font-thai min-h-screen flex flex-col">
            <Helmet>
                <meta charSet="utf-8" />
                <title>ITA ONLINE</title>
            </Helmet>
            <Nav />
            <div className="lg:w-3/4 mx-auto w-full">
                <h1 className="text-3xl text-red-600 mt-4">ITA ONLINE</h1>

                <main className="w-full lg:flex lg:space-x-4 space-y-8 lg:space-y-0 justify-between">
                    <aside className="h-full w-[500px] px-2 mt-8 mx-auto">
                        <Accordion defaultIndex={[0]} allowMultiple>
                            {ITA.map((item) => (
                                <AccordionItem key={item.id} className="bg-red-600 text-white ease-in-out duration-300 w-[270px] md:w-full">
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex="1" textAlign="left" className="p-4 lg:text-xl font-bold">
                                                {item.title}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4} className="bg-red-300 text-xl p-2 space-y-4">
                                        {item.itacategory.map((content) => (
                                            <Accordion key={content.id} allowMultiple>
                                                <AccordionItem className="bg-red-800 text-white">
                                                    <h2>
                                                        <AccordionButton>
                                                            <Box as="span" flex="1" textAlign="left" className="p-4 lg:text-xl font-bold">
                                                                {content.title}
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                    </h2>
                                                    <AccordionPanel pb={4} className="bg-red-500 text-xl p-2 space-y-4">
                                                        {content.olistcategory.map(value => (
                                                            <div key={value.id}>
                                                                {value.fileupload.length <= 0 ? (
                                                                    <>
                                                                        <p className="text-base cursor-pointer underline decoration-1 bg-gray-600 p-2 text-balance">
                                                                            {value.title} : {value.description}
                                                                        </p>
                                                                    </>)
                                                                    : (<> {value.fileupload.map(item => (
                                                                        <>

                                                                            <div key={item.id}>

                                                                                {item.images.length <= 0 ? (
                                                                                    <div>
                                                                                        <p onClick={() => fetchOnclick(item.id)} className="text-base cursor-pointer underline decoration-1 bg-gray-600 p-2 text-balance">
                                                                                            {value.title} : {value.description}
                                                                                        </p>

                                                                                    </div>

                                                                                ) : value.fileupload.length < 1 ? (

                                                                                    < p>
                                                                                        {value.title} : {value.description}
                                                                                    </p>
                                                                                )
                                                                                    : (<p onClick={() => fetchImg(item.id)} className="text-base cursor-pointer underline decoration-1  bg-gray-600 p-2 text-balance">
                                                                                        {value.title} : {value.description}
                                                                                    </p>)}
                                                                            </div>
                                                                        </>
                                                                    ))}</>)}



                                                            </div>
                                                        ))}
                                                    </AccordionPanel>
                                                </AccordionItem>
                                            </Accordion>
                                        ))}
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </aside>

                    <section className="w-full p-2">
                        {pdfFile ? (
                            <div className="relative">
                                <iframe className="w-full h-[600px] lg:h-[800px]" src={pdfFile.url} title="PDF Viewer"></iframe>
                                <a href={pdfFile.url} target="_blank" rel="noopener noreferrer" className="text-sm text-white bg-red-500 p-2 absolute bottom-0 left-0">ดูเต็มหน้า</a>
                            </div>
                        ) : (
                            <div>
                                {Img.length > 0 && (
                                    <img className="w-full h-full" src={Img[0].image} alt="First Image" />
                                )}
                            </div>
                        )}
                    </section>
                </main>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
