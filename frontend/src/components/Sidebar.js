import { BiHome } from 'react-icons/bi';
import { BsGraphUp } from 'react-icons/bs';
import { RiMedal2Line } from 'react-icons/ri';
import { FiBell } from 'react-icons/fi';
import React, { useState } from 'react';
import LogoutButton from './Logout'
import { Transition } from 'react-transition-group';
import logo from '../assets/logo.jpg';

const Sidebar = ({logout}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };<div className="shadow-md">Content with shadow</div>

  return (
   
    <aside className="shadow-xl rounded-lg fixed inset-y-0 left-0 z-50 w-16 sm:w-64 bg-white border-r border-gray-200 transition duration-300 ease-in-out my-5 ml-12">
      <div className="flex items-center justify-center h-16 sm:h-20">
        <img src={logo} alt="Logo" className="w-8 sm:w-12" />
      </div>

      <nav className="flex flex-col flex-1">
        <button
          className="flex items-center justify-center h-12 hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <BiHome className="text-2xl mr-2" />
          <span className="hidden sm:block">Home</span>
        </button>

        <button
          className="flex items-center justify-center h-12 hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <BsGraphUp className="text-xl mr-2" />
          <span className="hidden sm:block">Trending</span>
        </button>

        <button
          className="flex items-center justify-center h-12 hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <FiBell className="text-xl mr-2" />
          <span className="hidden sm:block">Engagement</span>
        </button>

        <button
          className="flex items-center justify-center h-12 hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <RiMedal2Line className="text-xl mr-2" />
          <span className="hidden sm:block">Leaderboard</span>
        </button>
        <LogoutButton />
        <button
          className="flex items-center justify-center h-12 hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <img src={logo} alt="Profile" className="w-6 h-6 rounded-full" />
        </button>
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
// import React from 'react';

// const ProfilePage = () => {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="bg-white p-8 rounded-lg shadow-md">
//         <div className="flex items-center mb-4">
//           <img
//             src="profile-picture.jpg"
//             alt="Profile Picture"
//             className="w-16 h-16 rounded-full mr-4"
//           />
//           <div>
//             <h1 className="text-2xl font-bold">John Doe</h1>
//             <p className="text-gray-600">@johndoe</p>
//           </div>
//         </div>
//         <div className="mb-4">
//           <h2 className="text-lg font-bold mb-2">Bio</h2>
//           <p className="text-gray-800">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut
//             magna ac tortor consequat vestibulum vitae vel nunc.
//           </p>
//         </div>
//         <div>
//           <h2 className="text-lg font-bold mb-2">Interests</h2>
//           <ul className="list-disc list-inside">
//             <li>Traveling</li>
//             <li>Photography</li>
//             <li>Reading</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
