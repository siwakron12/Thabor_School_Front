import React, { useState, useEffect } from 'react';

const ImageUpload = (props) => {
    const [images, setImages] = useState([]);
    const [uploadedImages, setUploadedImages] = useState({ photos: [] });

    useEffect(() => {
        fetchUploadedImages(props.Idd);
    }, [props.Idd]);

    const fetchUploadedImages = (albumId) => {
        fetch(`${process.env.REACT_APP_API_URL}photoalbums/albums/${albumId}/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUploadedImages(data); // Assuming data is an object with a 'photos' array
            })
            .catch(error => {
                console.error('There was an error fetching the photos!', error);
            });
    };

    const handleImageChange = (event) => {
        setImages(Array.from(event.target.files));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('album', props.Idd);

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        fetch(`${process.env.REACT_APP_API_URL}photoalbums/photos/multiple/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Photos uploaded successfully:', data);
                fetchUploadedImages(props.Idd); // Refresh the uploaded images list for the specific album
            })
            .catch(error => {
                console.error('There was an error uploading the photos!', error);
            });
    };

    const handleDeleteImage = (imageId) => {
        fetch(`${process.env.REACT_APP_API_URL}photoalbums/photos/${imageId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(`Image ${imageId} deleted successfully`);
                fetchUploadedImages(props.Idd); // Refresh the uploaded images list after deletion
            })
            .catch(error => {
                console.error(`Error deleting image ${imageId}:`, error);
            });
    };

    return (
        <div className=''>
            <div className='mt-12'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>เลือกรูปภาพ</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleImageChange}
                        />
                        <button type="submit" className='bg-green-600 rounded-lg p-2 text-white'>เพิ่มรูปภาพ</button>
                    </div>
                </form>
                <div>
                    <h2>รูปภาพ</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {uploadedImages.photos.map((img, index) => (
                            <div key={index} style={{ position: 'relative', margin: '10px' }}>
                                <img
                                    src={img.image}
                                    alt={`Uploaded ${index}`}
                                    style={{ width: '100px', height: '100px' }}
                                />
                                <button
                                    onClick={() => handleDeleteImage(img.id)}
                                    className='absolute top-1 right-0 w-4 '
                                >
                                    ❌
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;
