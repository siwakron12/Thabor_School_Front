import React, { useState, useEffect } from 'react';
import ITA3 from './ITA3';

const ITA2 = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);

    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchDataS();
    }, []);

    const fetchDataS = async () => {
        try {
            const response = await fetch(`${apiUrl}ita-online/itacategories/${props.Idd}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setFetchedData(Array.isArray(data) ? data : [data]); // Ensure data is always an array
                setLoading(false);
                setError(null); // Reset error state on successful fetch
                console.log('Fetched Data:', data);
            } else {
                const errorData = await response.json(); // Attempt to read error response body
                setError(errorData); // Set error state to display error details
                setLoading(false); // Still set loading to false on error
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            setError(error.message); // Set error state with error message
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let url = `${apiUrl}ita-online/olistcategories/`;
        let method = 'POST';
        let body = JSON.stringify({
            title: title,
            description: description,
            itacategory: props.Idd
        });

        if (editingId) {
            url += `${editingId}/`;
            method = 'PUT'; // Use PUT method for updating existing item
            body = JSON.stringify({
                id: editingId,
                title: title,
                description: description,
                itacategory: props.Idd
            });
        }

        try {
            const response = await fetch(url, {
                method: method,
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                setTitle('');
                setDescription('');
                setEditingId(null); // Reset editing state
                fetchDataS(); // Fetch data again after successful submission to update the list
            } else {
                const errorData = await response.json(); // Attempt to read error response body
                setError(errorData); // Set error state to display error details
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message); // Set error state with error message
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${apiUrl}ita-online/olistcategories/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                console.log('Deleted successfully');
                fetchDataS();
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = (content) => {
        setTitle(content.title);
        setDescription(content.description);
        setEditingId(content.id); // Set editingId to mark as editing
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='m-2'>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder='ตัวอย่างO1,O2,O3'
                        className='border-2 border-gray-600 p-2'
                    />
                </div>
                <div className='m-2'>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder='ข้อความ'
                        className='border-2 border-gray-600 p-2'
                    />
                </div>
                <button type="submit" className='bg-green-600 text-white p-2 m-2'>
                    {editingId ? 'Update' : 'Submit'}
                </button>
            </form>

            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <ul>
                        {fetchedData.map(item => (
                            <li className='border-4 border-red-700 p-2 mb-8' key={item.id}>
                                <p className='text-xl text-orange-700'>Subcategory</p>
                                {item.olistcategory.map(content => (
                                    <div key={content.id} className='grid grid-cols-4 items-center gap-6 my-4 space-x-4 '>
                                        <div className='flex'>
                                            <p>{content.title}</p>
                                            <p>{content.description}</p>
                                        </div>
                                        <div>
                                            <button onClick={() => handleEdit(content)} className='bg-blue-600 text-white p-1 m-2'>Edit</button>
                                            <button onClick={() => handleDelete(content.id)} className='bg-red-700 text-white p-2 m-2'>
                                                Delete
                                            </button>
                                        </div>
                                        <ITA3 Idd={content.id} />
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ITA2;
