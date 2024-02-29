import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import Navigation from '../components/Navigation';

const BoardDetail = () => {
  const [isLiked, setIsLiked] = useState(false); 
  const navigate = useNavigate();

  const postData = {
    rank: 1,
    thumbnail: "https://img.khan.co.kr/lady/r/1100xX/2023/09/06/news-p.v1.20230906.8f0993f6426340fe90c978fc1352d69e.png",
    title: "계란말이김밥 - 페이지 미완 ",
    ingredients: ["계란", "당근", "쪽파", "김"],
    likes: 47,
    description: `간단한 설명`, 
  };

  return (
    <>
      <div className="pt-16">
        <div
          className="absolute top-5 left-42 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
          onClick={() => navigate("/board")}
        >
          <FaArrowLeft />
        </div>
        <img
          src={postData.thumbnail}
          alt={postData.title}
          className="mt-10 mb-4 w-80 h-60 object-cover rounded-lg mx-auto sm:w-80"
        />

        <div className="flex flex-col items-center">
          <h2 className="font-score text-2xl font-bold mt-4">
            {postData.title}
          </h2>
          <div className="font-score text-sm text-gray-500 my-2">
            {postData.ingredients.join(" · ")}
          </div>
          <p className="text-gray-700 font-score">{postData.description}</p>
          <button onClick={() => setIsLiked(!isLiked)} className="mt-4">
            {isLiked ? (
              <FaHeart className="text-red-500 text-2xl" />
            ) : (
              <FaRegHeart className="text-2xl" />
            )}
          </button>
        </div>

        <div></div>
      </div>
    </>
  );
}

export default BoardDetail;