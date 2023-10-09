import Sidebar from './Sidebar';
import React, { useContext, useEffect, useState } from 'react';
import PostShowBox from './Post/PostShowBox';
import { PostContext } from './Post/PostContext';
import { UserContext } from './UserContext';

const Trending = () => {
  // State to track which tab (User or Story) is active
  const [activeTab, setActiveTab] = useState('upvotes');
  const { posts } = useContext(PostContext);
  const { users } = useContext(UserContext);

  // State to store the trending posts
  const [trendingPosts, setTrendingPosts] = useState([]);

  // Function to find the user for a specific post
  const findUserForPost = (postId) => {
    return users.find((user) => user._id === postId);
  };

  // Function to sort and update the trending posts based on the selected tab
  const sortAndSetTrendingPosts = (tab) => {
    let sortedPosts = [...posts];

    // Sort posts based on the selected tab (criteria)
    if (tab === 'upvotes') {
      sortedPosts = sortedPosts.sort((a, b) => b.upvotes.length - a.upvotes.length);
    } else if (tab === 'downvotes') {
      // Implement sorting by downvotes criteria
      sortedPosts = sortedPosts.sort((a, b) => b.downvotes.length - a.downvotes.length);
      console.log(sortedPosts)
    } else if (tab === 'comments') {
      // Implement sorting by comments criteria
      sortedPosts = sortedPosts.sort((a, b) => b.comments.length - a.comments.length);
    }

    // Select the top 10 posts
    const top10 = sortedPosts.slice(0, 10);

    // Update the state with the top trending posts
    setTrendingPosts(top10);
  };

  useEffect(() => {
    // Call the sorting function when the activeTab changes
    sortAndSetTrendingPosts(activeTab);
  }, [activeTab, posts]);

  return (
    <>
      <Sidebar />
      <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-xl p-6 my-5">
        <h2 className="text-2xl font-semibold mb-4 text-center">Trending</h2>
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
        </div>
      </div>
      {trendingPosts.map((post) => {
          const user = findUserForPost(post.user);
          return <PostShowBox key={post._id} post={post} profile={user} />;
      })}
    </>
  );
};

export default Trending;
