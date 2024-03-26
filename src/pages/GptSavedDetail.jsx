import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Navigation from '../components/Navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IP_ADDRESS } from '../context/UserContext';

const GptSavedDetail = () => {
  const [recipeData, setRecipeData] = useState({});
  const { recipeId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = localStorage.getItem('accessToken');

  // 🚷 비로그인 유저 접근 금지
  useEffect(() => {
    if (!accessToken) {
      toast.error('마 로그인 해라ㅋㅋ');
      navigate(-1);
    }
  }, [navigate, location, accessToken]);

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
        let message = '상세 레시피 조회에 실패했습니다.';
        if (error.response) {
          switch (error.response.status) {
            case 401:
              message = 'socialId가 존재하지 않습니다.';
              break;
            case 406:
              message = '해당 recipeId가 존재하지 않습니다.';
              break;
            case 403:
              message = '해당 레시피에 대한 조회 권한이 없습니다.';
              break;
            case 500:
              message = '상세 레시피 조회에 실패했습니다.';
              break;
          }
        }
        toast.error(message);
      }
    };

    fetchRecipeData();
  }, [recipeId]);

  return (
    <>
      <div className="pt-16">
        <div
          className="absolute top-5 left-42 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
          onClick={() => navigate('/recipe/myRecipe')}
        >
          <FaArrowLeft />
        </div>

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
