import React from 'react';
import pic from '../../assets/26.jpeg';

const Comments = () => {
  // Manually provide the comments data
  const comments = [
    {
      author: {
        name: 'John Doe',
        avatarUrl: pic,
      },
      text: 'Great post! dfgdf sdfgdf sdger sdfgsdfg sdfgs asdfasdf rfwerfw asdfasdf asdfasdf asdfasdf ewrfger',
    },
    {
      author: {
        name: 'Jane Smith',
        avatarUrl: pic,
      },
      text: 'I agree with you Great post! dfgdf sdfgdf sdger sdfgsdfg sdfgs asdfasdf rfwerfw asdfasdf asdfasdf asdfasdf ewrfger.',
    },
    {
      author: {
        name: 'John Doe',
        avatarUrl: pic,
      },
      text: 'Great post! dfgdf sdfgdf sdger sdfgsdfg sdfgs asdfasdf rfwerfw asdfasdf asdfasdf asdfasdf ewrfger',
    },
    {
      author: {
        name: 'Jane Smith',
        avatarUrl: pic,
      },
      text: 'I agree with you.',
    },
    {
      author: {
        name: 'John Doe',
        avatarUrl: pic,
      },
      text: 'Great post! dfgdf sdfgdf sdger sdfgsdfg sdfgs asdfasdf rfwerfw asdfasdf asdfasdf asdfasdf ewrfger',
    },
    {
      author: {
        name: 'Jane Smith',
        avatarUrl: pic,
      },
      text: 'I agree with you.',
    },
    {
      author: {
        name: 'John Doe',
        avatarUrl: pic,
      },
      text: 'Great post! dfgdf sdfgdf sdger sdfgsdfg sdfgs asdfasdf rfwerfw asdfasdf asdfasdf asdfasdf ewrfger',
    },
    {
      author: {
        name: 'Jane Smith',
        avatarUrl: pic,
      },
      text: 'I agree with you.',
    },
    {
      author: {
        name: 'John Doe',
        avatarUrl: pic,
      },
      text: 'Great post! dfgdf sdfgdf sdger sdfgsdfg sdfgs asdfasdf rfwerfw asdfasdf asdfasdf asdfasdf ewrfger',
    },
    {
      author: {
        name: 'Jane Smith',
        avatarUrl: pic,
      },
      text: 'I agree with you.',
    },
    {
      author: {
        name: 'John Doe',
        avatarUrl: pic,
      },
      text: 'Great post! dfgdf sdfgdf sdger sdfgsdfg sdfgs asdfasdf rfwerfw asdfasdf asdfasdf asdfasdf ewrfger',
    },
    {
      author: {
        name: 'Jane Smith',
        avatarUrl: pic,
      },
      text: 'I agree with you.',
    },
    // Add more comments here...
  ];

  return (
    <div
      className="h-full bg-white shadow-lg p-4 rounded relative overflow-y-auto ml-5"
      style={{
        height: "750px",
        width: "560px",
        overflowY: "scroll",
      }}
    >
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      <div class="flex mb-4">
        <input type="text" placeholder="Enter your comment" class="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-400" />
        <button class="px-4 py-2 bg-blue-500 text-white rounded ml-1 hover:bg-blue-600">Comment</button>
      </div>
      {comments.map((comment, index) => (
        <div key={index} className="flex items-start mb-4">
          <img
            className="w-10 h-10 rounded-full mr-4 flex-shrink-0 object-cover"
            src={comment.author.avatarUrl}
            alt={comment.author.name}
          />
          <div>
            <p className="font-semibold">{comment.author.name} <span className="font-normal ml-1 text-gray-500 text-right">july 3</span></p>
            <p className="text-gray-800">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
