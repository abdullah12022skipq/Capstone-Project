import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const LikeDislike = () => {
  const [thumbsUpCount, setThumbsUpCount] = useState(0);
  const [thumbsDownCount, setThumbsDownCount] = useState(0);
  const [isThumbsUpClicked, setIsThumbsUpClicked] = useState(false);
  const [isThumbsDownClicked, setIsThumbsDownClicked] = useState(false);

  const handleThumbsUpClick = () => {
    if (isThumbsUpClicked) {
      setThumbsUpCount(thumbsUpCount - 1);
    } else {
      setThumbsUpCount(thumbsUpCount + 1);
      if (isThumbsDownClicked) {
        setIsThumbsDownClicked(false);
        setThumbsDownCount(thumbsDownCount - 1);
      }
    }
    setIsThumbsUpClicked(!isThumbsUpClicked);
  };

  const handleThumbsDownClick = () => {
    if (isThumbsDownClicked) {
      setThumbsDownCount(thumbsDownCount - 1);
    } else {
      setThumbsDownCount(thumbsDownCount + 1);
      if (isThumbsUpClicked) {
        setIsThumbsUpClicked(false);
        setThumbsUpCount(thumbsUpCount - 1);
      }
    }
    setIsThumbsDownClicked(!isThumbsDownClicked);
  };

  return (
    <div className='flex justify-between items-center'>
        <button
            className={`flex items-center justify-center mt-4 ${isThumbsUpClicked ? 'text-blue-700' : 'text-blue-500' }`}
            onClick={handleThumbsUpClick}>
                <FaThumbsUp className='h-5 w-5'/>
                <span className="ml-2">{thumbsUpCount}</span>
        </button>
        <button
            className={`flex items-center justify-center mt-4 ml-3 ${isThumbsDownClicked ? 'text-red-700' : 'text-red-500' }`}
            onClick={handleThumbsDownClick}>
                <FaThumbsDown className='h-5 w-5'/>
                <span className="ml-2">{thumbsDownCount}</span>
        </button>
    </div>
  );
};

export default LikeDislike;
