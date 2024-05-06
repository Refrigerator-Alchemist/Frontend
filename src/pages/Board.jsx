import React from 'react';
import axios from 'axios';
import ICON_SEARCHING from '../assets/img/search.png';
// import ICON_WRITTING from '../assets/img/writing.png';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { PiPencilSimpleLine } from 'react-icons/pi';
import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Ranking from '../components/Ranking';
import Navigation from '../components/ui/Navigation';
import { useLocation } from 'react-router-dom';

import { IP_ADDRESS, useUserDispatch } from '../context/UserContext';

const accessToken = localStorage.getItem('accessToken');
const email = localStorage.getItem('email');

// 🃏 레시피 카드
const RecipeCard = ({
  postId,
  title,
  description,
  img,
  initialLikeCount,
  isLiked,
}) => {
  const [Liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(parseInt(initialLikeCount));
  const [likedPosts, setLikedPosts] = useState([]);
  const { handleError } = useUserDispatch();

  // ⏯️ 실행: 처음 렌더링, 좋아요 업데이트
  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  // 💛 좋아요 / 취소 (로그인해야 가능)
  const toggleLike = async () => {
    if (!accessToken) {
      toast.error('로그인이 필요한 기능입니다.');
      return;
    }
    try {
      if (Liked) {
        // ▶️ 좋아요 되어있는 상태면 취소
        const response = await axios.post(
          `${IP_ADDRESS}/board/dislike`,
          {
            email: email,
            postId: postId,
          },
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              Accept: 'application/json',
              'Authorization-Access': accessToken,
            },
          }
        );
        if (response.status === 200) {
          setLiked(false);
          setLikeCount(likeCount - 1);
          setLikedPosts((prevLikedPosts) =>
            prevLikedPosts.filter((id) => id !== postId)
          );
        }

        console.log(response);
        setLiked(!Liked);
      } else {
        // ▶️ 안 눌려져 있는 상태면 좋아요
        const response = await axios.post(
          `${IP_ADDRESS}/board/like`,
          {
            email: email,
            postId: postId,
          },
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              Accept: 'application/json',
              'Authorization-Access': accessToken,
            },
          }
        );
        if (response.status === 200) {
          setLiked(true);
          setLikeCount(likeCount + 1);
          setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
        }
        console.log(response);
        console.log('변경된 likedPosts:', likedPosts);
        setLiked(!Liked);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex items-center bg-white mx-6 my-2 p-4 rounded-xl shadow">
      <Link to={`/board/${postId}`} className="flex-grow flex">
        <div className="flex-none w-20 h-20 rounded-xl border-2 border-gray-300 overflow-hidden">
          <img className="w-full h-full object-cover" src={img} alt={title} />
        </div>
        <div className="px-4 py-4">
          <h3 className="text-lg font-score font-semibold">{title}</h3>
          <p className="text-gray-500 text-sm font-score">{description}</p>
        </div>
      </Link>
      <div className="mr-2">
        <span className="text-lg font-score font-semibold">{likeCount}</span>
      </div>
      <button
        className="p-2"
        onClick={
          accessToken ? toggleLike : () => toast.error('로그인이 필요합니다.')
        }
      >
        {accessToken ? (
          Liked ? (
            <FaHeart className="text-red-500 text-2xl" />
          ) : (
            <FaRegHeart className="text-2xl opacity-100 hover:opacity-100" />
          )
        ) : (
          <FaRegHeart
            className="text-2xl opacity-20 cursor-not-allowed hover:opacity-40"
            title="로그인이 필요합니다."
          />
        )}
      </button>
    </div>
  );
};

// 🔎 게시물 검색
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };
  const { handleError } = useUserDispatch();

  const handleSearchClick = async () => {
    if (query.trim() !== '') {
      try {
        const response = await axios.get(
          `${IP_ADDRESS}/board/searchTitle?title=${query.trim()}`,
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              Accept: 'application/json',
              'Authorization-Access': accessToken,
            },
          }
        );
        if (response.data && Array.isArray(response.data.items)) {
          const formattedData = response.data.items.map((item) => ({
            id: item.ID,
            title: item.title,
            description: item.description,
            imageUrl: item.imageUrl,
            likeCount: item.likeCount,
          }));

          onSearch(formattedData);
        } else {
          console.error('검색결과가 배열이 아닙니다', response.data);
        }
        setQuery('');
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <div className="font-score flex-grow flex items-center rounded-full bg-gray-50 p-1 shadow">
      <input
        className="w-full pl-2 py-2 text-sm focus:outline-none bg-gray-50"
        type="text"
        placeholder="검색"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button
        className="flex items-center justify-center hover:bg-gray-200 px-3 py-2 rounded-full"
        onClick={handleSearchClick}
        style={{ minWidth: '40px', height: '40px', borderRadius: '30px' }}
      >
        <img
          src={ICON_SEARCHING}
          alt="검색아이콘"
          className="w-7 h-6"
          style={{ opacity: 0.5 }}
        />
      </button>
    </div>
  );
};

// ✍️ 게시물 작성 페이지로 이동
const WriteButton = () => {
  return (
    <Link
      to="/board/upload"
      className="bg-gray-50 ml-3 flex items-center justify-center rounded-full p-3 shadow write-button transition-transform duration-200 hover:scale-110 hover:bg-gray-200"
    >
      <PiPencilSimpleLine style={{ fontSize: '26px' }} />
    </Link>
  );
};

// ----------------------------게시판
function Board() {
  const [recipes, setRecipes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [likedPosts, setLikedPosts] = useState([]); // 좋아요 누른 게시물의 postId 목록
  const [searchResultCount, setSearchResultCount] = useState(0);
  const location = useLocation();
  const recipesPerPage = 6;
  const { handleError } = useUserDispatch();

  // ⏯️ 실행: 처음 렌더링 1번
  useEffect(() => {
    fetchLikedPosts();
    fetchTotalRecipes();
  }, [location.pathname]);

  // ⏯️ 실행: 처음 렌더링, 페이지별 정보가 업데이트 될 때마다
  useEffect(() => {
    fetchRecipesByPage(currentPage);
  }, [currentPage]);

  // 🔥 현재 계정으로 좋아요 누른 게시물들 가져오는 함수
  const fetchLikedPosts = async () => {
    if (!accessToken) {
      console.log(' fetchLikedPosts : accessToken 없음');
      return;
    }
    const URL = `${IP_ADDRESS}/board/islike?id=${email}`;
    try {
      const response = await axios.get(URL, {
        headers: {
          'Authorization-Access': accessToken,
        },
      });

      if (response.data) {
        const posts = response.data.map(Number);
        setLikedPosts(posts);
        console.log('좋아요 누른 게시물의 postId 목록:', posts);
      }
    } catch (error) {
      handleError(error);
    }
  };

  // 1️⃣ 전체 레시피 수를 가져오는 함수
  const fetchTotalRecipes = async () => {
    try {
      const response = await axios.get(`${IP_ADDRESS}/board/total`);

      console.log(response.data);
      const totalRecipes = response.data;

      const totalPages = Math.ceil(totalRecipes / recipesPerPage);
      setTotalPages(totalPages);

      console.log('총 페이지 수:', totalPages);
    } catch (error) {
      handleError(error);
    }
  };

  // 2️⃣ 각 페이지에 해당하는 레시피들을 불러오는 함수
  const fetchRecipesByPage = async (pageNumber) => {
    try {
      const response = await axios.get(`${IP_ADDRESS}/board/page`, {
        params: { data: pageNumber.toString() },
      });

      if (response.data && Array.isArray(response.data.items)) {
        const formattedData = response.data.items.map((item) => ({
          id: item.ID,
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
          likeCount: item.likeCount,
        }));

        setRecipes(formattedData);
      } else {
        console.error(' 데이터 형식이 다름 에러내용:', response.data);
      }
    } catch (error) {
      handleError(error);
    }
  };

  // ⏯️ 실행: 처음 렌더링, 게시물 검색 후
  useEffect(() => {
    if (isSearching) {
      setTotalPages(Math.ceil(searchResultCount / recipesPerPage));
    } else {
      fetchTotalRecipes();
    }
  }, [searchResultCount, isSearching, recipesPerPage]);

  // 3️⃣ 게시물 검색
  const handleSearch = (results) => {
    setSearchResults(results); // 검색 결과 상태 업데이트
    setIsSearching(true); // 검색 모드 활성화
    setSearchResultCount(results.length);
    setCurrentPage(1);

    if (results.length <= recipesPerPage) {
      setTotalPages(1);
    }
  };

  // 4️⃣ 페이지 번호를 받아와 해당 번호에서 1을 뺀 값을 서버로 보내는 함수
  const handlePageClick = (pageNumber) => {
    const newPage = pageNumber - 1;
    if (newPage !== currentPage - 1 && newPage >= 0) {
      fetchRecipesByPage(newPage).then(() => {
        setCurrentPage(pageNumber);
      });
    }
  };

  // 5️⃣ 클릭할 페이지번호 순서대로 조정
  const pageNumbers = [];
  const maxPageNumbersToShow = 5;
  let startPage = Math.max(
    currentPage - Math.floor(maxPageNumbersToShow / 2),
    1
  );
  let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

  // 시작 페이지 조정 (끝 페이지가 총 페이지를 넘지 않도록)
  if (endPage - startPage + 1 < maxPageNumbersToShow) {
    startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="Board pb-24">
      <header className="bg-white px-6 py-7">
        <span className="font-scoreExtrabold font-extrabold text-3xl">
          레시피 게시판
        </span>
      </header>
      <div className=" flex items-center mx-6">
        <SearchBar onSearch={handleSearch} />
        <WriteButton />
      </div>

      <main>
        {isSearching ? (
          <div className="my-2 mt-4">
            <span className="font-scoreExtrabold font-extrabold ml-6 text-2xl">
              검색 결과
            </span>
            {searchResults.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                postId={recipe.id}
                title={recipe.title}
                description={recipe.description}
                img={recipe.imageUrl}
                initialLikeCount={recipe.likeCount}
                isLiked={likedPosts.includes(Number(recipe.id))}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="my-2 mt-4">
              <span className="font-scoreExtrabold font-extrabold ml-6 text-2xl">
                TOP3 레시피🔥
              </span>
              <Ranking />
            </div>
            <div className="my-2">
              <span className="font-scoreExtrabold font-extrabold ml-6 text-2xl">
                레시피🌮
              </span>
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  postId={recipe.id}
                  title={recipe.title}
                  description={recipe.description}
                  img={recipe.imageUrl}
                  initialLikeCount={recipe.likeCount}
                  isLiked={likedPosts.includes(Number(recipe.id))}
                />
              ))}
            </div>
          </>
        )}

        <div className="pagination flex justify-center my-4">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              className="px-4 py-2 border rounded-full m-1 bg-white text-main"
            >
              이전
            </button>
          )}
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageClick(number)}
              className={`px-4 py-2 border rounded-full m-1 ${
                currentPage === number
                  ? 'bg-main text-white'
                  : 'bg-white text-main'
              }`}
            >
              {number}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageClick(currentPage + 1)}
              className="px-4 py-2 border rounded-full m-1 bg-white text-main"
            >
              다음
            </button>
          )}
        </div>
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

export default Board;
