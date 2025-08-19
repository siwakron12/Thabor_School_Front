import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
export default function SoloImg() {
    let [man, setMan] = useState([])
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        AOS.init();
        fetchItem()
    }, []);
            
   
    const fetchItem = async () => {
        try {
            const response = await fetch(`${apiUrl}buttom-img/getimg-slide/`);
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
    return <div data-aos="fade-up" >
        {man.map(item => (
            <div className="w-full h-[200px] sm:h-[650px] mx-auto flex justify-center mt-24" key={item.id}>
                <img className=" w-full  h-full object-cover" src={item.image} alt="" />
            </div>
        ))}


    </div>
}