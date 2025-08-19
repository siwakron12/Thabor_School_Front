import React, { useEffect, useState } from 'react';

const PersonAdd = ({ categoryId }) => {
    const [personName, setPersonName] = useState('');
    const [rank, setRank] = useState('');
    const [profileImg, setProfileImg] = useState(null);
    const [persons, setPersons] = useState({ category_personnal: [] });
    const [editPersonId, setEditPersonId] = useState(null);
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        fetchPersons();
    }, [categoryId]);

    const fetchPersons = async () => {
        try {
            const response = await fetch(`${apiUrl}personnel/category/${categoryId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch persons');
            }

            const data = await response.json();
            console.log(data);
            setPersons(data);
        } catch (error) {
            console.error('Error fetching persons:', error);
            setPersons({ category_personnal: [] });
        }
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append('personnal_name', personName);
        formData.append('category_personnal', categoryId);

        if (rank.trim() !== '') {
            formData.append('rank', rank);
        }

        if (profileImg !== null) {
            formData.append('profile_img', profileImg);
        }

        try {
            const response = await fetch(`${apiUrl}personnel/${editPersonId ? `detail/${editPersonId}/` : 'detail/'}`, {
                method: editPersonId ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to ${editPersonId ? 'edit' : 'add'} person: ${errorData.message || response.statusText}`);
            }

            const data = await response.json();
            console.log(`${editPersonId ? 'Edited' : 'Added'} person data:`, data);
            setPersonName('');
            setRank('');
            setProfileImg(null);
            setEditPersonId(null);
            fetchPersons();
        } catch (error) {
            console.error(`Error ${editPersonId ? 'editing' : 'adding'} person:`, error);
        }
    };

    const handleFileChange = (ev) => {
        const file = ev.target.files[0];
        setProfileImg(file);
    };

    const handleEdit = (person) => {
        setPersonName(person.personnal_name);
        setRank(person.rank || '');
        setEditPersonId(person.id);
    };

    const handleDelete = async (personId) => {
        try {
            const response = await fetch(`${apiUrl}personnel/detail/${personId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete person');
            }

            console.log('Deleted person id:', personId);
            fetchPersons();
        } catch (error) {
            console.error('Error deleting person:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='space-x-4'>
                <input
                    onChange={(ev) => setPersonName(ev.target.value)}
                    value={personName}
                    type="text"
                    className="border-2 border-black w-96 p-2"
                    placeholder="Enter person's name"
                />
                <input
                    onChange={(ev) => setRank(ev.target.value)}
                    value={rank}
                    type="text"
                    className="border-2 border-black w-96 p-2"
                    placeholder="Enter rank (optional)"
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="border-2 border-black w-96 p-2"
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white p-2 rounded-lg ml-4"
                >
                    {editPersonId ? 'แก้ไข้บุคคล' : 'เพิ่มบุคคล'}
                </button>
            </form>

            <div className='border-2 border-black my-4'>
                <h2 className='text-xl text-red-600'>รายชื่อบุคคล</h2>
                <ul>
                    {persons.category_personnal.map(person => (
                        <li key={person.id} className='flex justify-between items-center'>
                            <div className='flex items-center mt-4'>
                                {person.profile_img && <img src={person.profile_img} alt={person.personnal_name} className='w-16 h-16 rounded-full mr-4' />}
                                <p>{person.personnal_name}</p>
                                
                                <p className='mx-8'>ตำแหน่ง : {person.rank}</p>
                            </div>
                            <div>
                                <button onClick={() => handleEdit(person)} className='bg-blue-600 text-white p-2 rounded-lg ml-4'>แก้ไข</button>
                                <button onClick={() => handleDelete(person.id)} className='bg-red-600 text-white p-2 rounded-lg mx-4'>ลบ</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PersonAdd;
