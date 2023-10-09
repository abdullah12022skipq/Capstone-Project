import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the posts from the backend API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/getallusers');
        // Construct URLs for media files
        const userdata = response.data.map(post => ({
          ...post,
          profileUrl: `http://localhost:5000/${post.image}`, // Assuming 'media' contains the path
        }));
        setUsers(userdata);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchUsers();
  }, []);

  //Function to add new user to user context
  const updateUser = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser])
  }

  return (
    <UserContext.Provider value={{users, updateUser}}>
      {children}
    </UserContext.Provider>
  );
};
