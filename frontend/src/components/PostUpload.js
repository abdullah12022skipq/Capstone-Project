import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { PostContext } from './Post/PostContext';

const PostUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [postText, setPostText] = useState('');
  const user = useSelector((state) => state.user.user);

  const { updatePosts } = useContext(PostContext); // Use the updatePosts function

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedFileName(file.name);
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('story', selectedFile);
      }
      if (postText) {
        formData.append('text', postText);
      }

      // Set the authentication token in the request headers
      const authToken = localStorage.getItem('token');

      // Set up the headers for the request
      const headers = {
        'Content-Type': 'multipart/form-data',
        'auth-token': authToken,
      };

      // Make the POST request with the token
      const response = await axios.post(
        'http://localhost:5000/api/story/stories',
        formData,
        {
          headers: headers,
        }
      );

      console.log('Post created successfully:', response.data);
      const newPost = response.data;
      const newPostsWithMediaUrls = {
        ...newPost,
        mediaUrl: newPost.media ? `http://localhost:5000/${newPost.media}` : null,
      };

      // Update the posts using the updatePosts function
      updatePosts((prevPosts) => [...prevPosts, newPostsWithMediaUrls]);

      setSelectedFile(null);
      setSelectedFileName('');
      setPostText('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container mx-auto flex justify-center mt-5">
      <div className="bg-white rounded-lg shadow-xl p-6 w-1/2 flex">
        <img
          src={user.profileUrl}
          alt="Profile Pic"
          className="w-20 h-20 rounded-full object-cover mr-4"
        />
        <div className="flex-1">
          <textarea
            className="w-full h-20 p-2 mb-4 resize-none border border-gray-300 rounded focus:outline-blue-300"
            placeholder="Write your thoughts..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>
          <div className="flex justify-between items-center">
            <input
              type="file"
              accept="image/*, video/*"
              id="upload-post-media"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="items-start">
              <label
                htmlFor="upload-post-media"
                className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
              >
                Upload Media
              </label>
              {selectedFileName && (
                <span className="text-gray-600 ml-3">{selectedFileName}</span>
              )}
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostUpload;
