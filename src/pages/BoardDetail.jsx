import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import Navigation from '../components/Navigation';

const BoardDetail = () => {
  const [isLiked, setIsLiked] = useState(false); 
  const navigate = useNavigate();

  const postData = {
    title: "Shrimps Pasta",
    ingredients: ["potato", "Lettuce"],
    description: "음식 설명",
    image: "" 
  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="p-4 max-w-screen-md">
        <div className="flex items-center">
          <FaArrowLeft className="text-xl cursor-pointer" onClick={() => navigate(-1)} />
        </div>
        <img src={postData.image} alt={postData.title} className="mt-4 w-full h-60 object-cover rounded-lg" />
        <div className="mt-4">
          <h2 className="text-2xl font-bold">{postData.title}</h2>
          <div className="text-sm text-gray-500 my-2">{postData.ingredients.join(" · ")}</div>
          <p className="text-gray-700">{postData.description}</p>
        </div>
        <button onClick={() => setIsLiked(!isLiked)} className="mt-4">
          {isLiked ? (
            <FaHeart className="text-red-500 text-2xl" />
          ) : (
            <FaRegHeart className="text-2xl" />
          )}
        </button>
      </div>
      <Navigation /> 
    </div>
  );
};

export default BoardDetail;
