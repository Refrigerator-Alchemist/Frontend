import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/UI/Navigation';
import SavedListCard from '../components/Gpt/SavedListCard';
import BackButton from '../components/UI/BackButton';
import { IP_ADDRESS, useUserApi } from '../context/UserContext';

export default function GptSavedList() {
  const [recipes, setRecipes] = useState([]);

  const nickName = localStorage.getItem('nickName') || '';
  const accessToken = localStorage.getItem('accessToken');

  const { handleError } = useUserApi();

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

  return (
    <section className="history">
      <BackButton destination="/main" />
      <div className="my-2 mt-20 mb-4">
        <div className="titlebox mb-6 mt-2">
          <span className="font-score font-extrabold ml-8 text-2xl">
            {accessToken ? `${nickName}의 연금술 기록` : '연금술 기록'}
          </span>
        </div>
        {recipes.map((recipe) => (
          <SavedListCard
            key={recipe.recipeId}
            recipeId={recipe.recipeId}
            foodName={recipe.foodName}
            ingredientList={recipe.ingredientList}
          />
        ))}
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
