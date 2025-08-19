import React, { useState, useEffect } from 'react';
import ITA2 from './ITA2';

const ITA1 = (props) => {
    const [title, setTitle] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editId, setEditId] = useState(null);
    const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchDataById();
    }, []);

    const fetchDataById = async () => {
        try {
            const response = await fetch(`${apiUrl}ita-online/itayearcategories/${props.Idd}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                setFetchedData(Array.isArray(data) ? data : [data]);
                setLoading(false);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let endpoint = `${apiUrl}ita-online/itacategories/`;
        let method = 'POST';

        if (editId) {
            endpoint += `${editId}/`;
            method = 'PUT';
        }

        const postData = {
            title: editId ? editTitle : title,
            yearcategory: props.Idd
        };

        try {
            const response = await fetch(endpoint, {
                method: method,
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
                fetchDataById();
                setTitle('');
                setEditId(null);
                setEditTitle('');
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = (id, title) => {
        setEditId(id);
        setEditTitle(title);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/ita-online/itacategories/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.ok) {
                console.log('Deleted successfully');
                fetchDataById();
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setEditTitle('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='m-2'>
                    <input
                        type="text"
                        id="title"
                        value={editId ? editTitle : title}
                        onChange={(e) => editId ? setEditTitle(e.target.value) : setTitle(e.target.value)}
                        required
                        placeholder='หัวข้อita'
                        className='border-2 border-gray-600 p-2'
                    />
                </div>
                <button type="submit" className='bg-green-600 text-white p-2 m-2'>{editId ? 'Update' : 'Submit'}</button>
                {editId && <button type="button" onClick={handleCancelEdit} className='bg-gray-600 text-white p-2 m-2'>Cancel</button>}
            </form>
            {loading ? <p>Loading...</p> : (
                <ul className='p-2'>
                    {fetchedData.map(item => (
                        <li key={item.id} className='border-2 p-2 border-gray-600 '>
                            {item.itacategory && item.itacategory.map(content => (
                                <div key={content.id} className='flex flex-col'>
                                    <p className='text-orange-700 text-xl'>ชื่อหัวข้อหลัก</p>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-2xl font-bold'>{content.title}</p>
                                        <div>
                                            <button onClick={() => handleDelete(content.id)} className='bg-red-600 text-white p-1 m-2'>Delete</button>
                                            <button onClick={() => handleEdit(content.id, content.title)} className='bg-blue-600 text-white p-1'>Edit</button>
                                        </div>
                                    </div>
                                    <ITA2 Idd={content.id} />
                                </div>
                            ))}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ITA1;
