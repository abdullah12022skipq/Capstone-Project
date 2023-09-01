import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/PrivateRoute';
import Comments from './components/Post/Comments';
import SoloPost from './components/Post/SoloPost';
import { PostProvider } from './components/Post/PostContext';

const App = () => {
  return (
    <PostProvider> {/* Wrap the components that need access to the posts data with the PostProvider */}
      <Routes>
        <Route path='/test' element={<Comments />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupPage />} exact/>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<PrivateRoute />} >
          <Route path='/home' element={<HomePage />} exact/>
          <Route path='/singlepost' element={<SoloPost />} /> {/* Update the route path to include the postId  /singlepost/:postId  */}
        </Route>
      </Routes>
    </PostProvider>

  );
};

export default App;
