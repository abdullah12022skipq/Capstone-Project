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
        const response = await axios.get('http://localhost:5000/api/story/stories'); // Replace '/api/posts' with your actual API endpoint
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={posts}>
      {children}
    </PostContext.Provider>
  );
};
