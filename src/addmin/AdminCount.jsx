import { useState, useEffect } from "react";
import Asid from "./Asid";
import CheckToken from "../service/CheakToken";

export default function AdminCount() {
    const [data, setData] = useState([]);
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");
    let token = localStorage.getItem("token");

    const apiUrl = process.env.REACT_APP_API_URL; // Use environment variable

    useEffect(() => {
        fetchData();
        CheckToken();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}personnelcount/setcount/`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${apiUrl}personnelcount/setcount/${id}/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            fetchData(); // Re-fetch data after deleting an item
        } catch (error) {
            console.error("There was a problem with the delete operation:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newData = {
            studentcount: Number(input1),
            teachercount: Number(input2),
            classroomcount: Number(input3)
        };

        try {
            const response = await fetch(`${apiUrl}personnelcount/setcount/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newData)
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            setData([...data, result]);
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
        }
    };

    return (
        <div className="flex w-full h-full p-2">
            <Asid />
            <main className="ml-8">
                <p className="text-2xl my-2">ยินดีตอนรับadmin</p>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="flex">
                        <p>จำนวนนักเรียน : </p>
                        <input
                            type="number"
                            value={input1}
                            onChange={(e) => setInput1(e.target.value)}
                            placeholder="Input 1"
                            className="border-gray-500 border-2"
                        />
                    </div>
                    <div className="flex">
                        <p>จำนวนคุณครู : </p>
                        <input
                            type="number"
                            value={input2}
                            onChange={(e) => setInput2(e.target.value)}
                            placeholder="Input 2"
                            className="border-gray-500 border-2"
                        />
                    </div>
                    <div className="flex ">
                        <p>จำนวนห้องเรียน : </p>
                        <input
                            type="number"
                            value={input3}
                            onChange={(e) => setInput3(e.target.value)}
                            placeholder="Input 3"
                            className="border-gray-500 border-2"
                        />
                    </div>
                    <button type="submit" className="bg-green-600 text-white inline p-2">Submit</button>
                </form>
                <ul className="mt-4">
                    {data.map(item => (
                        <li key={item.id} className="flex justify-between items-center space-y-4">
                            <div className="flex mx-4 my-4">
                                <p>นักเรียน</p>{item.studentcount} - <p>คุณครู</p>{item.teachercount} - <p>ห้องเรียน</p>{item.classroomcount}  
                                <button  onClick={() => handleDelete(item.id)} className="bg-red-600 text-white p-1 mx-4">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
