import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/PrivateRoute';
import { PostProvider } from './components/Post/PostContext';
import LeaderBoard from './components/Leaderboard';
import Trending from './components/Trending';
import Profile from './components/Profile';
import SoloPost from './components/Post/SoloPost';
import { UserProvider } from './components/UserContext';

const App = () => {
  return (
    <UserProvider>
    <PostProvider> {/* Wrap the components that need access to the posts data with the PostProvider */}
      <Routes>
        <Route path='/test' element={<Profile />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupPage />} exact/>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<PrivateRoute />} >
          <Route path='/home' element={<HomePage />} exact/>
          <Route path='/post/:postId' element={<SoloPost />} /> {/* Update the route path to include the postId  /singlepost/:postId  */}
          <Route path='/leaderboard' element={<LeaderBoard />} />
          <Route path='/trending' element={<Trending />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </PostProvider>
    </UserProvider>

  );
};

export default App;