import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from '../components/Pagination';
import Navigation from '../components/Navigation';
import { IP_ADDRESS } from '../context/UserContext';

const GptSavedList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(7);

  const nickname = localStorage.getItem('nickName') || '';
  const accessToken = localStorage.getItem('accessToken');

  const navigate = useNavigate();

  //저장한 목록 보기
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${IP_ADDRESS}/recipe/myRecipe`, {
          headers: {
            'Authorization-Access': accessToken,
          },
        });
        setRecipes(response.data);
      } catch (error) {
        console.error('에러내용:', error);
        console.log('에러 상태 코드:', error.response?.status);
        const statusCode = error.response?.status;

        if (statusCode === 401) {
          // 🚷 비로그인 유저 접속 차단
          toast.error('로그인을 먼저 해야합니다');
        } else if (statusCode === 500) {
          toast.error('레시피 목록 조회에 실패했습니다.');
        } else {
          toast.error('서버와의 연결에 실패했습니다.');
        }
      }
    };

    if (accessToken) {
      fetchRecipes();
    }
  }, [accessToken]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
      <div
        className="absolute top-5 left-45 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/main')}
      >
        <FaArrowLeft />
      </div>
      <div className="my-2 mt-20 mb-4">
        <div className="titlebox mb-6 mt-2">
          <span className="font-score font-extrabold ml-8 text-2xl">
            {accessToken ? `${nickname}의 연금술 기록` : '연금술 기록'}
          </span>
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
      <footer
        style={{
          position: 'fixed',
          bottom: '0',
          width: '100%',
          maxWidth: '31rem',
        }}
      >
        <Navigation />
      </footer>
    </section>
  );
};
export default GptSavedList;
