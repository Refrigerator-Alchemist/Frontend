import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const LikedRecipe = React.forwardRef(({ postId, title, description, imageUrl }, ref) => {
  const maxLength = 25; // 본문의 최대 길이 설정
  const shortDescription =
    description.length > maxLength
      ? description.slice(0, maxLength) + '...'
      : description;

  return (
    <div ref={ref} className="text-black ml-6 mr-6 mt-2 w-full max-w-md">
      <div className="bg-white mx-2 my-1 p-2 rounded-xl shadow overflow-hidden relative flex flex-col">
        <Link
          to={`/board/${postId}`}
          className="flex flex-grow items-center justify-between"
        >
          <div className="flex items-center">
            <div className="flex-none w-20 h-20 max-w-xs rounded-xl border-2 border-gray-300 overflow-hidden mr-4">
              <img
                className="w-full h-full object-cover"
                src={imageUrl}
                alt={title}
              />
            </div>
            <div className=" mt-3">
              <h3 className="text-lg font-score font-semibold">{title}</h3>
              <p className="text-gray-500 pt-1 text-sm font-score md:max-w-xs">
                {shortDescription}
              </p>
            </div>
          </div>
          <div className="heart-icon-container">
            <FaHeart className="text-red-500 text-2xl heart-icon" />
          </div>
        </Link>
      </div>
    </div>
  );
});

export default LikedRecipe;
