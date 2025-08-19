import React, { useEffect, useState } from "react";

const ITA3 = (props) => {
    const [fileType, setFileType] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [items, setItems] = useState([]);
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetchItems();
    }, []);

    const onFileUpload = async (ev) => {
        ev.preventDefault();

        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        if (fileType === 'pdf') {
            formData.append('pdf', file);
        } else if (fileType === 'image') {
            formData.append('uploaded_images', file);
        }
        formData.append('olistcategory', props.Idd);

        try {
            const response = await fetch(`${apiUrl}ita-online/fileuploads/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);

            setMessage('File uploaded successfully');
            setFile(null);
            setFileType('');
            fetchItems(); // Fetch items again to update the list
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Failed to upload file');
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const fetchItems = async () => {
        try {
            const response = await fetch(`${apiUrl}ita-online/olistcategories/${props.Idd}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }

            const data = await response.json();
            if (Array.isArray(data)) {
                setItems(data); // Assuming data is an array
            } else {
                setItems([data]); // Ensure data is wrapped in an array if not already
            }
            console.log(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const deleteItem = async (itemId) => {
        try {
            const response = await fetch(`${apiUrl}ita-online/fileuploads/${itemId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                console.log('Item deleted successfully');
                fetchItems(); // Fetch items again to update the list
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <>
            <form onSubmit={onFileUpload} className='flex flex-col ml-12 space-y-2'>
                <select value={fileType} onChange={(e) => setFileType(e.target.value)} className='rounded-lg border-2 border-black'>
                    <option value="" disabled>Select file type</option>
                    <option value="pdf">PDF</option>
                    <option value="image">Image</option>
                </select>

                {fileType === 'pdf' && (
                    <>
                        <h1 className=''>Upload PDF</h1>
                        <input type="file" accept="application/pdf" onChange={handleFileChange} />
                    </>
                )}

                {fileType === 'image' && (
                    <>
                        <h1 className=''>Upload Image</h1>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </>
                )}

                <button type="submit" className='w-56 bg-green-600 text-white p-2 rounded-lg'>Upload</button>
            </form>

            <div>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.fileupload.map((value) => (
                            <div key={value.id}>
                                {value.pdf && (
                                    <a href={value.pdf} className="text-red-600 mx-4" target="_blank" rel="noopener noreferrer">View PDF</a>
                                )}
                                {value.images.map((img, i) => (
                                    <div key={i}>
                                        <img src={img.image} className="w-32 h-32 object-cover" alt="" />
                                    </div>
                                ))}
                                <button
                                    onClick={() => deleteItem(value.id)}
                                    className='bg-red-600 text-white p-2 rounded-lg mt-2'
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </li>
                ))}
            </div>
        </>
    );
};

export default ITA3;
