import { Link } from 'react-router-dom';
import { BiHome } from 'react-icons/bi';
import { BsGraphUp } from 'react-icons/bs';
import { RiMedal2Line } from 'react-icons/ri';
// import { FiBell } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import React, { useState } from 'react';
import LogoutButton from './Logout'
import { Transition } from 'react-transition-group';
import logo from '../assets/logo.jpg';

const Sidebar = ({ logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className="shadow-xl rounded-lg fixed inset-y-0 left-0 z-50 w-16 sm:w-64 bg-white border-r border-gray-200 transition duration-300 ease-in-out my-5 ml-12">
       <div className="flex items-center justify-center h-16 sm:h-20">
        <img src={logo} alt="Logo" className="w-12 sm:w-12" />
      </div>

      <nav className="flex flex-col flex-1">
        <Link to="/home" className="flex items-center justify-center h-14 hover:bg-gray-100">
          <BiHome className="text-xl mr-2" />
          <span className="text-xl hidden sm:block">Home</span>
        </Link>

        <Link to="/trending" className="flex items-center justify-center h-14 hover:bg-gray-100">
          <BsGraphUp className="text-xl mr-2" />
          <span className="text-xl hidden sm:block">Trending</span>
        </Link>

        <Link to="/leaderboard" className="flex items-center justify-center h-14 hover:bg-gray-100">
          <RiMedal2Line className="text-xl mr-2" />
          <span className="text-xl hidden sm:block">Leaderboard</span>
        </Link>

        <Link to="/profile" className="flex items-center justify-center h-14 hover:bg-gray-100">
          <FaUser className="text-xl mr-2" />
          <span className="text-xl hidden sm:block">Profile</span>
        </Link>

        <LogoutButton />
        {/* <Link to="/profile" className="flex items-center justify-center h-14 hover:bg-gray-100">
          <img src={user.mediaUrl} alt="Profile" className="w-12 h-12 rounded-full" />
        </Link> */}
      </nav>

      <Transition in={isOpen} timeout={300} classNames="fade" unmountOnExit>
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      </Transition>
    </aside>
  );
};

export default Sidebar;
