import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Navigation from '../components/ui/Navigation';
import { FaHeart } from 'react-icons/fa';
import { VscChromeClose } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import { useUserDispatch, IP_ADDRESS, instance } from '../context/UserContext';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(5);
  const [totalMyRecipes, setTotalMyRecipes] = useState(0);
  const [totalLikedRecipes, setTotalLikedRecipes] = useState(0);
  const [showMyRecipes, setShowMyRecipes] = useState(true);
  // 토글 기능 - true :작성한 레시피 / false : 좋아요 누른 레시피

  const [recipes, setRecipes] = useState([]); // 내가 저장한 레시피들
  const [likedItems, setLikedItems] = useState([]); // 좋아요 누른 레시피들
  const [currentPageMyRecipes, setCurrentPageMyRecipes] = useState(1);
  const [currentPageLikedRecipes, setCurrentPageLikedRecipes] = useState(1);

  const { logout } = useUserDispatch();

  const accessToken = localStorage.getItem('accessToken');
  const nickName = localStorage.getItem('nickName');
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  // --------------------------------------------------------------------------------------------------------

  useEffect(() => {
    // 🧑🏽‍🌾 현재 로그인 중인 유저 정보 : 프로필 이미지, 닉네임
    const fetchUserInfo = async () => {
      const URL = `${IP_ADDRESS}/userinfo`;
      try {
        if (accessToken) {
          const response = await instance.get(URL, {
            headers: {
              'Authorization-Access': accessToken,
              email: email,
            },
          });
          setImageUrl(response.data.imageUrl);
          localStorage.setItem(response.data.imageUrl); // 로컬스토리지에 저장
        } else {
          return;
        }
      } catch (error) {
        if (error.response.headers.code === 'RAT8') {
          console.log('유저 정보 갱신 중 문제가 발생했습니다', 'RAT8');
        }
      }
    };

    // 📝 내가 작성한 레시피 가져오는 함수
    const fetchMyPage = async () => {
      const URL = `${IP_ADDRESS}/mypost`;
      try {
        const response = await instance.get(URL, {
          headers: {
            'Authorization-Access': accessToken,
            email: email,
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
          // totalMyRecipes = Math.ceil(response.data.total / recipesPerPage);
          setTotalMyRecipes(response.data.total);
          console.log('내가작성한 레시피 총 갯수:', response.data.total);
        } else {
          toast.error('데이터가 배열이 아닙니다');
        }
      } catch (error) {
        console.error('내가 작성한 레시피 로드 중 에러 발생', error);
      }
    };

    // 📝 작성한 게시물, 좋아요 누른 게시물 mock data
    // const fetchMockData = async () => {
    //   try {
    //     if (mockData.items && Array.isArray(mockData.items)) {
    //       const items = mockData.items.map((item) => ({
    //         postId: item.ID,
    //         title: item.title,
    //         description: item.description,
    //         imageUrl: item.imageUrl,
    //         likeCount: item.likeCount,
    //       }));
    //       setRecipes(items);
    //       setLikedItems(items);
    //     } else {
    //       console.error('데이터 타입 오류:', mockData.items);
    //     }
    //   } catch (error) {
    //     console.error('에러 내용:', error);
    //   }
    // };

    // 🔥 좋아요 누른 게시물들 가져오는 함수
    const fetchLikeData = async () => {
      const URL = `${IP_ADDRESS}/likedpost`;
      try {
        const response = await instance.get(URL, {
          headers: {
            'Authorization-Access': accessToken,
            email: email,
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
          // totalLikedRecipes= Math.ceil(response.data.total / recipesPerPage);
          setTotalLikedRecipes(response.data.total);
          console.log('좋아요누른 총 레시피 갯수:', response.data.total);
        } else {
          toast.error('데이터가 배열이 아닙니다!');
        }
      } catch (error) {
        console.error('좋아요 누른 기록 받아오는 중 에러 발생', error);
      }
    };

    const fetchMyRecipesCount = async () => {
      try {
        const response = await instance.get(`${IP_ADDRESS}/mypost/size`, {
          headers: {
            'Authorization-Access': accessToken,
            email: email,
          },
        });
        setTotalMyRecipes(response.data.total);
      } catch (error) {
        console.error('내 레시피 총 개수 정보 가져오기 실패:', error);
        toast.error('레시피 정보를 가져오는데 실패했습니다.');
      }
    };

    const fetchLikedRecipesCount = async () => {
      try {
        const response = await instance.get(`${IP_ADDRESS}/likedpost/size`, {
          headers: {
            'Authorization-Access': accessToken,
            email: email,
          },
        });
        setTotalLikedRecipes(response.data.total);
      } catch (error) {
        console.error('좋아요 누른 레시피 총 개수 정보 가져오기 실패:', error);
        toast.error('좋아요 레시피 정보를 가져오는데 실패했습니다.');
      }
    };

    fetchUserInfo();
    if (showMyRecipes) {
      fetchMyPage();
      // fetchMockData();
    } else {
      // fetchMockData();
      fetchLikeData();
    }
    if (accessToken) {
      fetchMyRecipesCount();
      fetchLikedRecipesCount();
    }
  }, [showMyRecipes, accessToken, email]);

  // 1️⃣ 레시피 수정
  const handleEdit = (postId) => {
    navigate(`/editpost/${postId}`);
  };

  // 2️⃣ 레시피 삭제
  const deleteRecipe = async (postId) => {
    try {
      await instance.post(`${IP_ADDRESS}/mypost/delete`, postId, {
        headers: {
          'Authorization-Access': accessToken,
        },
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
        toast.success('레시피 삭제 성공');
      } catch (error) {
        console.error('레시피 삭제 실패:', error);
      }
    }
  };

  const toggleRecipeView = (view) => {
    setShowMyRecipes(view);
    setCurrentPage(1); // 목록을 전환할 때마다 첫 페이지로 설정
  };

  // Active 상태에 따라 현재 페이지 번호와 레시피 목록 계산
  let currentRecipes;
  if (showMyRecipes) {
    const indexOfLastRecipe = currentPageMyRecipes * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  } else {
    const indexOfLastRecipe = currentPageLikedRecipes * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    currentRecipes = likedItems.slice(indexOfFirstRecipe, indexOfLastRecipe);
  }
  // 보여줄 레시피 목록에 따라 총 레시피 수를 결정
  const handlePageChangeMyRecipes = (pageNumber) => {
    setCurrentPageMyRecipes(pageNumber);
  };
  const handlePageChangeLikedRecipes = (pageNumber) => {
    setCurrentPageLikedRecipes(pageNumber);
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
            onClick={() => toggleRecipeView(true)} // 내가 작성한 레시피 on
            className={`font-score mx-1 py-2 px-4 rounded ${
              showMyRecipes === true
                ? 'bg-main text-white'
                : 'bg-gray-100 text-black'
            }`}
          >
            내가 작성한 레시피
          </button>
          <button
            onClick={() => toggleRecipeView(false)} // 좋아요 누른 레시피 on
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
        {showMyRecipes ? (
          <Pagination
            currentPage={currentPageMyRecipes}
            recipesPerPage={recipesPerPage}
            totalItems={totalMyRecipes}
            paginate={handlePageChangeMyRecipes}
          />
        ) : (
          <Pagination
            currentPage={currentPageLikedRecipes}
            recipesPerPage={recipesPerPage}
            totalItems={totalLikedRecipes}
            paginate={handlePageChangeLikedRecipes}
          />
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
