import React, { useState, useEffect } from 'react';
import { GoHome } from 'react-icons/go';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RecipePage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { recommendId } = useParams();
  const accessToken = localStorage.getItem('accessToken');

  //gpt 레시피 결과 불러오는 함수
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://172.30.1.17:8080/recipe/recommend/${recommendId}`,
          {
            headers: {
              'Authorization-Access': accessToken,
            },
          }
        );

        
        if (response.data) {
          setTitle(response.data.foodName);
          setIngredients(response.data.ingredients);
          setSteps(response.data.recipe);
        }
      } catch (error) {
        console.error('에러내용:', error);
        if (error.response && error.response.status === 404) {
          toast.error('해당 recommendId가 존재하지 않습니다.');
        } else {
          toast.error('레시피 정보를 불러오는 중 에러가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [recommendId]);

  // gpt레시피 저장하기
  const handleSaveButtonClick = async () => {
    try {
      // 토큰이 없는 경우 에러 출력
  if (!accessToken) {
    toast.error('저장하기를 위해서는 로그인이 필요합니다.');
    return;
  }

      await axios.post(
        'http://172.30.1.17:8080/recipe/save',
        {
          foodName: title,
          ingredients: ingredients,
          recipe: steps,
        },
        {
          headers: {
            'Authorization-Access': accessToken,
          },
        }
      );
      toast.success('레시피가 성공적으로 저장되었습니다.');
      navigate('/recipe/myRecipe');
    } catch (error) {
      console.error('에러내용:', error);

      let message = '오류가 발생했습니다. 다시 시도해주세요.';
      if (error.response) {
        switch (error.response.status) {
          case 401:
            message = 'socialId가 존재하지 않습니다.';
            break;
          case 500:
            message = '레시피 저장을 실패했습니다.';
            break;
        }
      }
      toast.error(message);
    }
  };

  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <img
          src="https://media.discordapp.net/attachments/1197868473666248844/1213305395305652264/img_profile.png?ex=660772b4&is=65f4fdb4&hm=fa07101b219d5e41c1501989503c4255d4e8aaaae60a02a1f626e326ca970493&=&format=webp&quality=lossless&width=614&height=614"
          alt="로딩중"
          className="animate-bounce w-24 h-24 mb-4"
        />
        <h1 className=" font-score text-2xl font-bold text-gray-900 mb-4">
          로딩 중
        </h1>
        <button
          onClick={() => navigate('/main')}
          className=" font-score text-sm text-gray-400"
        >
          취소
        </button>
      </section>
    );
  }

  return (
    <section className="bg-white min-h-screen p-6">
      <div
        className="absolute top-5 left-30 ml-0 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/board')}
      >
        <FaArrowLeft />
      </div>
      <main className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
        <div className="md:flex">
          <div className="w-full p-4 pt-8">
            <div className="border-b-2 border-gray-100 py-2">
              <h1 className="m-4 tfont-score text-xl font-bold text-gray-800 text-center">
                {title}
              </h1>
            </div>
            <div className="mt-8 recipebox p-4 bg-gray-100 rounded-lg overflow-y-auto max-h-200">
              <h2 className="font-score text-lg font-bold text-gray-800">
                재료
              </h2>
              <ul className="py-2 flex flex-wrap">
                {ingredients.map((ingredient, index) => (
                  <ul
                    key={index}
                    className="font-score text-gray-600 mr-4 mb-2"
                  >
                    {ingredient}
                  </ul>
                ))}
              </ul>
              <h2 className="font-score text-lg font-bold text-gray-800 mt-4">
                만드는 방법
              </h2>
              <ol className="list-decimal list-inside" style={{ listStyleType: 'none' }}>
                {steps.map((step, index) => (
                  <li key={index} className="font-score text-gray-600">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
      <footer className="fixed bottom-5 left-0 right-0 px-6">
        <div
          className="mx-auto flex justify-between"
          style={{ maxWidth: '400px' }}
        >
          <button
            className="font-score bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-8 rounded-full"
            onClick={() => navigate('/recipe/recommend')}
          >
            다시 할래요
          </button>
          <button
            className="font-score bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-8 rounded-full"
            onClick={handleSaveButtonClick}
          >
            저장할래요
          </button>
        </div>
      </footer>
    </section>
  );
};

export default RecipePage;
