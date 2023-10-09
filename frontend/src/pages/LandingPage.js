import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.jpg';
import image from '../assets/homepage.webp';

const LandingPage = () => {
  return (
    <div className='h-screen bg-white'>
      <div className='ml-24 py-4 px-6'>
        <nav className="flex justify-between py-2 px-4">
          <img src={logo} alt="Logo" className="h-15 rounded-full" />
        </nav>
        <div className='flex items-center mb-8'>
          <div className='py-20'>
            <h1 className='text-6xl font-serif my-4 font-bold text-blue-800'>Digital Media App</h1>
            <p className='py-3 w-2/3'>A social media platform that focuses on visual content, allowing users to share photos and videos with their followers. It provides a visually appealing and interactive space for individuals, influencers, and businesses to showcase their creativity and connect with others. Users can like and comment on posts. It has become a platform for self-expression, inspiration, and discovery, where users can explore diverse interests, and be part of a larger community.</p>
            <div className='my-4'>
              <Link to='/signup'>
                <button className='rounded-2xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700'>SignUp</button>
              </Link>
              <Link to='/login'>
                <button className='rounded-2xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 ml-3'>Login</button>
              </Link>
            </div>
          </div>
          <img src={image} alt='Social Media' />
        </div>
      </div>
      {/* <hr className='border-black'/> */}
    </div>
  );
};

export default LandingPage;
