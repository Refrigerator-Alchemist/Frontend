import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const BoardDetailMain = ({
  imageUrl,
  title,
  description,
  ingredients,
  nickName,
  likeCount,
  Liked,
  toggleLike,
  accessToken,
}) => {
  return (
    <main className="pt-12 px-5">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <div className="w-full">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="p-6  flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h2 className="font-sam text-3xl md:text-3xl mt-3 font-bold">
                  {title}
                </h2>
                <div className="flex flex-col items-center">
                  <button
                    name="like"
                    aria-label="like"
                    className="p-2"
                    onClick={
                      accessToken
                        ? toggleLike
                        : () => toast.error('로그인이 필요합니다.')
                    }
                  >
                    {accessToken ? (
                      Liked ? (
                        <FaHeart className="text-red-500 text-2xl" />
                      ) : (
                        <FaRegHeart className="text-2xl opacity-100 hover:opacity-100" />
                      )
                    ) : (
                      <FaRegHeart
                        className="text-2xl opacity-20 cursor-not-allowed hover:opacity-40"
                        title="로그인이 필요합니다."
                      />
                    )}
                  </button>
                  <span className="text-sm font-score font-semibold mt-1">
                    {likeCount}
                  </span>
                </div>
              </div>
              <h3 className="font-score text-sm font-bold mt-2">
                작성자: {nickName}
              </h3>
              <div className="font-score text-md text-gray-500 my-4">
                {ingredients ? ingredients.join(' · ') : ''}
              </div>
              <div className="w-full h-0.5 bg-gray-100 my-4"></div>
              <p className="text-gray-700 font-score">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BoardDetailMain;
