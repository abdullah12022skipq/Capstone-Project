import React, { useEffect } from 'react';
import PostShowBox from "../components/Post/PostShowBox";
import PostUpload from "../components/PostUpload";
import Sidebar from "../components/Sidebar"

const Home = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#EDF2F7";
  }, []);

  return (
      <div>
        <Sidebar />
        <PostUpload />
        <PostShowBox />
      </div>
  );
};

export default Home;
