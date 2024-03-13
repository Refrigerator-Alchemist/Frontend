import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import Pagination from '../components/Pagination'; 
import Navigation from '../components/Navigation';

const GptSavedList = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [tempRecipes, setTempRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [recipesPerPage] = useState(7); 

  // api연결 전 임시 데이터
  const initialTempRecipes = [
    { recipeId: 1, foodName: "Food 1", ingredientList: ["Ingredient 1", "Ingredient 2"], imgUrl: "https://via.placeholder.com/150" },
    { recipeId: 2, foodName: "Food 2", ingredientList: ["Ingredient 3", "Ingredient 4"], imgUrl: null },
    { recipeId: 3, foodName: "Food 3", ingredientList: ["Ingredient 1", "Ingredient 2"], imgUrl: "https://via.placeholder.com/150" },
    { recipeId: 4, foodName: "Food 4", ingredientList: ["Ingredient 3", "Ingredient 4"], imgUrl: "https://via.placeholder.com/150"},
    { recipeId: 5, foodName: "Food 5", ingredientList: ["Ingredient 1", "Ingredient 2"], imgUrl: null },
    { recipeId: 6, foodName: "Food 6", ingredientList: ["Ingredient 3", "Ingredient 4"], imgUrl: null },
    { recipeId: 7, foodName: "Food 7", ingredientList: ["Ingredient 1", "Ingredient 2"], imgUrl: "https://via.placeholder.com/150" },
    { recipeId: 8, foodName: "Food 8", ingredientList: ["Ingredient 3", "Ingredient 4"], imgUrl: null },
    { recipeId: 9, foodName: "Food 9", ingredientList: ["Ingredient 1", "Ingredient 2"], imgUrl: "https://via.placeholder.com/150" },
    { recipeId: 10, foodName: "Food 10", ingredientList: ["Ingredient 3", "Ingredient 4"], imgUrl: null },
    { recipeId: 11, foodName: "Food 11", ingredientList: ["Ingredient 1", "Ingredient 2"], imgUrl: "https://via.placeholder.com/150" },
    { recipeId: 12, foodName: "Food 12", ingredientList: ["Ingredient 3", "Ingredient 4"], imgUrl: null },
  ];

  useEffect(() => {
    setTempRecipes(initialTempRecipes);//
    
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

  const RecipeCard = ({ recipeId, foodName, ingredientList, imgUrl }) => {
    return (
      <div className="flex items-center bg-white mx-5 my-2 p-4 rounded-xl shadow">
        <Link to={`/GptSavedList/${recipeId}`} className="flex-grow flex">
          {imgUrl && (
            <div className="flex-none w-20 h-20 rounded-xl border-2 border-gray-300 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={imgUrl}
                alt={foodName}
              />
            </div>
          )}
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

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = tempRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  return (
    <section className="history">
      <div className="absolute top-5 left-45 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center" onClick={() => navigate('/main')}>
        <FaArrowLeft />
      </div>
      <div className="my-2 mt-20 mb-4">
        <span className="font-undong font-bold ml-8 text-2xl ">저장한 레시피</span>
        {currentRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.recipeId}
            recipeId={recipe.recipeId}
            foodName={recipe.foodName}
            ingredientList={recipe.ingredientList}
            imgUrl={recipe.imgUrl}
          />
        ))}

        <Pagination
          currentPage={currentPage}
          recipesPerPage={recipesPerPage}
          totalRecipes={tempRecipes.length}
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





// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaArrowLeft } from 'react-icons/fa';
// import axios from 'axios';
// import Pagination from '../components/Pagination'; 

// const GptSavedList = () => {
//   const navigate = useNavigate();
//   const [recipes, setRecipes] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1); 
//   const [recipesPerPage] = useState(7); 

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await axios.get('http://172.30.1.49:8080/MyRecipe');
//         setRecipes(response.data);
//       } catch (error) {
//         console.error('에러내용:', error);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const RecipeCard = ({ recipeId, foodName, ingredientList }) => {
//     return (
//       <div className="flex items-center bg-white mx-5 my-2 p-4 rounded-xl shadow">
//         <Link to={`/GptSavedList/${recipeId}`} className="flex-grow flex">
//           <div className="flex-none w-20 h-20 rounded-xl border-2 border-gray-300 overflow-hidden">
//             <img
//               className="w-full h-full object-cover"
//               src="https://via.placeholder.com/150"
//               alt={foodName}
//             />
//           </div>
//           <div className="px-4 py-4">
//             <h3 className="text-lg font-score font-semibold">{foodName}</h3>
//             <p className="text-gray-500 text-sm font-score">
//               {ingredientList.join(', ')}
//             </p>
//           </div>
//         </Link>
//       </div>
//     );
//   };

//   const indexOfLastRecipe = currentPage * recipesPerPage;
//   const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
//   const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <section className="history">
//       <div className="absolute top-5 left-45 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center" onClick={() => navigate('/main')}>
//         <FaArrowLeft />
//       </div>
//       <div className="my-2 mt-20 mb-4">
//         <span className="font-undong font-bold ml-8 text-2xl">저장한 레시피</span>
//         {currentRecipes.map((recipe) => (
//           <RecipeCard
//             key={recipe.recipeId}
//             recipeId={recipe.recipeId}
//             foodName={recipe.foodName}
//             ingredientList={recipe.ingredientList}
//           />
//         ))}
//         <Pagination
//           currentPage={currentPage}
//           recipesPerPage={recipesPerPage}
//           totalRecipes={recipes.length}
//           paginate={paginate}
//         />
//       </div>
//     </section>
//   );
// };

// export default GptSavedList;
