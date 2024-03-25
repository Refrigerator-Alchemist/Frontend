import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Navigation from '../components/Navigation';
import { FaTrash, FaHeart } from 'react-icons/fa';
import {
  useUserDispatch,
  useUserState,
  IP_ADDRESS,
} from '../context/UserContext';

// 🃏 내가 저장한 게시물
const SavedRecipe = ({
  postId,
  title,
  description,
  imageUrl,
  onEdit,
  onDelete,
  showEditDeleteButtons = true,
}) => {
  return (
    <div className="text-black ml-6 mr-6 mt-2 w-full max-w-md">
      <div className="bg-white mx-2 my-2 p-4 rounded-xl shadow overflow-hidden relative flex flex-col md:flex-row">
        <Link to={`/board/${postId}`} className="flex-grow flex items-center">
          <div className="flex-none w-20 h-20 md:w-20 md:h-20 max-w-xs rounded-xl border-2 border-gray-300 overflow-hidden mr-4">
            <img
              className="w-full h-full object-cover"
              src={imageUrl}
              alt={title}
            />
          </div>
          <div className="md:pl-4 mt-4 md:mt-0">
            <h3 className="text-lg font-score font-semibold">{title}</h3>
            <p className="text-gray-500 pt-1 text-sm font-score md:max-w-xs">
              {description}
            </p>
          </div>
        </Link>
        {showEditDeleteButtons && (
          <div className="absolute top-4 right-0 flex flex-col space-y-10">
            <button
              onClick={() => onDelete(postId)}
              className="p-1 text-gray-400"
            >
              <FaTrash />
            </button>
            <button
              onClick={() => onEdit(postId)}
              className="pr-3 text-sm text-gray-300"
            >
              수정
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 🃏 좋아요 누른 레시피
const LikedRecipe = ({ postId, title, description, imageUrl }) => {
  return (
    <div className="text-black ml-6 mr-6 mt-2 w-full max-w-md">
      <div className="bg-white mx-2 my-2 p-4 rounded-xl shadow overflow-hidden relative flex flex-col md:flex-row">
        <Link to={`/board/${postId}`} className="flex flex-grow items-center">
          <div className="flex-none w-20 h-20 md:w-20 md:h-20 max-w-xs rounded-xl border-2 border-gray-300 overflow-hidden mr-4">
            <img
              className="w-full h-full object-cover"
              src={imageUrl}
              alt={title}
            />
          </div>
          <div className="md:pl-4 mt-4 md:mt-0">
            <h3 className="text-lg font-score font-semibold">{title}</h3>
            <p className="text-gray-500 pt-1 text-sm font-score md:max-w-xs">
              {description}
            </p>
          </div>
          <FaHeart className="text-red-500 text-2xl justify-end" />
        </Link>
      </div>
    </div>
  );
};

// 📂 마이페이지
function MyPage() {
  const [imageUrl, setImageUrl] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(5);


  const [showMyRecipes, setShowMyRecipes] = useState(true); // 토글 기능 - true : 저장한 레시피 / false : 좋아요 누른 레시피
  const [recipes, setRecipes] = useState([]); // 내가 저장한 레시피들
  const [likedItems, setLikedItems] = useState([]); // 좋아요 누른 레시피들


  const navigate = useNavigate();

  const user = useUserState(); // 유저 데이터 : 로그인 상태면 존재

  const { logout } = useUserDispatch();

  const accessToken = localStorage.getItem('accessToken');
  const nickName = localStorage.getItem('nickName');

  // --------------------------------------------------------------------------------------------------------
  // useEffect(() => {
  //   fetchLikeData();
  //   fetchUserInfo().then(fetchMyPage);
  // }, [showMyRecipes]);

  useEffect(() => {
    fetchUserInfo();
    if (showMyRecipes) {
      fetchMyPage();
    } else {
      fetchLikeData();
    }
  }, [showMyRecipes]);

  // 🧑🏽‍🌾 현재 로그인 중인 유저 정보 : 프로필 이미지, 닉네임
  const fetchUserInfo = async () => {
    const URL = `${IP_ADDRESS}/userprofile`;

    try {
      if (user) {
        const response = await axios.get(URL, {
          headers: {
            'Authorization-Access': accessToken,
            nickName: nickName,
          },
        });

        // ▶️ 이미지 url 저장 : data인지 headers인지 확인해봐야 함
        setImageUrl(response.data.imageUrl);
      } else {
        window.alert('로그인 하지 않았습니다!');
      }
    } catch (error) {
      console.error('데이터 통신 중 문제 발생: ', error);
    }
  };

  // 🧑🏽 내가 저장한 레시피 가져오는 함수
  const fetchMyPage = async () => {
    const URL = `${IP_ADDRESS}/userprofile`;

    try {
      const response = await axios.get(URL, {
        headers: {
          'Authorization-Access': accessToken,
          nickName: nickName,
        },
      });

      if (response.data && Array.isArray(response.data.items)) {
        const items = response.data.items.map((item) => {
          return {
            postId: item.ID,
            title: item.title,
            description: item.description,
            imageUrl: item.imageUrl,
          };
        });
        setRecipes(items);
      } else {
        window.alert('데이터가 배열이 아닙니다');
      }
    } catch (error) {
      console.error('내가 저장한 레시피 로드 중 에러 발생', error);
    }
  };

  // 🔥 좋아요 누른 게시물들 가져오는 함수
  const fetchLikeData = async () => {
    const URL = `${IP_ADDRESS}/board/mypage-like`;

    try {
      const response = await axios.get(URL, {
        headers: {
          'Authorization-Access': accessToken,
          nickName: nickName,
        },
      });
      if (response.data && Array.isArray(response.data.items)) {
        const items = response.data.items.map((item) => ({
          id: item.ID,
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
          likeCount: item.likeCount,
        }));
        setLikedItems(items);
      } else {
        window.alert('데이터가 배열이 아닙니다!');
      }
    } catch (error) {
      console.error('좋아요 누른 기록 받아오는 중 에러 발생', error);
    }
  };


  // 1️⃣ 레시피 수정
  const handleEdit = (postId) => {
    navigate(`/editpost/${postId}`);
  };

  // 2️⃣ 레시피 삭제
  const deleteRecipe = async (postId) => {
    try {
      await axios.post(`${IP_ADDRESS}/board/deleteBoard`, {
        postId: postId,
      });

      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.postId !== postId)
      );
    } catch (error) {
      console.error('레시피 삭제 에러 내용:', error);
      throw error;
    }
  };

  // 3️⃣ 레시피 삭제 확인
  const handleDeleteConfirmation = async (postId) => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await deleteRecipe(postId);
        console.log('레시피 삭제 성공');
      } catch (error) {
        console.error('레시피 삭제 실패:', error);
      }
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
            navigate('/delete-user');
          }}
        >
          회원 탈퇴
        </button>
        <button
          className="font-score outline-none font-semibold underline underline-offset-2 hover:text-red-500"
          onClick={() => {
            logout();
          }}
        >
          로그아웃
        </button>
      </header>

      <main className="flex flex-col items-center overflow-hidden">
        <div className="bg-gray-300 rounded-full h-32 w-32 mt-20">
          <img
            src={imageUrl}
            alt="프로필 사진"
            className="rounded-full h-32 w-32 object-cover"
          />
        </div>
        <h1 className="font-score mt-5 text-xl font-semibold text-center">
          {nickName}
        </h1>

        <button
          onClick={() => navigate('/profile')}
          className="font-score my-2 bg-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 underline hover:text-red-500"
        >
          내 프로필 수정
        </button>

        <div className="flex">
          <button
            onClick={() => setShowMyRecipes(true)} // 내가 작성한 레시피 on
            className={`font-score mx-1 py-2 px-4 rounded ${
              showMyRecipes === true
                ? 'bg-main text-white'
                : 'bg-gray-100 text-black'
            }`}
          >
            내가 작성한 레시피
          </button>
          <button
            onClick={() => setShowMyRecipes(false)} // 좋아요 누른 레시피 on
            className={`font-score mx-1 py-2 px-4 rounded ${
              showMyRecipes === false
                ? 'bg-main text-white'
                : 'bg-gray-100 text-black'
            }`}
          >
            좋아요 누른 레시피
          </button>
        </div>

        {/* true : 내가 저장한 레시피 */}
        {showMyRecipes ? (
          // 내가 저장한 레시피
          <div className="recipe-card-container w-full flex flex-wrap">
            {currentRecipes.map((recipe) => (
              <SavedRecipe
                key={recipe.postId}
                postId={recipe.postId}
                title={recipe.title}
                description={recipe.description}
                imageUrl={recipe.imageUrl}
                showEditDeleteButtons={showMyRecipes}
                onDelete={handleDeleteConfirmation}
                onEdit={handleEdit}
              />
            ))}
          </div>
        ) : (
          // 좋아요 누른 레시피 -> likeItems에 들어있는 postId만 사용하도록 변경해야 함
          <div className="recipe-card-container w-full flex flex-wrap">
            {likedItems.map((recipe) => (
              <LikedRecipe
                key={recipe.postId}
                postId={recipe.postId}
                title={recipe.title}
                description={recipe.description}
                imageUrl={recipe.imageUrl}
              />
            ))}
          </div>
        )}

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
