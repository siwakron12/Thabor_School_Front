import { useState, useEffect, useRef } from "react";
import Asid from "./Asid";
import PhotoGallery from "./PhotoGallery";
import CheckToken from "../service/CheakToken";


export default function AdminGallery() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [albums, setAlbums] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editAlbumId, setEditAlbumId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [coverImg, setCoverImg] = useState(null);
    const [editCoverImg, setEditCoverImg] = useState(null); // State for editing cover image
    const token = localStorage.getItem('token');
    let apiUrl = process.env.REACT_APP_API_URL;
    const API_URL = `${apiUrl}photoalbums/albums/`;

    // Ref for file inputs
    const fileInputRef = useRef(null);
    const coverFileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setCoverImg(file);
    };

    const handleCoverFileChange = (event) => {
        const file = event.target.files[0];
        setEditCoverImg(file);
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('cover_img', coverImg);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }

            const result = await response.json();
            setMessage(result.message);
            // Reset form fields and file input
            setTitle('');
            setDescription('');
            setCoverImg(null);
            // Fetch the updated list of albums
            fetchAlbums();
        } catch (error) {
            setMessage(`Upload failed: ${error.message}`);
            console.error(error);
        }
    };

    const fetchAlbums = async () => {
        try {
            const response = await fetch(API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch albums');
            }

            const data = await response.json();
            setAlbums(data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteAlbum = async (id) => {
        try {
            const response = await fetch(`${API_URL}${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete album');
            }

            setMessage('Album deleted successfully');
            // Fetch the updated list of albums
            fetchAlbums();
        } catch (error) {
            setMessage(`Delete failed: ${error.message}`);
            console.error(error);
        }
    };

    const startEdit = (album) => {
        setEditMode(true);
        setEditAlbumId(album.id);
        setEditTitle(album.title);
        setEditDescription(album.description);
        // Set initial cover image for editing
        setEditCoverImg(album.cover_img);
    };

    const cancelEdit = () => {
        setEditMode(false);
        setEditAlbumId(null);
        setEditTitle('');
        setEditDescription('');
        setEditCoverImg(null);
    };

    const updateAlbum = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
    
        // Append only if the fields are defined
        if (editTitle !== '') {
            formData.append('title', editTitle);
        }
        if (editDescription !== '') {
            formData.append('description', editDescription);
        }
        if (editCoverImg !== null) {
            formData.append('cover_img', editCoverImg);
        }
    
        try {
            const response = await fetch(`${API_URL}${editAlbumId}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }
    
            const result = await response.json();
            setMessage(result.message);
            // Reset edit form fields
            cancelEdit();
            // Fetch the updated list of albums
            fetchAlbums();
        } catch (error) {
            setMessage(`Update failed: ${error.message}`);
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAlbums();
        CheckToken(); // Make sure this function handles token checking correctly
    }, []);

    return (
        <div className="flex w-full h-full p-2">
            <Asid />
            <main>
                <form className="ml-8 flex flex-col" onSubmit={onSubmit}>
                    <h1>ชื่อหัวข้อกิจกรรม</h1>
                    <input
                        className="border-2 border-black"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <h1>รายระเอียดกิจกรรม</h1>
                    <textarea
                        className="border-2 border-black w-96 h-56 p-4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <h1>รูปภาพหน้าปก</h1>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        ref={fileInputRef} // Reference to file input element
                    />
                    <button type="submit" className="bg-green-500 text-white rounded-lg p-2 w-24 mt-2">เพิ่มอัลบัม</button>
                </form>

                <div className="ml-8 border-2 border-black p-4 my-4 w-[1600px]">
                    <h2 className="text-3xl text-red-500">แก้ไข้ชื่อกิจกรรม/เพิ่มรูปในกิจกรรม/ลบรูปกิจกรรม</h2>
                    <ul>
                        {albums.map(album => (
                            <li key={album.id} className="grid grid-cols-3 items-center  border-8 border-red-600 mt-4">
                                <div className="flex space-x-4 justify-center items-center">
                                    <div>
                                    <span className="text-2xl">หัวข้อ :{album.title}</span> <br />
                                    <span className="text-2xl">รายระเอียด :{album.description}</span>
                                    </div>
                                  
                                    <div>
                                        <button
                                            onClick={() => deleteAlbum(album.id)}
                                            className="bg-red-500 text-white rounded-lg p-2"
                                        >
                                            ลบ
                                        </button>
                                        <button
                                            onClick={() => startEdit(album)}
                                            className="bg-blue-500 text-white rounded-lg p-2 ml-2"
                                        >
                                            แก้ไข้
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-green-600">รูปหน้าปก</p>
                                    {editMode && editAlbumId === album.id ? (
                                        <div>
                                            <input
                                                type="file"
                                                onChange={handleCoverFileChange}
                                                ref={coverFileInputRef} // Reference to cover file input element
                                            />
                                            {editCoverImg && typeof editCoverImg === 'object' && (
                                                <img src={URL.createObjectURL(editCoverImg)} className="w-32 h-32" alt="Cover" />
                                            )}
                                        </div>
                                    ) : (
                                        <img src={album.cover_img} className="w-32 h-32" alt="" />
                                    )}
                                </div>
                                <PhotoGallery Idd={album.id} />
                            </li>
                        ))}
                    </ul>
                </div>

                {editMode && (
                    <form className="ml-8 flex flex-col mt-4 absolute right-1/4 top-12" onSubmit={updateAlbum}>
                        <h1>แก้ไข้ข้อบูลอัลบัม</h1>
                        <input
                            className="border-2 border-black"
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <textarea
                            className="border-2 border-black w-96 h-56 p-4"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                        />
                        <div>
                            <input
                                type="file"
                                onChange={handleCoverFileChange} // Handle cover image change
                                ref={coverFileInputRef} // Reference to cover file input element
                            />
                            {editCoverImg && typeof editCoverImg === 'object' && (
                                <img src={URL.createObjectURL(editCoverImg)} className="w-32 h-32" alt="Cover" />
                            )}
                        </div>
                        <button type="submit" className="bg-green-500 text-white rounded-lg p-2 w-24 mt-2">อัพเดท</button>
                        <button type="button" className="bg-gray-500 text-white rounded-lg p-2 w-24 mt-2" onClick={cancelEdit}>ยกเลิก</button>
                    </form>
                )}
            </main>
        </div>
    );
}
