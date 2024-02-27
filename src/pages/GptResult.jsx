import React, { useState, useEffect } from 'react';
import { GoHome } from "react-icons/go";
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


// 재료 목록
const fetchIngredients = async () => {
  return ['당근 2개', '감자 2개', '물 1/4컵', '버터 약간', '소금 약간']; 
};

// 레시피 가져오는 
const fetchRecipe = async () => {
  return [
    '당근과 감자를 적당한 크기로 자르고 깨끗하게 씻는다.',
    '냄비에 물과 자른 당근을 넣고 끓여준다(15~20분).',
    '감자는 별도로, 버터와 함께 볶은 후 당근과 함께 잘 섞는다.',
    '소금으로 간을 한다.',
    '당근과 감자를 적당한 크기로 자르고 깨끗하게 씻는다.',
    '냄비에 물과 자른 당근을 넣고 끓여준다(15~20분).',
    '감자는 별도로, 버터와 함께 볶은 후 당근과 함께 잘 섞는다.',
    '소금으로 간을 한다.',
    '당근과 감자를 적당한 크기로 자르고 깨끗하게 씻는다.',
    '냄비에 물과 자른 당근을 넣고 끓여준다(15~20분).',
    '감자는 별도로, 버터와 함께 볶은 후 당근과 함께 잘 섞는다.',
    '소금으로 간을 한다.',
  ]; 
};
const fetchImageURL = async () => {
    return 'https://img.khan.co.kr/lady/r/1100xX/2023/09/06/news-p.v1.20230906.8f0993f6426340fe90c978fc1352d69e.png';
};

const fetchRecipeTitle = async () => {
    return '매쉬드 감자와 당근';
};
  

// const [recipe, setRecipe] = useState({
//     foodName: '',
//     imgUrl: '',
//     ingredients: [],
//     recipeSteps: [],
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const response = await axios.post('/recipe/recommend', {
//           ingredients: [''], 
//         });

//         if (response.data) {
//           setRecipe({
//             foodName: response.data.foodName,
//             imgUrl: response.data.imgUrl,
//             ingredients: response.data.ingredients,
//             recipeSteps: response.data.recipe,
//           });
//         }
//       } catch (error) {
//         console.error('error:', error);
//       }
//     };

//     fetchRecipe();
//   }, []);


  const RecipePage = () => {
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const ingredientsData = await fetchIngredients();
          const recipeData = await fetchRecipe();
          const titleData = await fetchRecipeTitle();
          const imageURLData = await fetchImageURL();
  
          setIngredients(ingredientsData);
          setSteps(recipeData);
          setTitle(titleData);
          setImage(imageURLData);

        } catch (error) {
          console.error('Error :', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
        <div className="bg-white min-h-screen p-6">
          <div className="absolute top-5 left-30 ml-0 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center" onClick={() => navigate('/board')}>
            <FaArrowLeft />
          </div>
          <button onClick={() => navigate('/main')} className="fixed top-5 right-5 ml-0 border-2 w-10 h-10 text-2xl transition ease-in-out delay-150 bg-white hover:scale-125 hover:cursor-pointer hover:text-black rounded-full flex items-center justify-center" title="Go Home">
            <GoHome />
          </button>
          <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
            <div className="md:flex">
              <div className="w-full p-4 pt-8">
                <div className="border-b-2 border-gray-100 py-2">
                  <h1 className="text-2xl font-bold text-gray-800 text-center">{title}</h1>
                  
                </div>
                <div className="py-4">
                <img className="w-full h-70 rounded-lg" src={image} alt="Recipe" />

                </div>
                <div className="recipebox p-4 bg-gray-100 rounded-lg overflow-y-auto max-h-96">
                  <h2 className="text-lg font-bold text-gray-700">재료</h2>
                  <ul className="py-2">
                    {ingredients.map((ingredient, index) => (
                      <li key={index} className="text-gray-600">{ingredient}</li>
                    ))}
                  </ul>
                  <h2 className="text-lg font-bold text-gray-700 mt-4">만드는 방법</h2>
                  <ol className="list-decimal list-inside">
                    {steps.map((step, index) => (
                      <li key={index} className="text-gray-600">{step}</li>
                    ))}
                  </ol>
                </div>
                
                <div className="fixed bottom-5 left-0 right-0 px-6">
  <div className="mx-auto flex gap-14" style={{ maxWidth: '400px' }}>
    <button className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-8 rounded-full" onClick={() => navigate('/gptsearch')}>
      다시 할래요
    </button>
    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-8 rounded-full" onClick={() => navigate('/mypage')}>
      저장할래요
    </button>
  </div>
</div>





              </div>
            </div>
          </div>
        </div>
      );
      
  };
  
  export default RecipePage;