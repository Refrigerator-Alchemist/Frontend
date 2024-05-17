import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../components/Pagination';
import Navigation from '../components/ui/Navigation';
import SavedListCard from '../components/gpt/SavedListCard';
import BackButton from '../components/ui/BackButton';
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
        const response = await axios.get(`${IP_ADDRESS}/recipe/myRecipe`, {
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

  return (
    <section className="history">
      <BackButton destination="/main" />
      <div className="my-2 mt-20 mb-4">
        <div className="titlebox mb-6 mt-2">
          <span className="font-score font-extrabold ml-8 text-2xl">
            {accessToken ? `${nickName}의 연금술 기록` : '연금술 기록'}
          </span>
        </div>
        {currentRecipes.map((recipe) => (
          <SavedListCard
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
