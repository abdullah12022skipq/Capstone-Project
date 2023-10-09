import React, { useEffect } from 'react';
import PostUpload from "../components/PostUpload";
import Sidebar from "../components/Sidebar"
import Post from '../components/Post/Post';

const Home = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#EDF2F7";
  }, []);

  return (
      <div>
        <Sidebar />
        <PostUpload />
        <Post />
      </div>
  );
};

export default Home;
