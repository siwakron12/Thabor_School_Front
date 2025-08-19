import React, { useEffect, useState } from 'react';
import Asid from "./Asid.jsx";
import CheckToken from '../service/CheakToken.jsx';

export default function AdminSlide() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  console.log('API URL:', apiUrl); // Check if the variable is correctly accessed

  useEffect(() => {
    CheckToken();
    fetchFiles();
  }, []);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = async (ev) => {
    ev.preventDefault();

    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${apiUrl}imageslide/uploadimg-slide/`, {
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
      setMessage(data.message);
      fetchFiles(); // Fetch files after upload
    } catch (error) {
      setMessage(error.message || 'An error occurred.');
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await fetch(`${apiUrl}imageslide/getimg-slide/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiUrl}imageslide/deleteimg-slide/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setMessage('File deleted successfully.');
      fetchFiles(); // Fetch files after delete
    } catch (error) {
      setMessage(error.message || 'An error occurred.');
    }
  };

  return (
    <div className="w-screen h-screen bg-white">
      <div className="flex w-full h-full p-2">
        <Asid />
        <main className="h-full w-full">
          <form onSubmit={onFileUpload} className='ml-8'>
            <input type="file" onChange={onFileChange} />
            <button type="submit" className="btn bg-green-400 text-white p-2">Upload</button>
          </form>
          <div className="bg-slate-500 w-[500px] mt-4 flex text-white flex-col items-center">
            <h2 className="text-center text-black text-3xl">รูปภาพslide</h2>
            <div>
              <ul>
                {files.map((file) => (
                  <li key={file.id}>
                    <img
                      src={file.image}
                      alt={file.image}
                      className="w-48 h-48 object-cover my-4"
                    />
                    <p>{file.filename}</p>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="btn bg-red-600 rounded-lg p-2 text-white mt-2"
                    >
                      ลบรูปภาพ
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
