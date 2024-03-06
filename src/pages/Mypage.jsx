import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Navigation from '../components/Navigation';
import axios from 'axios';
import { useUserDispatch } from '../context/User';

const RecipeCard = ({
  postid,
  title,
  description,
  img,
  isLiked,
  onToggleLike,
}) => {
  return (
    <div className="bg-white h-auto text-black ml-6 mr-6">
      <div className="flex bg-white mx-2 my-2 p-4 rounded-xl shadow">
        <Link to={`/board/${postid}`} className="flex-grow flex">
          <div className="flex-none w-20 h-20 rounded-xl border-2 border-gray-300 overflow-hidden">
            <img className="w-full h-full object-cover" src={img} alt={title} />
          </div>
          <div className="px-4">
            <h3 className="text-lg font-score font-semibold">{title}</h3>
            <p className="text-gray-500 text-sm font-score">{description}</p>
          </div>
        </Link>
        {/* <button onClick={onToggleLike} className="p-2">
          {isLiked ? (
            <FaHeart className="text-red-500 text-2xl" />
          ) : (
            <FaRegHeart className="text-2xl" />
          )}
        </button> */}
      </div>
    </div>
  );
};

function MyPage() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [showSavedRecipes, setShowSavedRecipes] = useState(false);
  const navigate = useNavigate();

  const toggleLike = (recipeTitle) => {
    let newSavedRecipes;
    if (savedRecipes.includes(recipeTitle)) {
      newSavedRecipes = savedRecipes.filter((title) => title !== recipeTitle);
    } else {
      newSavedRecipes = [...savedRecipes, recipeTitle];
    }
    setSavedRecipes(newSavedRecipes);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          showSavedRecipes
            ? 'http://172.30.1.30:8080/board/myLike' // 좋아요누른  
            : 'http://172.30.1.30:8080/board/myList'  //저장한 
        );
        if (response.data && Array.isArray(response.data.items)) {
          const formattedData = response.data.items.map((item) => ({
            postid: item.ID,
            title: item.title,
            description: item.Recipe,
            img: item.thumbnail,
            isLiked: savedRecipes.includes(item.title),
          }));
          setRecipes(formattedData);
        } else {
          console.error('Error:', response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [showSavedRecipes, savedRecipes]);

  const { logout } = useUserDispatch();

  return (
    <div className="Board flex items-center justify-center">
      <div className="flex flex-col items-center overflow-hidden">
        <div className="flex justify-end w-full mt-2 space-x-2">
          <button
            className="font-score text-gray-300"
            onClick={(e) => {
              e.preventDefault();
              navigate('/mypage/delete-user');
            }}
          >
            회원 탈퇴
          </button>
          <button
            className="font-score outline-none font-semibold underline underline-offset-2 hover:text-red-500"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            로그아웃
          </button>
        </div>
        <div className="bg-gray-300 rounded-full h-32 w-32 mt-20">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="프로필 사진"
            className="rounded-full h-32 w-32 object-cover"
          />
        </div>
        <h1 className="font-score mt-5 text-xl font-semibold text-center">user1</h1>
        <p className="font-score mt-4 pb-4\2 px-6 text-center">한줄 자기소개</p>
        <button
          onClick={() => navigate('/profile')}
          className="font-score my-2 bg-white text-gray-400 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 underline"
        >
          회원정보 수정
        </button>

        <div className="flex">
          <button
            onClick={() => setShowSavedRecipes(false)}
            className={`font-score mx-1 py-2 px-4 rounded ${
              !showSavedRecipes
                ? 'bg-main text-white'
                : 'bg-gray-100 text-black'
            }`}
          >
            내가 쓴 레시피 보기
          </button>
          <button
            onClick={() => setShowSavedRecipes(true)}
            className={`font-score mx-1 py-2 px-4 rounded ${
              showSavedRecipes ? 'bg-main text-white' : 'bg-gray-100 text-black'
            }`}
          >
            좋아한 레시피 보기
          </button>
        </div>

        <div className="recipe-card-container" style={{ width: '120%' }}>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.postid}
              postid={recipe.postid}
              title={recipe.title}
              description={recipe.description}
              img={recipe.img}
              isLiked={recipe.isLiked}
              onToggleLike={() => toggleLike(recipe.title)}
            />
          ))}
        </div>
      </div>
      <footer
        style={{
          position: 'fixed',
          bottom: '0',
          width: '100%',
          maxWidth: '32rem',
        }}
      >
        <Navigation />
      </footer>
    </div>
  );
}

export default MyPage;


