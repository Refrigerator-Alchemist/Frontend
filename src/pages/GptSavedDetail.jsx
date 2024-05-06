import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../components/ui/Navigation';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { IP_ADDRESS, useUserDispatch } from '../context/UserContext';


const GptSavedDetail = () => {
  const [recipeData, setRecipeData] = useState({});
  const { recipeId } = useParams();

  const accessToken = localStorage.getItem('accessToken');

  const navigate = useNavigate();
  const { handleError } = useUserDispatch();

  // id로 세부내용 불러오기
  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        if (!recipeId) {
          throw new Error('Recipe ID가 존재하지 않습니다.');
        }

        const response = await axios.get(
          `${IP_ADDRESS}/recipe/myRecipe/${recipeId}`,
          {
            headers: {
              'Authorization-Access': accessToken,
            },
          }
        );
        setRecipeData(response.data);
      } catch (error) {
        handleError(error);
      }
    };

    if (accessToken) fetchRecipeData();
  }, [recipeId, accessToken, handleError]);

  return (
    <>
      <div className="pt-16">
        <BackButton destination="/main"/>
        <div className="flex flex-col items-center mt-10">
          <div className="flex items-center gap-4">
            <h2 className="font-score text-3xl font-bold">
              {recipeData.foodName}
            </h2>
          </div>
          <div className="font-score text-lg text-gray-500 my-8">
            {recipeData.ingredients ? recipeData.ingredients.join(' · ') : ''}
          </div>
          <div className="text-gray-700 font-score mt-6 m-6 p-5">
            {recipeData.recipe &&
              recipeData.recipe.map((step, index) => <p key={index}>{step}</p>)}
          </div>
        </div>
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
    </>
  );
};

export default GptSavedDetail;
