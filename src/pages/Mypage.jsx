import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import axios from 'axios';
import { useUserDispatch, useUserState } from '../context/UserContext';
import { FaTrash, FaEdit } from 'react-icons/fa';
import IMAGE_PROFILE from '../assets/img/img_profile.png';
import Pagination from '../components/Pagination';

const RecipeCard = ({
  postid,
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
        <Link to={`/board/${postid}`} className="flex-grow flex items-center">
          <div className="flex-none w-20 h-20 md:w-20 md:h-20 max-w-xs rounded-xl border-2 border-gray-300 overflow-hidden mr-4">
            <img className="w-full h-full object-cover" src={imageUrl} alt={title} />
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
              onClick={() => onDelete(postid)}
              className="p-1 text-gray-400"
            >
              <FaTrash />
            </button>
            <button
              onClick={() => onEdit(postid)}
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

function MyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(5);
  const [recipes, setRecipes] = useState([]);
  const [showMyRecipes, setShowMyRecipes] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '',
    imageUrl: IMAGE_PROFILE,
  });

  const [likedItems, setLikedItems] = useState([]); // 현재 계정으로 좋아요 누른 게시물들

  const user = useUserState(); // 유저 데이터 : 로그인 상태면 존재
  const { logout } = useUserDispatch();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const URL = 'http://localhost:8080/userprofile';

      try {
        if (user) {
          const response = await axios.get(URL, user.nickName);

          setUserInfo({
            imageUrl: response.data.imageUrl,
            nickName: user.nickName,
          });
        } else {
          window.alert('로그인 하지 않았습니다!');
        }
      } catch (error) {
        console.error('데이터 통신 중 문제 발생: ', error);
      }
    };

    const fetchMyPage = () => {
      axios
        .post('http://localhost:8080/board/myPage', 'test')
        .then((response) => {
          console.log('서버 응답 데이터:', response.data);

          if (response.data && Array.isArray(response.data.items)) {
            const formattedData = response.data.items.map((item) => {
              return {
                postid: item.ID,
                title: item.title,
                description: item.description,
                img: item.imageUrl,
                isLiked: item.likeCount > 0,
              };
            });
            setRecipes(formattedData);
          } else {
            console.error('에러 내용1:', response.data);
          }
        })
        .catch((error) => {
          console.error('에러 내용2:', error);
        });
    };

    fetchLikeData();
    fetchUserInfo().then(fetchMyPage);
  }, [showMyRecipes]);

  


  // 🔥 현재 계정으로 좋아요 누른 게시물들 가져오는 함수
  const fetchLikeData = async () => {
    const URL = 'http://localhost:8080/board/islike';
    const nickName = localStorage.getItem('nickName');

    try {
      const response = await axios.get(URL, nickName);
      if (response.data && Array.isArray(response.data.items)) {
        const items = response.data.items.map((item) => item);
        setLikedItems(items);
        console.log('게시물 id', items);
      } else {
        console.error('에러 내용', response.data);
      }
    } catch (error) {
      console.error('좋아요 누른 기록 받아오는 중 에러 발생', error);
    }
  };

  // 레시피 수정
  const handleEdit = (postid) => {
    navigate(`/editpost/${postid}`);
  };

  // 레시피 삭제
  const deleteRecipe = async (postid) => {
    try {
      await axios.post(`http://localhost:8080/board/deleteBoard`, {
        postId: postid,
      });

      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.postid !== postid)
      );
    } catch (error) {
      console.error('레시피 삭제 에러내용:', error);
      throw error;
    }
  };

  //레시피 삭제 확인
  const handleDeleteConfirmation = async (postid) => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await deleteRecipe(postid);
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
            src={userInfo.imageUrl}
            alt="프로필 사진"
            className="rounded-full h-32 w-32 object-cover"
          />
        </div>
        <h1 className="font-score mt-5 text-xl font-semibold text-center">
          {userInfo.name}
        </h1>

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
              onDelete={handleDeleteConfirmation}
              onEdit={handleEdit}
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
