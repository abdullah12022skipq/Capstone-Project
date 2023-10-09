import React, { useState, useEffect, useRef, useContext } from 'react';
import { PostContext } from './PostContext';
import axios from 'axios';
import LikeDislike from './LikeDislike';
import { useNavigate } from 'react-router-dom';
import { FaComment, FaEllipsisV } from 'react-icons/fa';

const PostShowBox = ({ post, profile }) => {
  const { _id, text, mediaUrl, comments } = post;
  const navigate = useNavigate();

  const { deletePost } = useContext(PostContext)

  const singlePostUrl = () => {
    navigate(`/post/${_id}`);
  };

  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const menuRef = useRef(null);

  const handleOptionsMenuClick = () => {
    setShowOptionsMenu(!showOptionsMenu);
  };

  const handleDeletePost = async () => {
    const authToken = localStorage.getItem('token');

    // Set up the headers for the request
    const headers = {
      'auth-token': authToken,
    };

    try{
    // Make the POST request with the token
    const response = await axios.delete(
      `http://localhost:5000/api/story/stories/${_id}`,
      {
        headers: headers,
      }
    );
    deletePost(_id)
    // Code to delete the post goes here
    // You can add an appropriate logic or API call to delete the post
    console.log(response.data);
    }
    catch(error) {
      console.error('Error deleting post:', error);
    }};

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowOptionsMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = "#EDF2F7";
  }, []);

  return (
    <div className="container mx-auto flex justify-center mt-5 cursor-pointer">
      <div className="bg-white rounded-lg shadow-xl p-6 w-1/2 max-w-xl" style={{ maxHeight: "550px" }}>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={profile.profileUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{profile.fullname}</h2>
                <p className="text-gray-600">@{profile.username}</p>
              </div>
            </div>
            <div className="relative" ref={menuRef}>
              <button className="text-gray-600 hover:text-gray-800" onClick={handleOptionsMenuClick}>
                <FaEllipsisV />
              </button>
              {showOptionsMenu && (
                <div className="border-2 border-gray-200 absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-lg">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100" onClick={handleDeletePost}>
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4" onClick={singlePostUrl}>
            <p>{text}</p>
          </div>
          {mediaUrl && (
            <div className="mt-4" onClick={singlePostUrl}>
              {mediaUrl.endsWith('.mp4') ? (
                <video
                  src={mediaUrl}
                  controls
                  className="shadow-xl mx-auto rounded"
                  style={{ maxHeight: "320px", maxWidth: "460px" }}
                />
              ) : (
                <img
                  src={mediaUrl}
                  alt="Post"
                  className="shadow-xl mx-auto rounded"
                  style={{ maxHeight: "320px", maxWidth: "460px" }}
                />
              )}
            </div>
          )}

          <div className="flex">
            <LikeDislike id={_id} />
            <button className="text-blue-500 hover:text-blue-700 flex" onClick={singlePostUrl}>
              <FaComment className="h-5 w-5 ml-3 mt-4" />
              <span className="ml-2 mt-4">{comments.length}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostShowBox;
