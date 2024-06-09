import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/ui/Navigation';
import { FaHeart } from 'react-icons/fa';
import { VscChromeClose } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import { useUserDispatch, IP_ADDRESS } from '../context/UserContext';

import IMG_PROFILE from '../assets/img/img_profile.png';

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
  const maxLength = 30; // 본문의 최대 길이 설정
  const shortDescription =
    description.length > maxLength
      ? description.slice(0, maxLength) + '...'
      : description;

  return (
    <div className="text-black ml-6 mr-6 mt-2 w-full max-w-md relative">
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
              {shortDescription}
            </p>
          </div>
        </Link>
        {showEditDeleteButtons && (
          <div className="absolute top-4 right-2 flex flex-row space-x-1">
            <button
              onClick={() => onEdit(postId)}
              className="pr-3 text-sm text-gray-300"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(postId)}
              className=" text-gray-400 pr-2"
            >
              <VscChromeClose />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 🃏 좋아요 누른 레시피
const LikedRecipe = ({ postId, title, description, imageUrl }) => {
  const maxLength = 25; // 본문의 최대 길이 설정
  const shortDescription =
    description.length > maxLength
      ? description.slice(0, maxLength) + '...'
      : description;

  return (
    <div className="text-black ml-6 mr-6 mt-2 w-full max-w-md">
      <div className="bg-white mx-2 my-2 p-4 rounded-xl shadow overflow-hidden relative flex flex-col">
        <Link
          to={`/board/${postId}`}
          className="flex flex-grow items-center justify-between"
        >
          <div className="flex items-center">
            <div className="flex-none w-20 h-20 max-w-xs rounded-xl border-2 border-gray-300 overflow-hidden mr-4">
              <img
                className="w-full h-full object-cover"
                src={imageUrl}
                alt={title}
              />
            </div>
            <div className=" mt-3">
              <h3 className="text-lg font-score font-semibold">{title}</h3>
              <p className="text-gray-500 pt-1 text-sm font-score md:max-w-xs">
                {shortDescription}
              </p>
            </div>
          </div>
          <div className="heart-icon-container">
            <FaHeart className="text-red-500 text-2xl heart-icon" />
          </div>
        </Link>
      </div>
    </div>
  );
};

// 📂 마이페이지
export default function MyPage() {
  const [imageUrl, setImageUrl] = useState('' || IMG_PROFILE);
  const [currentPageMyRecipes, setCurrentPageMyRecipes] = useState(1);
  const [currentPageLikedRecipes, setCurrentPageLikedRecipes] = useState(1);
  const [recipesPerPage] = useState(5);
  const [totalMyRecipes, setTotalMyRecipes] = useState(0);
  const [totalLikedRecipes, setTotalLikedRecipes] = useState(0);
  const [showMyRecipes, setShowMyRecipes] = useState(true);
  // 토글 기능 - true :작성한 레시피 / false : 좋아요 누른 레시피

  const [recipes, setRecipes] = useState([]); // 내가 저장한 레시피들
  const [likedItems, setLikedItems] = useState([]); // 좋아요 누른 레시피들

  const { logout, handleError } = useUserDispatch();

  const accessToken = localStorage.getItem('accessToken');
  const nickName = localStorage.getItem('nickName');
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const observer = useRef();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const URL = `${IP_ADDRESS}/userinfo`;
      try {
        if (accessToken) {
          const response = await axios.get(URL, {
            headers: {
              'Authorization-Access': accessToken,
              email: email,
            },
          });
          setImageUrl(response.data.imageUrl);
          localStorage.setItem(response.data.imageUrl); // 로컬스토리지에 저장
        }
      } catch (error) {
        handleError(error);
      }
    };

    fetchUserInfo();
  }, [accessToken, email, handleError]);

  useEffect(() => {
    const fetchMyPage = async (page) => {
      const URL = `${IP_ADDRESS}/mypost?page=${page}&size=${recipesPerPage}`;
      try {
        const response = await axios.get(URL, {
          headers: {
            'Authorization-Access': accessToken,
            email: email,
          },
        });
        if (response.data && Array.isArray(response.data.items)) {
          const items = response.data.items.map((item) => ({
            postId: item.ID,
            title: item.title,
            description: item.description,
            imageUrl: item.imageUrl,
          }));
          setRecipes((prevRecipes) => [...prevRecipes, ...items]);
          setTotalMyRecipes(response.data.total);
        } else {
          toast.error('데이터가 배열이 아닙니다');
        }
      } catch (error) {
        handleError(error);
      }
    };

    const fetchLikeData = async (page) => {
      const URL = `${IP_ADDRESS}/likedpost?page=${page}&size=${recipesPerPage}`;
      try {
        const response = await axios.get(URL, {
          headers: {
            'Authorization-Access': accessToken,
            email: email,
          },
        });
        if (response.data && Array.isArray(response.data.items)) {
          const items = response.data.items.map((item) => ({
            postId: item.ID,
            title: item.title,
            description: item.description,
            imageUrl: item.imageUrl,
          }));
          setLikedItems((prevItems) => [...prevItems, ...items]);
          setTotalLikedRecipes(response.data.total);
        } else {
          toast.error('데이터가 배열이 아닙니다');
        }
      } catch (error) {
        handleError(error);
      }
    };

    if (showMyRecipes) {
      fetchMyPage(currentPageMyRecipes);
    } else {
      fetchLikeData(currentPageLikedRecipes);
    }
  }, [
    showMyRecipes,
    currentPageMyRecipes,
    currentPageLikedRecipes,
    accessToken,
    email,
    handleError,
    recipesPerPage,
  ]);

  const lastRecipeElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (showMyRecipes && currentPageMyRecipes < Math.ceil(totalMyRecipes / recipesPerPage)) {
            setCurrentPageMyRecipes((prevPage) => prevPage + 1);
          } else if (!showMyRecipes && currentPageLikedRecipes < Math.ceil(totalLikedRecipes / recipesPerPage)) {
            setCurrentPageLikedRecipes((prevPage) => prevPage + 1);
          }
        }
      });
      if (node) observer.current.observe(node);
    },
    [
      showMyRecipes,
      currentPageMyRecipes,
      currentPageLikedRecipes,
      totalMyRecipes,
      totalLikedRecipes,
      recipesPerPage,
    ]
  );

  const handleEdit = (postId) => {
    navigate(`/editpost/${postId}`);
  };

  const deleteRecipe = async (postId) => {
    try {
      await axios.post(`${IP_ADDRESS}/mypost/delete`, postId, {
        headers: {
          'Authorization-Access': accessToken,
        },
      });
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.postId !== postId)
      );
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const handleDeleteConfirmation = async (postId) => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await deleteRecipe(postId);
        toast.success('레시피 삭제 성공');
      } catch (error) {
        handleError(error);
      }
    }
  };

  const toggleRecipeView = (view) => {
    setShowMyRecipes(view);
    setCurrentPageMyRecipes(1);
    setCurrentPageLikedRecipes(1);
    setRecipes([]);
    setLikedItems([]);
  };

  return (
    <section
      className="Board flex flex-col items-center justify-center w-full"
      style={{ marginBottom: '100px' }}
    >
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
          onClick={() => navigate('/mypage/edit/profile')}
          className="font-score my-2 bg-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 underline hover:text-red-500"
        >
          내 프로필 수정
        </button>

        <div className="flex">
          <button
            onClick={() => toggleRecipeView(true)}
            className={`font-score mx-1 py-2 px-4 rounded ${
              showMyRecipes ? 'bg-main text-white' : 'bg-gray-100 text-black'
            }`}
          >
            내가 작성한 레시피
          </button>
          <button
            onClick={() => toggleRecipeView(false)}
            className={`font-score mx-1 py-2 px-4 rounded ${
              !showMyRecipes ? 'bg-main text-white' : 'bg-gray-100 text-black'
            }`}
          >
            좋아요 누른 레시피
          </button>
        </div>
        {showMyRecipes ? (
          <div className="recipe-card-container w-full flex flex-wrap">
            {recipes.map((recipe, index) => (
              <SavedRecipe
                key={recipe.postId}
                postId={recipe.postId}
                title={recipe.title}
                description={recipe.description}
                imageUrl={recipe.imageUrl}
                showEditDeleteButtons={showMyRecipes}
                onDelete={handleDeleteConfirmation}
                onEdit={handleEdit}
                ref={
                  recipes.length === index + 1 ? lastRecipeElementRef : null
                }
              />
            ))}
          </div>
        ) : (
          <div className="recipe-card-container w-full flex flex-wrap">
            {likedItems.map((recipe, index) => (
              <LikedRecipe
                key={recipe.postId}
                postId={recipe.postId}
                title={recipe.title}
                description={recipe.description}
                imageUrl={recipe.imageUrl}
                ref={
                  likedItems.length === index + 1 ? lastRecipeElementRef : null
                }
              />
            ))}
          </div>
        )}
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
