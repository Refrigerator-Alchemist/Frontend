import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import axios from 'axios';
import { useUserDispatch } from '../context/UserContext';
import { FaTrash, FaEdit } from 'react-icons/fa';
import IMAGE_PROFILE from '../img/img_profile.png';
import Pagination from '../components/Pagination';

const RecipeCard = ({
  postid,
  title,
  description,
  img,
  onEdit,
  onDelete,
  showEditDeleteButtons = true,
}) => {
  return (
    <div
      className="h-auto text-black ml-6 mr-6 mt-2"
      style={{ width: '460px' }}
    >
      <div className="flex bg-white mx-2 my-2 p-4 rounded-xl shadow overflow-hidden h-full pb-0 relative">
        <Link to={`/board/${postid}`} className="flex-grow flex">
          <div className="flex-none w-20 h-20 rounded-xl border-2 border-gray-300 overflow-hidden">
            <img className="w-full h-full object-cover" src={img} alt={title} />
          </div>
          <div className="px-4" style={{ maxWidth: 'calc(100% - 80px)' }}>
            <h3 className="text-lg font-score font-semibold">{title}</h3>
            <p
              className="text-gray-500 pt-1 text-sm font-score"
              style={{
                maxHeight: '3rem',
                maxWidth: '200px',
                overflowWrap: 'break-word',
              }}
            >
              {description}
            </p>
          </div>
        </Link>
        {showEditDeleteButtons && (
          <div className="absolute top-4 right-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => onDelete(postid)}
                className="p-1 pl-4 text-gray-400"
              >
                <FaTrash />
              </button>
              <Link
                to={`/editpost/${postid}`}
                className="p-1 pt-6 text-sm text-gray-300"
              >
                수정
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


function MyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(5);
  const [recipes, setRecipes] = useState([]);
  const [showMyRecipes, setShowMyRecipes] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '',
    profilePic: IMAGE_PROFILE || localStorage.getItem('imageUrl'),
    bio: '',
  });

  const myRecipesData = [
    {
      postid: 1,
      title: '나의 레시피 1',
      description: 'api연결전 임시 "나의  레시피 " 데이터 1입니다.',
      img: '이미지 URL 1',
      isLiked: false,
    },
    {
      postid: 2,
      title: '나의 레시피 2',
      description: '이것은 레시피 2입니다.',
      img: '이미지 URL 2',
      isLiked: true,
    },
    {
      postid: 3,
      title: '나의 레시피 3',
      description: '이것은 레시피 2입니다.',
      img: '이미지 URL 2',
      isLiked: true,
    },
    {
      postid: 4,
      title: '나의 레시피 4',
      description: '이것은 레시피 2입니다.',
      img: '이미지 URL 2',
      isLiked: true,
    },
    {
      postid: 5,
      title: '나의 레시피 5',
      description: '이것은 레시피 2입니다.',
      img: '이미지 URL 2',
      isLiked: true,
    },
    {
      postid: 6,
      title: '나의 레시피 6',
      description: '이것은 레시피 2입니다.',
      img: '이미지 URL 2',
      isLiked: true,
    },
    // ... 더 많은 임시 데이터
  ];

  const likedRecipesData = [
    {
      postid: 1,
      title: '좋아한 레시피 1',
      description: 'api연결전 임시 "좋아한 레시피 " 데이터 1입니다.',
      img: '이미지 URL 3',
      isLiked: true,
    },
    {
      postid: 2,
      title: '좋아한 레시피 2',
      description: '이것은 좋아한 레시피 2입니다.',
      img: '이미지 URL 4',
      isLiked: false,
    },
    {
      postid: 3,
      title: '좋아한 레시피 3',
      description: '이것은 좋아한 레시피 2입니다.',
      img: '이미지 URL 4',
      isLiked: false,
    },
    {
      postid: 4,
      title: '좋아한 레시피 4',
      description: '이것은 좋아한 레시피 2입니다.',
      img: '이미지 URL 4',
      isLiked: false,
    },
    {
      postid: 5,
      title: '좋아한 레시피 5',
      description: '이것은 좋아한 레시피 2입니다.',
      img: '이미지 URL 4',
      isLiked: false,
    },
    {
      postid: 6,
      title: '좋아한 레시피 6',
      description: '이것은 좋아한 레시피 2입니다.',
      img: '이미지 URL 4',
      isLiked: false,
    },
    // ... 더 많은 임시 데이터
  ];

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('사용자 정보 가져오는 서버주소 ');
        if (response.data) {
          setUserInfo({
            name: response.data.name, // ㅇ;ㅣ름
            profilePic: response.data.profilePic, //프로필 사진
            bio: response.data.bio, //소개
          });
        }
      } catch (error) {
        console.error('에러 내용:', error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = {
          data: {
            items: showMyRecipes ? likedRecipesData : myRecipesData,
          },
        };

        if (response.data && Array.isArray(response.data.items)) {
          const formattedData = response.data.items.map((item) => ({
            postid: item.postid,
            title: item.title,
            description: item.description,
            img: item.img,
          }));
          setRecipes(formattedData);
        } else {
          console.error('에러:', response.data);
        }
      } catch (error) {
        console.error('에러:', error);
      }
    };

    fetchData();
  }, [showMyRecipes]);

  const { logout } = useUserDispatch();  // 로그아웃 

    // 레시피 수정하는 api
  const handleEdit = async (postid) => {
    try {
      const response = await axios.get(
        `레시피 수정하는 api url/${postid}`
      );
      if (response.data) {
        const recipeData = response.data;
        navigate('/upload', { state: { recipe: recipeData } });
      } //수정페이지로 
    } catch (error) {
      console.error('에러내용:', error);
    }
  };

  // 레시피 삭제하는 api
  const deleteRecipe = async (postid) => {
    try {
      await axios.delete(`레시피 삭제하는 api url/${postid}`);
      console.log('삭제성공');
      removeRecipe(postid);
    } catch (error) {
      console.error('삭제에러', error);
    }
  };

  const removeRecipe = (postid) => {
    setRecipes(recipes.filter(recipe => recipe.postid !== postid));
  };
  const handleDeleteConfirmation = (postid) => {
    if (window.confirm('레시피를 삭제하시겠습니까?')) {
      deleteRecipe(postid); 
    }
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="Board flex flex-col items-center justify-center w-full">
      <header className="flex justify-end w-full mt-2 space-x-2 mr-12">
        <button
          className="font-score text-gray-300"
          onClick={(e) => {
            e.preventDefault();
            navigate('/mypage/delete-user');
          }}
        >
          회원 탈퇴
        </button>
        <button
          className="font-score outline-none font-semibold underline underline-offset-2 hover:text-red-500"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          로그아웃
        </button>
      </header>

      <main className="flex flex-col items-center overflow-hidden">
        <div className="bg-gray-300 rounded-full h-32 w-32 mt-20">
          <img
            src={userInfo.profilePic}
            alt="프로필 사진"
            className="rounded-full h-32 w-32 object-cover"
          />
        </div>
        <h1 className="font-score mt-5 text-xl font-semibold text-center">
          {userInfo.name}
        </h1>
        <p className="font-score mt-4 pb-4\2 px-6 text-center">
          {userInfo.bio}
        </p>
        <button
          onClick={() => navigate('/profile')}
          className="font-score my-2 bg-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 underline hover:text-red-500"
        >
          내 프로필 수정
        </button>

        <div className="flex">
          <button
            onClick={() => setShowMyRecipes(false)}
            className={`font-score mx-1 py-2 px-4 rounded ${
              !showMyRecipes ? 'bg-main text-white' : 'bg-gray-100 text-black'
            }`}
          >
            나의 레시피 보기
          </button>
          <button
            onClick={() => setShowMyRecipes(true)}
            className={`font-score mx-1 py-2 px-4 rounded ${
              showMyRecipes ? 'bg-main text-white' : 'bg-gray-100 text-black'
            }`}
          >
            좋아한 레시피 보기
          </button>
        </div>

        <div className="recipe-card-container w-full flex flex-wrap">
          {currentRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.postid}
              postid={recipe.postid}
              title={recipe.title}
              description={recipe.description}
              img={recipe.img}
              showEditDeleteButtons={!showMyRecipes}
              onDelete={(postid) => handleDeleteConfirmation(postid)}
              onEdit={(postid) => handleEdit(postid)}
            />
          ))}
        </div>
        
        <Pagination
          currentPage={currentPage}
          recipesPerPage={recipesPerPage}
          totalRecipes={recipes.length}
          paginate={paginate}
        />
      </main>

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
}

export default MyPage;
