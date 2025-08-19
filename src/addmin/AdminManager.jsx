import { useEffect, useState } from "react";
import Asid from "./Asid";

const AdminManager = () => {
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [endDate, setEndDate] = useState("");
    const [file, setFile] = useState(null);
    const [directors, setDirectors] = useState([]);
    const [editing, setEditing] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchDirectors();
    }, []);

    const fetchDirectors = async () => {
        try {
            const response = await fetch(`${apiUrl}director/directorlist/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setDirectors(data);
        } catch (error) {
            console.error('Error fetching directors:', error);
        }
    };

    const onFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile));
    };

    const handleAddOrUpdate = async (ev) => {
        ev.preventDefault();

        let formData = new FormData();
        formData.append('name', name);
        formData.append('startdate', year);
        formData.append('enddate', endDate);

        if (file) {
            formData.append('profile', file);
        }

        try {
            const url = editing ? `${apiUrl}director/directorlist/${editing.id}/` : `${apiUrl}director/directorlist/`;
            const method = editing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            console.log("Data added/updated successfully.");
            setEditing(null);
            setName("");
            setYear("");
            setEndDate("");
            setFile(null);
            setImagePreview(null);
            fetchDirectors();
        } catch (error) {
            console.error('Error adding/updating data:', error);
            // Display error message to user if needed
        }
    };

    const handleEdit = (director) => {
        setEditing(director);
        setName(director.name);
        setYear(director.startdate);
        setEndDate(director.enddate);
        setImagePreview(director.profile); // Set image preview to current profile image
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${apiUrl}director/directorlist/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            console.log("Data deleted successfully.");
            fetchDirectors();
        } catch (error) {
            console.error('Error deleting data:', error);
            // Display error message to user if needed
        }
    };

    return (
        <div className="flex w-full h-full p-2">
            <Asid />
            <main className="ml-12">
                <form onSubmit={handleAddOrUpdate} className="flex items-center justify-center flex-col space-y-4 border-2 border-black w-96 h-auto p-4">
                    <input type="text" className="p-2 border-2 border-black m-2" value={name} onChange={(ev) => setName(ev.target.value)} placeholder="ชื่อสกุล" required />
                    <input type="text" className="p-2 border-2 border-black m-2" value={year} onChange={(ev) => setYear(ev.target.value)} placeholder="พ.ศ." required />
                    <input type="text" className="p-2 border-2 border-black m-2" value={endDate} onChange={(ev) => setEndDate(ev.target.value)} placeholder="ปีสิ้นสุด" required />
                    <input type="file" onChange={onFileChange} className="p-2" />
                    {imagePreview && (
                        <img src={imagePreview} alt="Profile Preview" className="w-24 h-24 mt-2" />
                    )}
                    <button type="submit" className="bg-green-600 text-white p-2 rounded-md w-24">{editing ? 'Update' : 'Add'}</button>
                </form>

                <div className="mt-8">
                    <h2 className="text-xl mb-4 text-red-600">แก้ไข้ข้อมูลผู้บริหาร</h2>
                    <ul>
                        {directors.map(director => (
                            <li key={director.id} className="flex justify-between items-center p-2 border-b-2">
                                <span>{director.name} ({director.startdate} - {director.enddate})</span>
                                {director.profile && (
                                    <img src={director.profile} alt="Profile" className="w-10 h-10 rounded-full ml-4" />
                                )}
                                <div>
                                    <button onClick={() => handleEdit(director)} className="bg-blue-600 text-white p-2 rounded-md mr-2">Edit</button>
                                    <button onClick={() => handleDelete(director.id)} className="bg-red-600 text-white p-2 rounded-md">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default AdminManager;
