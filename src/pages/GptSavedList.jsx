import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '../components/Pagination'; 
import Navigation from '../components/Navigation';
import { useUserState } from '../context/UserContext';

const GptSavedList = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(7);
  const user = useUserState();


  //저장한 목록 보기 
  useEffect(() => {
    toast.error('임시 에러 메시지. API 연결 전 UI 확인용.');
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://172.30.1.42:8080//recipe/myRecipe');
        setRecipes(response.data);
      } catch (error) {
        console.error('에러내용:', error);
        let message = '오류가 발생했습니다. 다시 시도해주세요.';
        if (error.response) {
          switch (error.response.status) {
            case 401:
              message = "인증되지 않은 유저입니다.";
              break;
            case 500:
              message = "레시피 목록 조회에 실패했습니다.";
              break;
            default:
              message = "알 수 없는 오류가 발생했습니다.";
              break;
          }
        }
        toast.error(message);
      }
    };
    fetchRecipes();
  }, [user.nickName]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  //레시피 카드
  const RecipeCard = ({ recipeId, foodName, ingredientList }) => {
    return (
      <div className="flex items-center bg-white mx-5 my-2 p-2 rounded-xl shadow">
        <Link to={`/recipe/myRecipe/${recipeId}`} className="flex-grow flex">
          <div className="px-4 py-4">
            <h3 className="text-lg font-score font-semibold">{foodName}</h3>
            <p className="text-gray-500 text-sm font-score">
              {ingredientList.join(', ')}
            </p>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <section className="history">
      <ToastContainer position="top-center" />
      <div className="absolute top-5 left-45 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center" onClick={() => navigate('/main')}>
        <FaArrowLeft />
      </div>
      <div className="my-2 mt-20 mb-4">
        <div className="titlebox mb-6 mt-2">
        <span className="font-score font-extrabold ml-8 text-2xl">{`${user.nickName}의 연금술 레시피`}</span>
        </div>
        {currentRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.recipeId}
            recipeId={recipe.recipeId}
            foodName={recipe.foodName}
            ingredientList={recipe.ingredientList}
          />
        ))}
        <Pagination
          currentPage={currentPage}
          recipesPerPage={recipesPerPage}
          totalRecipes={recipes.length}
          paginate={paginate}
        />
      </div>
      <footer style={{ position: 'fixed', bottom: '0', width: '100%', maxWidth: '31rem' }}>
        <Navigation />
      </footer>
    </section>
  );
};

export default GptSavedList;
