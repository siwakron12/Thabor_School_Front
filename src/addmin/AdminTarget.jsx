import CheckToken from '../service/CheakToken.jsx';
import React, { useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Asid from './Asid.jsx';
import HTMLReactParser from 'html-react-parser';
export default function AdminTarget(){
    
    const [content, setContent] = useState('');

    const [posts, setPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;
    const config = {
        readonly: false,
        height: 700,
        width:1500,
        uploader: {
            url: `${apiUrl}schoolvision/upload/`,
            insertImageAsBase64URI: true,
            format: 'json',
            headers: {
                // 'Authorization': 'Bearer your-token'
            },
            isSuccess: (resp) => 'url' in resp,
            process: (resp) => {
                return {
                    files: [resp.url],
                    path: resp.url,
                    baseurl: apiUrl,
                    error: ''
                };
            },
            error: (e) => {
                console.error(e);
                alert('Image upload failed!');
            }
        },
        buttons: [
            'bold', 'italic', 'underline', 'strikethrough', 'eraser', '|',
            'font', 'fontsize', 'paragraph', 'brush', "|",
            'image', 'video', 'link', '|',
            'align', 'undo', 'redo', '|',
            'hr', 'table', 'copyformat', '|',
            'fullsize', 'print', 'about'
        ],
    };

    useEffect(() => {
        fetchPosts();
        CheckToken()
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${apiUrl}schoolvision/posts/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data)
            setPosts(data);
        } catch (error) {
            console.error('Error fetching the data:', error);
        }
    };

    const handleSubmit = async () => {
        const postData = {
          
            content
        };
        const token = localStorage.getItem("token");

        try { 
            const response = await fetch(`${apiUrl}schoolvision/posts/${isEditing ? currentPostId + '/' : ''}`, {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("Submitted data:", data);
            fetchPosts(); // Refresh the list of posts
            resetForm();
        } catch (error) {
            console.error('Error submitting the data:', error);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`${apiUrl}schoolvision/posts/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            fetchPosts(); // Refresh the list of posts
        } catch (error) {
            console.error('Error deleting the data:', error);
        }
    };

    const handleEdit = (post) => {
       
        setContent(post.content);
        setIsEditing(true);
        setCurrentPostId(post.id);
    };

    const resetForm = () => {
      
        setContent('');
        setIsEditing(false);
        setCurrentPostId(null);
    };

    return (
        <div className='flex'>
            <Asid />

            <main className='p-4'>
                <h1 className='text-3xl text-red-600'>แก้ไข้วิสัยทัศน์</h1>
               
                <JoditEditor
                    value={content}
                    config={config}
                    onBlur={newContent => setContent(newContent)}
                    onChange={newContent => {}}
                       
                />
                <button
                    className='bg-green-600 p-2 text-white rounded-lg mt-4'
                    onClick={handleSubmit}
                >
                    {isEditing ? 'อัพเดท' : 'เพิ่ม'}
                </button>

                <div className='mt-4'>
                    <h2 className='text-3xl'>แก้ไข้ข้อมูล</h2>
                    <ul>
                        {posts.map(post => (
                            <li key={post.id} className='border-b-2 pb-2 mb-2'>
                                
                                <p>{HTMLReactParser(post.content)}</p>
                              
                                <button
                                    className='mt-4 bg-red-600 text-white p-1 mr-2'
                                    onClick={() => handleDelete(post.id)}
                                >
                                    ลบ
                                </button>
                                <button
                                    className='bg-blue-600 text-white p-1'
                                    onClick={() => handleEdit(post)}
                                >
                                    แก้ไข้
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}