// src/components/BlogList.js
import React, { useState, useEffect } from 'react';
import axios from './axios';

const BlogList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('posts/')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div>
            {posts.map(post => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    {post.image && <img src={`http://localhost:8000${post.image}`} alt={post.title} />}
                </div>
            ))}
        </div>
    );
};

export default BlogList;
