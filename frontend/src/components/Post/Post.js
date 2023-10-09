import React, { useContext } from 'react';
import PostShowBox from './PostShowBox';
import { PostContext } from './PostContext';
import { UserContext } from '../UserContext';

const Post = () => {
  const { posts } = useContext(PostContext);
  const { users } = useContext(UserContext);

  // Function to find the user for a specific post
  const findUserForPost = (postId) => {
    return users.find((user) => user._id === postId);
  };

  const reversedPosts = [...posts].reverse();

  return (
    <div>
      {reversedPosts.map((post) => {
        const user = findUserForPost(post.user);

        if (user) {
          return <PostShowBox key={post._id} post={post} profile={user} />;
        }

        return null; // Handle cases where no matching user is found
      })}
    </div>
  );
};

export default Post;
