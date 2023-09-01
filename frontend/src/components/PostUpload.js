import React, { useState } from 'react';
import profilePic from '../assets/26.jpeg';

const PostUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handlePost = () => {
    // Logic to handle the post with the selected file
    console.log('Selected File:', selectedFile);
  };

  return (
    <div className="container mx-auto flex justify-center mt-5">
      <div className="bg-white rounded-lg shadow-xl p-6 w-1/2 flex">
        <img
          src={profilePic}
          alt="Profile Pic"
          className="w-20 h-20 rounded-full object-cover mr-4"
        />
        <div className="flex-1">
          <textarea
            className="w-full h-20 p-2 mb-4 resize-none border border-gray-300 rounded focus:outline-blue-300"
            placeholder="Write your thoughts..."
          ></textarea>
          <div className="flex justify-between items-center">
            <input
              type="file"
              accept="image/*, video/*"
              id="upload-post-media"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="upload-post-media"
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
            >
              Upload Media
            </label>
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
