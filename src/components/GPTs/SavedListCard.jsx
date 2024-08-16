import React from 'react';
import { Link } from 'react-router-dom';

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

export default RecipeCard;