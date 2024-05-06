import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import Pagination from '../components/Pagination';
import Navigation from '../components/ui/Navigation';
import { IP_ADDRESS, useUserDispatch } from '../context/UserContext';


export default function GptSavedList() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(7);

  const nickName = localStorage.getItem('nickName') || '';
  const accessToken = localStorage.getItem('accessToken');

  const navigate = useNavigate();
  const { handleError } = useUserDispatch();

  // 저장한 목록 보기
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await instance.get(`${IP_ADDRESS}/recipe/myRecipe`, {
          headers: {
            'Authorization-Access': accessToken,
          },
        });
        setRecipes(response.data);
      } catch (error) {
        handleError(error);
      }
    };

    if (accessToken) {
      fetchRecipes();
    }
  }, [accessToken, handleError]);

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
            {accessToken ? `${nickName}의 연금술 기록` : '연금술 기록'}
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
}
