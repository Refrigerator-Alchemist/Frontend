import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

// import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Board = () => {
    const navigate = useNavigate();
  const [recipes, setRecipes] = useState([
    {
      postid: 1,
      title: '레시피 1',
      description: '임시 데이터 .',
      img: 'https://via.placeholder.com/150',
      isLiked: false,
    },
    {
      postid: 2,
      title: '레시피 2',
      description: '예시',
      img: 'https://via.placeholder.com/150',
      isLiked: true,
    },
    {
      postid: 3,
      title: '레시피 3',
      description: '예시',
      img: 'https://via.placeholder.com/150',
      isLiked: false,
    },
  ]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await axios.get('저장된 레시피 불러오는 서버주소');
//         setRecipes(response.data);
//       } catch (error) {
//         console.error('에러내용:', error);
//       }
//     };

//     fetchRecipes();
//   }, []);


  const RecipeCard = ({ postid, title, description, img }) => {
    return (
      <div className="flex items-center bg-white mx-5 my-2 p-4 rounded-xl shadow">
        <Link to={`/board/${postid}`} className="flex-grow flex">
          <div className="flex-none w-20 h-20 rounded-xl border-2 border-gray-300 overflow-hidden">
            <img className="w-full h-full object-cover" src={img} alt={title} />
          </div>
          <div className="px-4 py-4">
            <h3 className="text-lg font-score font-semibold">{title}</h3>
            <p className="text-gray-500 text-sm font-score">{description}</p>
          </div>
        </Link>
        
      </div>
    );
  };

  return (
    <div className="history">
        <div
        className="absolute top-5 left-45 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate("/main")}
      >
        <FaArrowLeft />
      </div>
      <div className="my-2  mt-20 mb-4">
        <span className="font-undong font-bold ml-8 text-2xl ">저장한 레시피 </span>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.postid}
            postid={recipe.postid}
            title={recipe.title}
            description={recipe.description}
            img={recipe.img}
          />
        ))}
      </div>
      
    </div>
  );
}

export default Board;
