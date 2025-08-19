import React, { useEffect, useState } from "react";
import Asid from "./Asid";
import CheckToken from "../service/CheakToken";

export default function AdminSoloImg() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [images, setImages] = useState([]);
    const token = localStorage.getItem("token");
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        fetchImages();
        CheckToken(); // Assuming this function handles token validity
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch(`${apiUrl}buttom-img/getimg-slide/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setImages(data); // Update images state with fetched data
        } catch (error) {
            console.error('Error fetching the data:', error);
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await fetch(`${apiUrl}buttom-img/uploadimg-slide/`, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
              
                fetchImages(); // Refresh images after upload
            } else {
                alert("Failed to upload image.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("An error occurred while uploading the image.");
        }
    };

    const handleDelete = async (imageId) => {
        try {
            const response = await fetch(
                `${apiUrl}buttom-img/deleteimg-slide/${imageId}/`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.ok) {
                console.log(`Image ${imageId} deleted successfully.`);
                fetchImages(); // Refresh images after delete
            } else {
                alert(`Failed to delete image ${imageId}.`);
            }
        } catch (error) {
            console.error(`Error deleting image ${imageId}:`, error);
            alert(`An error occurred while deleting image ${imageId}.`);
        }
    };

    return (
        <div className="flex w-full h-full p-2">
            <Asid />
            <main className="ml-12">
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit" className="bg-green-600 text-white p-2">เพิ่ม</button>
                </form>

                <div className="mt-4">
                    <h2>Uploaded Images:</h2>
                    <ul>
                        {images.map((image) => (
                            <li key={image.id}>
                                <img src={image.image}  style={{ maxWidth: "200px" }} />
                                <button
                                    onClick={() => handleDelete(image.id)}
                                    className="ml-4 bg-red-600 text-white p-2 mt-2"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}
