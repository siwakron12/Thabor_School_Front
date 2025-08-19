import { useState, useEffect } from "react";
import Asid from "./Asid";
import ITA1 from "./ITA1";
import CheckToken from "../service/CheakToken";

const AdminIta = () => {
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchCategories();
        CheckToken()
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}ita-online/itayearcategories/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `${process.env.REACT_APP_API_URL}ita-online/itayearcategories/${editingId}/`
            : `${process.env.REACT_APP_API_URL}ita-online/itayearcategories/`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title })
            });

            if (!response.ok) {
                throw new Error('Failed to submit category');
            }

            setTitle("");
            setEditingId(null);
            fetchCategories();
        } catch (error) {
            console.error('Error submitting category:', error);
        }
    };

    const handleEdit = (category) => {
        setTitle(category.title);
        setEditingId(category.id);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}ita-online/itayearcategories/${id}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete category');
            }

            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="flex w-full h-full p-2">
            <Asid />
            <main className="ml-12">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="ITA Year"
                        className="border-gray-600 border-2 p-2"
                    />
                    <button className="ml-2 text-white bg-green-600 p-2" type="submit">{editingId ? "Update" : "Submit"}</button>
                </form>
                <ul className="mt-4 w-[1200px]">
                    {Array.isArray(categories) && categories.map((year) => (
                        <li key={year.id} className="border-gray-600 border-2 mt-8">
                            <h1 className="text-red-600 text-2xl">ปีITA</h1>
                            <div className="flex justify-between items-center">
                                <p className="text-2xl">
                                    {year.title}
                                </p>
                                <div>
                                    <button className="ml-2 text-white bg-blue-600 p-3" onClick={() => handleEdit(year)}>Edit</button>
                                    <button className="ml-2 text-white bg-red-600 p-3" onClick={() => handleDelete(year.id)}>Delete</button>
                                </div>
                            </div>
                            <ITA1 Idd={year.id} />
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default AdminIta;
