import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const PostContext = createContext();

// Create a provider component
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the posts from the backend API
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/story/stories');
        // Construct URLs for media files, handling null case
        const postsWithMediaUrls = response.data.map(post => ({
          ...post,
          mediaUrl: post.media ? `http://localhost:5000/${post.media}` : null,
        }));
        setPosts(postsWithMediaUrls);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, []);  

  // Function to update the posts
  const updatePosts = (newPosts) => {
    setPosts(newPosts);
  };

  const updatePostReaction = (postId, updatedPost) => {
    setPosts((prevPosts) => prevPosts.map((post) => (post._id === postId ? updatedPost : post)));
  };  

  // Function to update the comments in posts
  const updateComment = (id, comment) => {
    setPosts((prevPosts)=>{
      return prevPosts.map((post)=>{
        if(post._id === id){
          post.comments.push(comment)
        }
        return post
      })
    })
  }

  // Function to delete a post by ID
  const deletePost = (postId) => {
    // Implement your logic to delete the post by ID from the state
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <PostContext.Provider value={{posts, updatePosts, updatePostReaction, updateComment, deletePost}}>
      {children}
    </PostContext.Provider>
  );
};
