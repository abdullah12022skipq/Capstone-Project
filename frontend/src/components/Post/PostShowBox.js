import React, { useState, useEffect, useRef, useContext } from 'react';
import profilePic from '../../assets/26.jpeg';
import LikeDislike from './LikeDislike';
import { useNavigate } from 'react-router-dom';
import { FaComment, FaEllipsisV } from 'react-icons/fa';
import Comments from './Comments';
import { PostContext } from './PostContext';

const PostShowBox = () => {
  const post = useContext(PostContext);
    post.map((a)=>console.log(a))
  const navigate = useNavigate();
  const singlePostUrl = () => {
    if (showComments) {
      return;
    }
    navigate('/singlepost');
  };
  const [showComments, setShowComments] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const menuRef = useRef(null);

  const handleOptionsMenuClick = () => {
    setShowOptionsMenu(!showOptionsMenu);
  };
  const handleCommentButtonClick = () => {
    setShowComments(!showComments);
  };
  const handleDeletePost = () => {
    // Code to delete the post goes here
    // You can add an appropriate logic or API call to delete the post
    console.log('Delete post');
  };

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowOptionsMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  
  useEffect(() => {
    // Check if the current path is /singlepost
    // If yes, then show the comments
    const currentPath = window.location.pathname;
    if (currentPath === '/singlepost') {
      setShowComments(true);
    }
  }, []);

  return (
    <div className="container mx-auto flex justify-center mt-5 cursor-pointer">
      <div className="bg-white rounded-lg shadow-xl p-6 w-1/2 max-w-xl" style={{ maxHeight: "550px" }}>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">John Doe</h2>
                <p className="text-gray-600">@johndoe</p>
              </div>
            </div>
            <div className="relative" ref={menuRef}>
              <button className="text-gray-600 hover:text-gray-800" onClick={handleOptionsMenuClick}>
                <FaEllipsisV />
              </button>
              {showOptionsMenu && (
                <div className="border-2 border-gray-200 absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-lg">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100" onClick={handleDeletePost}>
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4" onClick={singlePostUrl}>
            <p>
            I stand in the dark alleyway, a cigarette in my hand. I am dressed in my signature suit, with a black overcoat and a flat cap. My expression is hard and determined, and my eyes are cold and calculating.
            </p>
          </div>
          <div className="mt-4" onClick={singlePostUrl}>
            {/* <iframe
              src="https://www.youtube.com/embed/aswHIcaR1ts"
              allowfullscreen
              title="This is a YouTube video."
              className="shadow-xl mx-auto rounded"
            /> */}
            <img
              src={profilePic}
              alt="Post"
              className="shadow-xl mx-auto rounded"
              style={{maxHeight: "320px", maxWidth: "460px" }}
            />
          </div>

          <div className="flex">
            <LikeDislike />
            <button className="text-blue-500 hover:text-blue-700 flex" onClick={()=>{handleCommentButtonClick(); singlePostUrl();}}>
              <FaComment className="h-5 w-5 ml-3 mt-4" />
              <span className="ml-2 mt-4">0</span>
            </button>
          </div>
        </div>
      </div>
      {showComments && <Comments />}
    </div>
  );
};

export default PostShowBox;


// import React, { useState, useEffect, useRef } from 'react';
// import profilePic from '../../assets/26.jpeg';
// import LikeDislike from './LikeDislike';
// import { useNavigate } from 'react-router-dom';
// import { FaComment, FaEllipsisV } from 'react-icons/fa';
// import Comments from './Comments';

// const PostShowBox = () => {
//   const navigate = useNavigate();
//   const singlePostUrl = (postId) => {
//     if (showComments) {
//       return;
//     }
//     navigate(`/singlepost/${postId}`);
//   };
//   const [showComments, setShowComments] = useState(false);
//   const [showOptionsMenu, setShowOptionsMenu] = useState(false);
//   const menuRef = useRef(null);

//   const handleOptionsMenuClick = () => {
//     setShowOptionsMenu(!showOptionsMenu);
//   };
//   const handleCommentButtonClick = () => {
//     setShowComments(!showComments);
//   };
//   const handleDeletePost = () => {
//     // Code to delete the post goes here
//     // You can add an appropriate logic or API call to delete the post
//     console.log('Delete post');
//   };

//   const handleOutsideClick = (event) => {
//     if (menuRef.current && !menuRef.current.contains(event.target)) {
//       setShowOptionsMenu(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('click', handleOutsideClick);
//     return () => {
//       window.removeEventListener('click', handleOutsideClick);
//     };
//   }, []);

//   useEffect(() => {
//     // Check if the current path is /singlepost
//     // If yes, then show the comments
//     const currentPath = window.location.pathname;
//     if (currentPath.includes('/singlepost/')) {
//       setShowComments(true);
//     }
//   }, []);

//   const posts = [
//     {
//       id: 1,
//       title: 'This is a post with an image',
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae justo quam. Integer eu arcu ut justo vestibulum sagittis. Ut id urna vitae leo congue consectetur.',
//       image: profilePic,
//     },
//     {
//       id: 2,
//       title: 'This is a post with a video',
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae justo quam. Integer eu arcu ut justo vestibulum sagittis. Ut id urna vitae leo congue consectetur.',
//       videoUrl: 'https://www.youtube.com/embed/aswHIcaR1ts',
//     },
//     {
//       id: 3,
//       title: 'This is a post with text only',
//       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae justo quam. Integer eu arcu ut justo vestibulum sagittis. Ut id urna vitae leo congue consectetur.',
//     },
//   ];

//   const currentPost = posts.find((post) => post.id === parseInt(window.location.pathname.split('/singlepost/')[1]));
//   if (!currentPost) {
//     return null;
//   }

//   return (
//     <div className="container mx-auto flex justify-center mt-5 cursor-pointer">
//       <div className="bg-white rounded-lg shadow-xl p-6 w-1/2 max-w-xl" style={{ maxHeight: "550px" }}>
//         <div className="flex flex-col">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <img
//                 src={currentPost.image}
//                 alt="Profile"
//                 className="w-10 h-10 rounded-full object-cover mr-4"
//               />
//               <div>
//                 <h2 className="text-lg font-semibold">{currentPost.title}</h2>
//                 <p className="text-gray-600">@johndoe</p>
//               </div>
//             </div>
//             <div className="relative" ref={menuRef}>
//               <button className="text-gray-600 hover:text-gray-800" onClick={handleOptionsMenuClick}>
//                 <FaEllipsisV />
//               </button>
//               {showOptionsMenu && (
//                 <div className="border-2 border-gray-200 absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-lg">
//                   <ul className="py-2">
//                     <li className="px-4 py-2 hover:bg-gray-100" onClick={handleDeletePost}>
//                       Delete
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//           {currentPost.image && (
//             <div className="mt-4" onClick={() => singlePostUrl(currentPost.id)}>
//               <img
//                 src={currentPost.image}
//                 alt="Post"
//                 className="shadow-xl mx-auto rounded"
//                 style={{maxHeight: "320px", maxWidth: "460px" }}
//               />
//             </div>
//           )}
//           {currentPost.videoUrl && (
//             <div className="mt-4" onClick={() => singlePostUrl(currentPost.id)}>
//               <iframe
//                 src={currentPost.videoUrl}
//                 allowfullscreen
//                 title="This is a YouTube video."
//                 className="shadow-xl mx-auto rounded"
//               />
//             </div>
//           )}
//           {currentPost.content && (
//             <div className="mt-4" onClick={() => singlePostUrl(currentPost.id)}>
//               <p>{currentPost.content}</p>
//             </div>
//           )}

//           <div className="flex">
//             <LikeDislike />
//             <button className="text-blue-500 hover:text-blue-700 flex" onClick={handleCommentButtonClick}>
//               <FaComment className="h-5 w-5 ml-3 mt-4" />
//               <span className="ml-2 mt-4">0</span>
//             </button>
//           </div>
//         </div>
//       </div>
//       {showComments && <Comments />}
//     </div>
//   );
// };

// export default PostShowBox;
