import React from 'react';
import { Link } from 'react-router-dom';
import { VscChromeClose } from 'react-icons/vsc';

const MyRecipe = React.forwardRef(({
  postId,
  title,
  description,
  imageUrl,
  onEdit,
  onDelete,
  showEditDeleteButtons = true,
}, ref) => {
  const maxLength = 30; // 본문의 최대 길이 설정
  const shortDescription =
    description.length > maxLength
      ? description.slice(0, maxLength) + '...'
      : description;

  return (
    <div ref={ref} className="text-black ml-6 mr-6 mt-2 w-full max-w-md relative">
      <div className="bg-white mx-2 my-2 p-4 rounded-xl shadow overflow-hidden relative flex flex-col md:flex-row">
        <Link to={`/board/${postId}`} className="flex-grow flex items-center">
          <div className="flex-none w-20 h-20 md:w-20 md:h-20 max-w-xs rounded-xl border-2 border-gray-300 overflow-hidden mr-4">
            <img
              className="w-full h-full object-cover"
              src={imageUrl}
              alt={title}
            />
          </div>
          <div className="md:pl-4 mt-4 md:mt-0">
            <h3 className="text-lg font-score font-semibold">{title}</h3>
            <p className="text-gray-500 pt-1 text-sm font-score md:max-w-xs">
              {shortDescription}
            </p>
          </div>
        </Link>
        {showEditDeleteButtons && (
          <div className="absolute top-4 right-2 flex flex-row space-x-1">
            <button
              onClick={() => onEdit(postId)}
              className="pr-3 text-sm text-gray-300"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(postId)}
              className=" text-gray-400 pr-2"
            >
              <VscChromeClose />
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default MyRecipe;
