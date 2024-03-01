import React from 'react';
import searchicon from '../img/search.png'
import writingicon from '../img/writing.png'
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Ranking from '../components/Ranking';
import Navigation from '../components/Navigation';
import axios from 'axios'; 

const SearchBar = ({ onSearch }) => {
  return (
      <div className="font-score flex-grow flex items-center rounded-full bg-white p-2 shadow ">
          <img src={searchicon} alt='검색아이콘'className="w-5 h-5"  style={{ opacity: 0.5 }}/>
          <input
              className="w-full pl-2 py-2 text-sm focus:outline-none"
              type="text"
              placeholder="Search for a recipe..."
              onChange={(e) => onSearch(e.target.value)} 
          />
      </div>
  );
};

  
const WriteButton = () => {
  return (
    <Link to="/board/upload" className="ml-4 flex items-center justify-center rounded-full bg-white p-4 shadow write-button transition-transform duration-200 hover:scale-110">
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
        <div className="px-4 py-4">
          <h3 className="text-lg font-score font-semibold">{title}</h3>
          <p className="text-gray-500 text-sm font-score">{description}</p>
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
  
  
function Board() {
  

  const [recipes, setRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    axios.get('http://172.30.1.30:8080/board/apiTest')
      .then(response => {
        if (response.data && Array.isArray(response.data.items)) {
          const formattedData = response.data.items.map(item => ({
            postid: item.ID,
            title: item.title,
            description: item.Recipe,
            img: item.thumbnail, 
            isLiked: item.likeCount > 0, //0보다크면 하트 눌러진상태 
          }));
          setRecipes(formattedData);
        } else {
          console.error('에러 내용1:', response.data);
        }
      })
      .catch(error => {
        console.error('에러 내용2:', error);
      });
  }, []);
  




  const handleSearch = (query) => {
    if (query.length > 0) {
      const results = recipes.filter(recipe => recipe.title.includes(query));
      setSearchResults(results);
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  return (
    <div className="Board">
      <div className="bg-white px-6 py-7">
        <span className="font-undong font-bold text-3xl">People</span>
      </div>
      <div className="flex items-center mx-8 my-0">
        <SearchBar onSearch={handleSearch} />
        <WriteButton />
      </div>

      {isSearching ? (
        <div className="my-2">
          <span className="font-undong font-bold ml-8 text-2xl">
            Search Results
          </span>
          {searchResults.map((recipe) => (
            <RecipeCard
              key={recipe.postid}
              title={recipe.title}
              description={recipe.description}
              img={recipe.thumbnail}
              isLiked={recipe.isLiked}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="my-2 ml-4 mr-6">
            <Ranking />
          </div>
          <div className="my-2">
            <span className="font-undong font-bold ml-8 text-2xl">Recipe</span>
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.postid}
                title={recipe.title}
                description={recipe.description}
                img={recipe.img}
                isLiked={recipe.isLiked}
              />
            ))}
          </div>
        </>
      )}

      <footer
        style={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          maxWidth: "32rem",
        }}
      >
        <Navigation />
      </footer>
    </div>
  );
}

export default Board;