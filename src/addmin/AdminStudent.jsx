import React, { useEffect, useState } from 'react';
import Asid from './Asid';
import CheckToken from '../service/CheakToken';

export default function AdminStudent() {
  const [fileType, setFileType] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchAlbums();
    CheckToken();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(`${apiUrl}student-detail/uploads/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }

      const data = await response.json();
      setItems(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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

    try {
      const url = editMode ? `${apiUrl}student-detail/uploads/${editId}/` : `${apiUrl}student-detail/uploads/`;
      const method = editMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
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
      fetchAlbums(); // Refresh the list of items after uploading
      setMessage('File uploaded successfully');
      setFile(null);
      setFileType('');
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      console.log(error);
      setMessage('Failed to upload file');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${apiUrl}student-detail/uploads/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = (item) => {
    setEditMode(true);
    setEditId(item.id);
    setFileType(item.pdf ? 'pdf' : 'image');
    setFile(null); // Clear the file input
  };

  return (
    <div className="flex w-full h-full p-2">
      <Asid />
      <main className="ml-14">
        <h1 className='text-3xl'>แก้ไข้ข้อมูลนักเรียน</h1>
        <form onSubmit={onFileUpload} className='flex flex-col ml-12 space-y-8 mt-8'>
          <h1 className='text-2xl'>เลือกชนิดไฟล์</h1>
          <select value={fileType} onChange={(e) => setFileType(e.target.value)} className='p-2 rounded-lg border-2 border-black'>
            <option value="" disabled>Select file type</option>
            <option value="pdf">PDF</option>
            <option value="image">Image</option>
          </select>

          {fileType === 'pdf' && (
            <>
              <h1 className='text-2xl'>Upload PDF</h1>
              <input type="file" accept="application/pdf" onChange={handleFileChange} />
            </>
          )}

          {fileType === 'image' && (
            <>
              <h1 className='text-2xl'>Upload Image</h1>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </>
          )}

          <button type="submit" className='bg-green-600 text-white p-2 rounded-lg w-56'>{editMode ? 'Update' : 'Upload'}</button>
        </form>
        {message && <p>{message}</p>}

        <div className="mt-8">
          <h2 className='text-2xl'>Uploaded Items</h2>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="mb-4">
                {item.pdf && (
                  <div className="flex items-center">
                    <a href={item.pdf} target='_blank' className='text-xl text-red-600 mr-4'>View PDF</a>
                    <button
                      onClick={() => editItem(item)}
                      className='bg-blue-600 text-white p-2 rounded-lg mr-2'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className='bg-red-600 text-white p-2 rounded-lg mt-2'
                    >
                      Delete
                    </button>
                  </div>
                )}
                {item.images.map((img, i) => (
                  <div key={i} className='mt-8'>
                    <img src={img.image} className="w-32 h-32 object-cover" alt="" />
                    <button
                      onClick={() => deleteItem(item.id)}
                      className='bg-red-600 text-white p-2 rounded-lg mt-2'
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
