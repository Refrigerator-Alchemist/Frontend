import React from 'react';
import searchicon from '../img/search.png'
import writingicon from '../img/writing.png'
import heartempty from '../img/heart-empty.jpg'
import heartfilled from '../img/heart-filled.jpg'
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import Ranking from '../components/Ranking';
import Navigation from '../components/Navigation';

const SearchBar = () => {
    return (
      <div className="flex-grow flex items-center rounded-full bg-white p-2 shadow ">
        <img src={searchicon} alt='검색아이콘'className="w-5 h-5"  style={{ opacity: 0.5 }}/>
        <input
          className="w-full pl-2 py-2 text-sm focus:outline-none"
          type="text"
          placeholder="Search for a recipe..."
        />
      </div>

      //검색결과화면.. 필요
    );
  };

  
  const WriteButton = () => {
    return (
        <Link to="/board/upload/:postId" className="flex items-center justify-center rounded-full bg-white p-4 shadow" >
          <img src={writingicon} alt="쓰기아이콘" className="w-6 h-6" style={{ opacity: 0.7 }} />
        </Link>
      );
    };


    const RecipeCard = ({ postid, title, description, img, isLiked }) => {
      const [liked, setLiked] = useState(false); 
    
      const toggleLike = (event) => {
        event.stopPropagation(); 
        setLiked(!liked); 
      };
    
      return (
        <div className="flex items-center bg-white mx-5 my-2 p-4 rounded-xl shadow">
          <Link to={`/board/${postid}`} className="flex-grow flex">
            <div className="flex-none w-20 h-20 rounded-xl border-2 border-gray-300 overflow-hidden">
              <img className="w-full h-full object-cover" src={img} alt={title} />
            </div>
            <div className="px-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-gray-500 text-sm">{description}</p>
            </div>
          </Link>
          <button onClick={toggleLike} className="p-2">
            {liked ? (
              <FaHeart className="text-red-500 text-2xl" />
            ) : (
              <FaRegHeart className="text-2xl" />
            )}
          </button>
        </div>
      );
    };
    
  
  
function Board(){
  const recipes = [
    {
      title: "Vegetable Curry",
      description: "potato, Lettuce",
      img: "",
      isLiked: true,
    },
    {
      title: "Vegetable Curry",
      description: "potato, Lettuce",
      img: "",
      isLiked: true,
    },
    {
      title: "Vegetable Curry",
      description: "potato, Lettuce",
      img: "",
      isLiked: true,
    },
  ];

  return (
    <div className="Board">
        <div className="bg-white px-6 py-7">
      <h1 className="text-2xl font-bold">People</h1>
    </div>
    <div className="flex items-center mx-6 my-4">
      <SearchBar />
      <WriteButton />
    </div>


      <div className="my-2 ml-6">
        <h2 className="pl-0 pb-3 px-6 text-xl font-bold">Ranking</h2>
        {/* 랭킹 컴포넌트 */}
        <Ranking/>
      </div>

      <div className="my-2">
        <h2 className="px-6 text-xl font-bold">Recipe</h2>
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            title={recipe.title}
            description={recipe.description}
            img={recipe.img}
            isLiked={recipe.isLiked}
          />
        ))}
      </div>
      <Navigation />
    </div>
  );
};

export default Board;
