// import React from 'react';
// import { FaArrowLeft } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';

// const MyPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-white h-screen text-black">
//       <div className="p-4 flex items-center">
//         <FaArrowLeft className="text-2xl cursor-pointer" onClick={() => navigate(-1)} />
//       </div>
//       <div className="flex flex-col items-center">
//         <div className="bg-gray-300 rounded-full h-40 w-40 mt-20"></div>
//         <h1 className="mt-12 text-xl font-semibold">user1</h1>
//         <p className="mt-8 pb-12 px-6 text-center">한줄 자기소개</p>
//         <Link to='/profile' className="mt-10  w-60 bg-gray-100 text-gray-800 font-semibold py-2 px-4 border  rounded-full shadow">
//           프로필 수정
//         </Link>
//         <Link to='/board' className="mt-8 w-60 bg-gray-100 text-gray-800 font-semibold py-2 px-4 border  rounded-full shadow">
//           내가 저장한 레시피
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default MyPage;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useState } from 'react';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';


const RecipeCard = ({ postid, title, description, img, isLiked }) => {
    const [liked, setLiked] = useState(false); 
  
    const toggleLike = (event) => {
      event.stopPropagation(); 
      setLiked(!liked); 
    };
    const navigate = useNavigate();
  

  
    return (
      <div className="bg-white h-auto text-black ml-6 mr-6">
        <div className="flex items-center">
          <div
            className="absolute top-5 left-45 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
            onClick={() => navigate("/board")}
          >
            <FaArrowLeft />
          </div>
        </div>
  
        <div className="flex bg-white mx-2 my-2 p-4 rounded-xl shadow">
          <Link to={`/board/${postid}`} className="flex-grow flex">
            <div className="flex-none w-20 h-10rounded-xl border-2 border-gray-300 overflow-hidden">
              <img className="w-full h-full object-cover" src={img} alt={title} />
            </div>
            <div className="px-4">
              <h3 className="text-lg font-score font-semibold">{title}</h3>
              <p className="text-gray-500 text-sm font-score">{description}</p>
            </div>
          </Link>
          <button onClick={toggleLike} className="p-2">
            <FaHeart className="text-red-500 text-2xl" />
          </button>
        </div>
      </div>
    );
  };

function MyPage(){
  const recipes = [
    {
      rank: 1,
      thumbnail: "https://img.khan.co.kr/lady/r/1100xX/2023/09/06/news-p.v1.20230906.8f0993f6426340fe90c978fc1352d69e.png",
      title: "계란말이김밥",
      ingredients: ["계란", "당근", "쪽파", "김"],
      likes: 47,
      description: `간단한 설명`, 
    },
    
    {
      title: "Vegetable Curry",
      description: "potato, Lettuce",
      img: "",
      isLiked: true,
    },
    {
      title: "Vegetable Curry",
      description: "potato, Lettuce",
      img: "",
      isLiked: true,
    },
    {
      title: "Vegetable Curry",
      description: "potato, Lettuce",
      img: "",
      isLiked: true,
    },
    {
      title: "Vegetable Curry",
      description: "potato, Lettuce",
      img: "",
      isLiked: true,
    },
    {
      title: "Vegetable Curry",
      description: "potato, Lettuce",
      img: "",
      isLiked: true,
    },
    
  ];

 
  return (
    <div className="Board flex items-center justify-center ">
      
      <div className="flex flex-col items-center  overflow-hidden">
        
        <div className="bg-gray-300 rounded-full h-40 w-40 mt-20"></div>
      
        <h1 className="mt-5 text-xl font-semibold text-center">user1</h1>
        <p className="mt-4 pb-12 px-6 text-center">한줄 자기소개</p>
        {/* <span className="font-undong font-bold ml-8 text-2xl ">Recipe</span> */}

        <div className="recipe-card-container "style={{ width: '120%' }}>
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              title={recipe.title}
              description={recipe.description}
              img={recipe.thumbnail}
              isLiked={recipe.isLiked}
            />
          ))}
        </div>
      </div>
      <footer style={{position:'fixed',bottom:'0',width:'100%',maxWidth:'32rem',}}>
      <Navigation />
      </footer>
    </div>
  );
}

export default MyPage;