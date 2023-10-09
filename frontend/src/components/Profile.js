import React, { useState, useContext, useEffect } from 'react';
import { PostContext } from './Post/PostContext';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import PostShowBox from './Post/PostShowBox';

const Profile = () => {
  // State to track which tab (Upvotes, Downvotes, Comments, Timestamp) is active
  const [activeTab, setActiveTab] = useState('upvotes');
  const [contentType, setContentType] = useState('All');

  const { posts } = useContext(PostContext)
  const user = useSelector((state) => state.user.user);
  const profile = posts.filter((post)=> post.user === user._id)

  // State to store the profile posts based on filters
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Function to sort and update the profile posts based on the selected tab and content type
  const sortAndSetProfilePosts = (tab, type) => {
    let sortedPosts = [...profile];

    // Filter posts based on content type
  if (type === 'text') {
    sortedPosts = sortedPosts.filter((post) => post.media === null);
  } else if (type === 'video') {
    sortedPosts = sortedPosts.filter((post) => post.media && post.media.endsWith('.mp4'));
  } else if (type === 'image') {
    sortedPosts = sortedPosts.filter((post) => post.media && /\.(jpg|jpeg|png|gif)$/i.test(post.media));
  }

    // Sort posts based on the selected tab (criteria)
    if (tab === 'upvotes') {
      sortedPosts = sortedPosts.sort((a, b) => b.upvotes.length - a.upvotes.length);
    } else if (tab === 'downvotes') {
      sortedPosts = sortedPosts.sort((a, b) => b.downvotes.length - a.downvotes.length);
    } else if (tab === 'comments') {
      sortedPosts = sortedPosts.sort((a, b) => b.comments.length - a.comments.length);
    } else if (tab === 'timestamp') {
      sortedPosts = sortedPosts.reverse();
    }
    console.log(sortedPosts)

    // Update the state with the filtered and sorted profile posts
    setFilteredPosts(sortedPosts);
  };

  // Update filtered posts when activeTab or contentType changes
  useEffect(() => {
    sortAndSetProfilePosts(activeTab, contentType);
  }, [activeTab, contentType, posts]);


  return (
    <>
      <Sidebar />
      <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-xl p-6 my-5">
        <div className='flex'>
          <div className="h-40 w-40 flex flex-col items-center justify-center rounded-full overflow-hidden mx-auto mb-4">
            <img src={user.profileUrl} alt='profile' className="h-full w-full object-cover" />
          </div>
          <div className='mr-16 mt-5 text-gray-800 font-sans font-medium text-lg'>
            <p className="text-center">{user.fullname}</p>
            <p className="text-center mt-2">{user.username}</p>
            <p className="text-center mt-2">{user.email}</p>
            <p className="text-center mt-2">{user.date.split("T")[0]}</p>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 mx-2 rounded-full ${
              activeTab === 'upvotes' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('upvotes')}
          >
            Upvotes
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-full ${
              activeTab === 'downvotes' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('downvotes')}
          >
            Downvotes
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-full ${
              activeTab === 'comments' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('comments')}
          >
            Comments
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-full ${
              activeTab === 'timestamp' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('timestamp')}
          >
            Timestamp
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 mx-2 rounded-full ${
              contentType === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setContentType('text')}
          >
            Text
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-full ${
              contentType === 'image' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setContentType('image')}
          >
            Images
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-full ${
              contentType === 'video' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setContentType('video')}
          >
            Videos
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-full ${
              contentType === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setContentType('All')}
          >
            All
          </button>
        </div>
        </div>
      {filteredPosts.map((post) => (
        <PostShowBox key={post._id} post={post} profile={user} />
      ))}
    </>
  );
};


export default Profile;
