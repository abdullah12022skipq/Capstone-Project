import React, { useContext } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { PostContext } from './PostContext';  // Assuming you have a context for posts
import { useSelector } from 'react-redux'; // Import the necessary selector from Redux

const LikeDislike = ({ id }) => {
  const { posts, updatePostReaction } = useContext(PostContext);
  const userId = useSelector((state) => state.user.user._id); // a user reducer in Redux

  // Find the post in your context data based on postId
  const post = posts.find((p) => p._id === id);

  const isUserUpvoted = post.upvotes.includes(userId);
  const isUserDownvoted = post.downvotes.includes(userId);

  const authToken = localStorage.getItem('token');
  const headers = {
    'auth-token': authToken,
  };
  
  const handleThumbsUpClick = async () => {
    try {
      if (isUserUpvoted) {
        // Make a request to undo the upvote with the headers
        await axios.post(`http://localhost:5000/api/vote/upvote/${id}`, null, { headers });
        post.upvotes.splice(post.upvotes.indexOf(userId),1)
      } else if (isUserDownvoted) {
        await axios.post(`http://localhost:5000/api/vote/upvote/${id}`, null, { headers });
        post.downvotes.splice(post.downvotes.indexOf(userId),1)
        post.upvotes.push(userId)
      } else {
        // Make a request to upvote the item with the headers
        await axios.post(`http://localhost:5000/api/vote/upvote/${id}`, null, { headers });
        post.upvotes.push(userId)
      }
      updatePostReaction(id, post)
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleThumbsDownClick = async () => {
    try {
      if (isUserDownvoted) {
        // Make a request to undo the downvote with the headers
        await axios.post(`http://localhost:5000/api/vote/downvote/${id}`, null, { headers });
        post.downvotes.splice(post.downvotes.indexOf(userId),1)
      } else if (isUserUpvoted) {
        await axios.post(`http://localhost:5000/api/vote/downvote/${id}`, null, { headers });
        post.upvotes.splice(post.upvotes.indexOf(userId),1)
        post.downvotes.push(userId)
      } else {
        // Make a request to downvote the item with the headers
        await axios.post(`http://localhost:5000/api/vote/downvote/${id}`, null, { headers });
        post.downvotes.push(userId)
      }
      updatePostReaction(id, post)
    } catch (error) {
      console.error('Error downvoting:', error);
    }
  };

  return (
    <div className='flex justify-between items-center'>
      <button
        className={`flex items-center justify-center mt-4 ${isUserUpvoted ? 'text-blue-700' : 'text-blue-500' }`}
        onClick={handleThumbsUpClick}
      >
        <FaThumbsUp className='h-5 w-5'/>
        <span className="ml-2">{post.upvotes.length}</span>
      </button>
      <button
        className={`flex items-center justify-center mt-4 ml-3 ${isUserDownvoted ? 'text-red-700' : 'text-red-500' }`}
        onClick={handleThumbsDownClick}
      >
        <FaThumbsDown className='h-5 w-5'/>
        <span className="ml-2">{post.downvotes.length}</span>
      </button>
    </div>
  );
};

export default LikeDislike;
