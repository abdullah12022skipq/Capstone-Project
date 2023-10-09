import React, { useState, useContext, useEffect } from 'react';
import { PostContext } from './Post/PostContext';
import { UserContext } from './UserContext';
import Sidebar from './Sidebar';
import PostShowBox from './Post/PostShowBox';

const LeaderBoard = () => {
  const [activeTab, setActiveTab] = useState('user');
  const { users }= useContext(UserContext);
  const { posts } = useContext(PostContext);

  // State to store the top 10 posts based on upvotes + comments
  const [top10Posts, setTop10Posts] = useState([]);

  useEffect(() => {
    // Function to calculate the sum of upvotes and comments for a post
    const calculatePostScore = (post) => {
      return post.upvotes.length + post.comments.length;
    };

    // Sort posts based on the calculated score (upvotes + comments)
    const sortedPosts = [...posts].sort((a, b) => calculatePostScore(b) - calculatePostScore(a));

    // Select the top 10 posts
    const top10 = sortedPosts.slice(0, 10);

    setTop10Posts(top10);
  }, [posts]);

  // Function to calculate the score for a user
  const calculateUserScore = (user) => {
    // Filter posts by the current user
    const userPosts = posts.filter((post) => post.user === user._id);

    // Calculate total upvotes and comments across all user's stories
    let totalUpvotes = 0;
    let totalComments = [];

    userPosts.forEach((post) => {
      totalUpvotes += post.upvotes.length;
      totalComments = totalComments.concat(post.comments);
    });

    // Calculate the score based on the formula
    const score = (totalUpvotes + totalComments.length) / 2 + user.stories.length;

    return score;
  };

  // Sort users by their score in descending order
  const sortedUsers = [...users].sort((a, b) => calculateUserScore(b) - calculateUserScore(a));

  // Select the top 10 users
  const top10Users = sortedUsers.slice(0, 10);

  // Function to find the user for a specific post
  const findUserForPost = (postId) => {
    return users.find((user) => user._id === postId);
  };

  return (
    <>
      <Sidebar />
      <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-xl p-6 my-5">
        <h2 className="text-2xl font-semibold mb-4 text-center">Leaderboard</h2>
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 mx-2 rounded-full ${
              activeTab === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('user')}
          >
            Users
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-full ${
              activeTab === 'story' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('story')}
          >
            Stories
          </button>
        </div>
        <ul>
          {activeTab === 'user' &&
            top10Users.map((user) => {
              const score = calculateUserScore(user);

              return (
                <li
                  key={user._id}
                  className="flex items-center justify-between py-2 border-b border-gray-200"
                >
                  <div className="flex items-center">
                    <div className="h-60 w-60 rounded-full overflow-hidden mr-2">
                      <img
                        src={user.profileUrl}
                        alt={`${user.username}'s Profile`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-gray-600">
                      <ul>
                        <li>
                          <span className="font-semibold">{user.fullname}</span>
                        </li>
                        <li>
                          Score: <span className="font-semibold">{score}</span>
                        </li>
                        <li>{user.stories.length} Stories</li>
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      {activeTab === 'story' &&
        top10Posts.map((post) => {
          const user = findUserForPost(post.user);
          return <PostShowBox key={post._id} post={post} profile={user} />;
        })}
    </>
  );
};

export default LeaderBoard;
