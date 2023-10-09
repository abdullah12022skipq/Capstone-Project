import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import { PostContext } from './PostContext';

const Comments = ({ id, updateCommentCount, commentLen }) => {

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { users } = useContext(UserContext);
  const { updateComment } = useContext(PostContext);


  // Function to fetch comments for the given story _id
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/comment/comments/${id}`);
      updateCommentCount((prevCount) => response.data.length);
      setComments(response.data);
      let data =  response.data
      let dataLen = data.length
      if(commentLen!==dataLen){
        const newCom = {
          "_id": data[dataLen-1]["_id"],
          "user": data[dataLen-1]["user"]["_id"]
        }
        updateComment(id, newCom)
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    // Fetch comments when the component mounts
    fetchComments();
  }, [id]);

  // Function to handle adding a new comment
  const handleAddComment = async () => {
    try {
      const authToken = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'auth-token': authToken,
      };
      // Make a POST request to add a new comment
      await axios.post(`http://localhost:5000/api/comment/comments/${id}`, { text: newComment }, { headers });

      // After successfully adding the comment, fetch comments again to update the list
      fetchComments();

      // Clear the input field
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div
      className="h-full bg-white shadow-lg p-4 rounded relative overflow-y-auto ml-5"
      style={{
        height: '750px',
        width: '560px',
        overflowY: 'scroll',
      }}
    >
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter your comment"
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-400"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded ml-1 hover:bg-blue-600"
          onClick={handleAddComment}
        >
          Comment
        </button>
      </div>
      {comments.map((comment, index) => {
        // Find the user for this comment based on comment.user._id
        const user = users.find((u) => u._id === comment.user._id);
        return (
          <div key={index} className="flex items-start mb-4">
            <img
              className="w-10 h-10 rounded-full mr-4 flex-shrink-0 object-cover"
              src={user.profileUrl} // Fixed typo here: "progileUrl" to "profileUrl"
              alt={comment.user.username}
            />
            <div>
              <p className="font-semibold">{comment.user.username} <span className="font-normal ml-1 text-gray-500 text-right">{comment.createdAt.split("T")[0]}</span></p>
              <p className="text-gray-800">{comment.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );  
};

export default Comments;
