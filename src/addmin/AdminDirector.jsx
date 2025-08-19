import { useState, useEffect } from "react";
import Asid from "./Asid";

export default function AdminDirector() {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const token = localStorage.getItem("token");

    const apiUrl = process.env.REACT_APP_API_URL; // Use environment variable

    useEffect(() => {
        // Fetch images when component mounts
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch(`${apiUrl}director-imageslide/getimg/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            setImages(result);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    const handleDelete = async (imageId) => {
        try {
            const response = await fetch(`${apiUrl}director-imageslide/deleteimg/${imageId}/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Remove the deleted image from the state
            setImages(images.filter(image => image.id !== imageId));
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);

        try {
            const response = await fetch(`${apiUrl}director-imageslide/uploadimg/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log("Success:", result);
            
            // Fetch images again after upload
            fetchImages();
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className="flex w-full h-full p-2">
            <Asid />
            <main className="ml-8">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input className="border-gray-600 border-2"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="image">Image:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <button type="submit" className="bg-green-600 text-white p-2 rounded-xl">เพิ่ม</button>
                </form>
                <div>
                    <h2 className="text-2xl">แสดงผล</h2>
                    {images.map((img) => (
                        <div key={img.id}>
                            <img src={img.image} alt={img.name} width="100" />
                            <p>{img.name}</p>
                            <button className="bg-red-600 p-2 text-white" onClick={() => handleDelete(img.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
