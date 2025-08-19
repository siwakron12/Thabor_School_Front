import { useEffect, useState } from "react";
import Asid from "./Asid";
import PersonAdd from "./PersonAdd";
import CheckToken from "../service/CheakToken";

export default function AdminPerson() {
    const token = localStorage.getItem("token");
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState(null); // State to track the category being edited
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        fetchCategories();
        CheckToken()
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${apiUrl}personnel/category/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }

            const data = await response.json();

            setCategories(data); // Update state with fetched categories
        } catch (error) {
            console.log('Error fetching categories:', error);
        }
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        if (editId !== null) {
            // Editing an existing category
            await handleEdit(editId, name);
        } else {
            // Adding a new category
            await handleAdd();
        }
    };

    const handleAdd = async () => {
        try {
            const response = await fetch(`${apiUrl}personnel/category/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ category_name: name })
            });

            if (!response.ok) {
                throw new Error('Failed to add category');
            }

            const data = await response.json();
            console.log("Added data:", data);
            setName(""); // Clear input field after successful submission
            fetchCategories(); // Refetch categories to update the list
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleEdit = async (categoryId, newName) => {
        try {
            const response = await fetch(`${apiUrl}personnel/category/${categoryId}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ category_name: newName })
            });

            if (!response.ok) {
                throw new Error('Failed to update category');
            }

            fetchCategories(); // Refetch categories to update the list after edit
            setEditId(null); // Reset editId after editing
            setName(""); // Clear input field after editing
        } catch (error) {
            console.error('Error editing category:', error);
        }
    };

    const handleDelete = async (categoryId) => {
        try {
            const response = await fetch(`${apiUrl}personnel/category/${categoryId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete category');
            }

            fetchCategories(); // Refetch categories to update the list after delete
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleEditClick = (categoryId, categoryName) => {
        // Set the category id being edited and populate the input with its name
        setEditId(categoryId);
        setName(categoryName);
    };

    return (
        <div className="flex w-full h-full p-2">
            <Asid />
            <main className="ml-12">
                <h1 className="text-3xl">หมวดหมู่บุคลากร</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(ev) => { setName(ev.target.value) }}
                        value={name}
                        type="text"
                        className="border-2 border-black  w-96 p-2"
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white p-2 rounded-lg  ml-4"
                    >
                        {editId !== null ? "บันทึก" : "เพิ่มหมวดหมู่"}
                    </button>
                </form>

                <div>
                    <h2 className="text-2xl my-4">รายการหมวดหมู่</h2>
                    <ul >
                        {categories.map((category, index) => (
                            <li key={index} className="border-8 border-red-600 mt-4 rounded-lg p-2">
                                {editId === category.id ? (
                                    <input
                                        value={name}
                                        onChange={(ev) => setName(ev.target.value)}
                                        className="border-2 border-black  w-96 p-2"
                                    />
                                ) :
                                    <p className="text-2xl ">{category.category_name}</p>
                                }

                                {editId === category.id ? (
                                    <button
                                        onClick={(event) => handleSubmit(event)}
                                        className="bg-green-600 text-white p-2 rounded-lg  ml-4"
                                    >
                                        บันทึก
                                    </button>
                                ) : (
                                    <>
                                        <div className="my-4">
                                        <button
                                            onClick={() => handleEditClick(category.id, category.category_name)}
                                            className="ml-2 bg-blue-400 text-white p-2 rounded-lg"
                                        >
                                            แก้ไข
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="ml-2 bg-red-500 p-2 text-white rounded-lg"
                                        >
                                            ลบ
                                        </button>
                                        </div>
                                       
                                    </>
                                )}

                                <PersonAdd categoryId={category.id} />
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}
