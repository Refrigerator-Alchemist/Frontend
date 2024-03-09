import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const Board = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://172.30.1.49:8080/MyRecipe');
        setRecipes(response.data);
      } catch (error) {
        console.error('에러내용:', error);
      }
    };

    fetchRecipes();
  }, []);

  const RecipeCard = ({ recipeId, foodName, ingredientList }) => { // 여기서 ingredients를 ingredientList로 수정
    return (
      <div className="flex items-center bg-white mx-5 my-2 p-4 rounded-xl shadow">
        <Link to={`/board/${recipeId}`} className="flex-grow flex">
          <div className="flex-none w-20 h-20 rounded-xl border-2 border-gray-300 overflow-hidden">
            <img className="w-full h-full object-cover" src="https://via.placeholder.com/150" alt={foodName} />
          </div>
          <div className="px-4 py-4">
            <h3 className="text-lg font-score font-semibold">{foodName}</h3>
            <p className="text-gray-500 text-sm font-score">{ingredientList.join(', ')}</p> {/* 이 부분도 ingredients에서 ingredientList로 변경 */}
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="history">
      <div
        className="absolute top-5 left-45 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center" // left-45을 left-5로 수정했습니다.
        onClick={() => navigate("/main")}
      >
        <FaArrowLeft />
      </div>
      <div className="my-2 mt-20 mb-4">
        <span className="font-undong font-bold ml-8 text-2xl">저장한 레시피 </span>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.recipeId}
            recipeId={recipe.recipeId}
            foodName={recipe.foodName}
            ingredientList={recipe.ingredientList}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
