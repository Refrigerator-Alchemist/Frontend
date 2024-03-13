// //저장한 레시피 - 상세페이지 
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { FaArrowLeft } from 'react-icons/fa';
// import Navigation from '../components/Navigation';
// import axios from 'axios';

// const GptSavedDetail = () => {
//   const [postData, setPostData] = useState({});
//   const { recipeId} = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPostData = async () => {
//       try {
//         const response = await axios.get(`http://172.30.1.49:8080/myRecipe/${recipeId}`);

//         const postDataFromServer = response.data;
    
//         const postData = {
//           title: postDataFromServer.foodName,
//           img: postDataFromServer.imgUrl,
//           ingredients: postDataFromServer.ingredients,
//           description: postDataFromServer.recipe.join('\n'),
//         };
//         setPostData(postData);
//       } catch (error) {
//         console.error('에러내용:', error);
//       }
//     };

//     fetchPostData();
//   }, [recipeId]);

//   return (
//     <>
//       <div className="pt-16">
//         <div
//           className="absolute top-5 left-42 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
//           onClick={() => navigate('/gptsavedlist')}
//         >
//           <FaArrowLeft />
//         </div>
//         <img
//           src={postData.img}
//           alt={postData.title}
//           className="mt-10 mb-4 w-80 h-60 object-cover rounded-lg mx-auto"
//         />

//         <div className="flex flex-col items-center mt-8">
//           <div className="flex items-center gap-4">
//             <h2 className="font-score text-2xl font-bold">{postData.title}</h2>
        
//           </div>
//           <div className="font-score text-lg text-gray-500 my-2">
//             {postData.ingredients ? postData.ingredients.join(' · ') : ''}
//           </div>
//           <p className="text-gray-700 font-score mt-6">{postData.description}</p>
//         </div>
//       </div>
//       <footer
//         style={{
//           position: 'fixed',
//           bottom: '0',
//           width: '100%',
//           maxWidth: '31rem',
//         }}
//       >
//         <Navigation />
//       </footer>
//     </>
//   );
// };

// export default GptSavedDetail;






// 위코드는 api연결코드- 아래코드는 임시데이터 ui수정용 
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Navigation from '../components/Navigation';
import axios from 'axios';

const GptSavedDetail = () => {
  const [recipeData, setRecipeData] = useState({});
  const { recipeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await axios.get(`http://172.30.1.49:8080/myRecipe/${recipeId}`);
        setRecipeData(response.data);
      } catch (error) {
        console.error('에러내용:', error);
      }
    };

    fetchRecipeData();
  }, [recipeId]);

  // 임시 데이터
  const tempData = {
    foodName: "Temp Recipe",
    imgUrl: "https://via.placeholder.com/150",
    ingredients: ["딸기", "식빵", "오이", "양파", "양배추"],
    recipe: [
      "1. ~~~~",
      "2. ~~~~",
      "3. ~~~~"
    ]
  };

  useEffect(() => {
    if (!Object.keys(recipeData).length) {
      setRecipeData(tempData);
    }
  }, [recipeData, tempData]);

  return (
    <>
      <div className="pt-16">
        <div
          className="absolute top-5 left-42 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
          onClick={() => navigate('/GptSavedList')}
        >
          <FaArrowLeft />
        </div>
        <img
          src={recipeData.imgUrl}
          alt={recipeData.foodName}
          className="mt-10 mb-4 w-80 h-60 object-cover rounded-lg mx-auto"
        />

        <div className="flex flex-col items-center mt-8">
          <div className="flex items-center gap-4">
            <h2 className="font-score text-2xl font-bold">{recipeData.foodName}</h2>
          </div>
          <div className="font-score text-lg text-gray-500 my-2">
            {recipeData.ingredients ? recipeData.ingredients.join(' · ') : ''}
          </div>
          <div className="text-gray-700 font-score mt-6">
            {recipeData.recipe && recipeData.recipe.map((step, index) => (
              <p key={index}>{step}</p>
            ))}
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
