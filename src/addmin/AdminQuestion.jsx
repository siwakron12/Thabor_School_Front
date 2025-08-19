import React, { useState, useEffect } from 'react';
import Asid from './Asid';
import CheckToken from '../service/CheakToken';

export default function AdminQuestion() {
    const [questions, setQuestions] = useState([]);
    const [editQuestion, setEditQuestion] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [editComment, setEditComment] = useState(null);
    const [commentContent, setCommentContent] = useState('');
    const [commentAuthor, setCommentAuthor] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        fetchData();
        CheckToken()
    }, []);

    const token = localStorage.getItem("token");

    async function fetchData() {
        try {
            const response = await fetch(`${apiUrl}qanda/question/`);
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }

    async function deleteQuestion(id) {
        try {
            await fetch(`${apiUrl}qanda/question/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            setQuestions(questions.filter(question => question.id !== id));
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    }

    async function deleteComment(id) {
        try {
            await fetch(`${apiUrl}qanda/comment/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            setQuestions(
                questions.map(question => ({
                    ...question,
                    comments: question.comments.filter(comment => comment.id !== id)
                }))
            );
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    }

    function startEdit(question) {
        setEditQuestion(question);
        setTitle(question.title);
        setContent(question.content);
        setAuthor(question.author);
    }

    function startEditComment(comment) {
        setEditComment(comment);
        setCommentContent(comment.comment_content);
        setCommentAuthor(comment.author);
    }

    async function updateQuestion(id) {
        try {
            await fetch(`${apiUrl}qanda/question/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, content, author }),
            });
            setQuestions(
                questions.map(question =>
                    question.id === id ? { ...question, title, content, author } : question
                )
            );
            setEditQuestion(null);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error updating question:', error);
        }
    }

    async function updateComment(id) {
        try {
            await fetch(`${apiUrl}qanda/comment/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ comment_content: commentContent, author: commentAuthor }),
            });
            setQuestions(
                questions.map(question => ({
                    ...question,
                    comments: question.comments.map(comment =>
                        comment.id === id ? { ...comment, comment_content: commentContent, author: commentAuthor } : comment
                    )
                }))
            );
            setEditComment(null);
            setCommentContent('');
            setCommentAuthor('');
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    }

    return (
        <div className="flex w-full h-full p-2">
            <Asid />
            <main className='ml-8'>
                <h1 className='text-red-600 text-4xl'> แก้ไข้ข้อมูลQ&A </h1>
                {editQuestion ? (
                    <div>
                        <h2 className='text-2xl mb-4'>Edit Question</h2>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                updateQuestion(editQuestion.id);
                            }}
                        >
                            <div className='flex flex-col'>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    required
                                    className='border-gray-600 border-2 p-2'
                                />
                                <input
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    required
                                    className='border-gray-600 border-2 p-2'
                                />
                                <input
                                    value={author}
                                    onChange={e => setAuthor(e.target.value)}
                                    required
                                    className='border-gray-600 border-2 p-2'
                                />
                            </div>
                            <button type="submit" className='bg-blue-500 text-white p-2 rounded'>
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditQuestion(null)}
                                className='bg-gray-500 text-white p-2 rounded ml-2'
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                
            ) : editComment ? (
                    <div>
                        <h2 className='text-2xl mb-4'>Edit Comment</h2>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                updateComment(editComment.id);
                            }}
                        >
                            <div className='flex flex-col'>
                            <input
                                    type="text"
                                    value={commentAuthor}
                                    onChange={e => setCommentAuthor(e.target.value)}
                                    required
                                    className='border-gray-600 border-2 p-2'
                                />
                                <textarea
                                    value={commentContent}
                                    onChange={e => setCommentContent(e.target.value)}
                                    required
                                    className='border-gray-600 border-2 p-2'
                                />
                                
                            </div>
                            <button type="submit" className='bg-blue-500 text-white p-2 rounded'>
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditComment(null)}
                                className='bg-gray-500 text-white p-2 rounded ml-2'
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                ) : (
                    <>
                        {questions.length > 0 ? (
                            <ul className='grid grid-cols-3 gap-8'>
                                {questions.map((question, index) => (
                                    <li key={index} className='my-8 rounded-xl p-2 border-gray-600 border-2 '>
                                        <div>
                                            <h1 className='text-red-600 text-2xl'>แก้ไข้ข้อมูลหัวข้อ</h1>
                                        <p>{question.title}</p>
                                        <p className=''>{question.content}</p>
                                        <p className='text-gray-600'>{question.author}</p>
                                        <button
                                            onClick={() => deleteQuestion(question.id)}
                                            className='bg-red-500 text-white p-2 rounded'
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => startEdit(question)}
                                            className='bg-blue-600 text-white p-2 rounded ml-2'
                                        >
                                            Edit
                                        </button>
                                        <h1 className='mt-8 text-2xl text-red-600'>แก้ไข้ข้อมูลcomment</h1>
                                        <div>
                                            {question.comments.map((comment, i) => (
                                                
                                                <li key={i} className="border-t border-gray-800 mt-4 pt-4">
                                                  
                                                    <p className="font-semibold">{comment.author}</p>
                                                    <p>{comment.comment_content}</p>
                                                    <button
                                                        onClick={() => deleteComment(comment.id)}
                                                        className='bg-orange-600 text-white p-2 rounded'
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        onClick={() => startEditComment(comment)}
                                                        className='bg-blue-400 text-white p-2 rounded ml-2'
                                                    >
                                                        Edit
                                                    </button>
                                                </li>
                                            ))}
                                        </div>
                                        </div>
                                      
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No questions available</p>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
