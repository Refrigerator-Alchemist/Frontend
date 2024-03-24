import React from 'react';
import searchicon from '../assets/img/search.png';
import writingicon from '../assets/img/writing.png';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Ranking from '../components/Ranking';
import Navigation from '../components/Navigation';
import axios from 'axios';

// 🃏 레시피 카드
const RecipeCard = ({ postId, title, description, img, likeCount }) => {
  const [Liked, setLiked] = useState(false);
  const [likedItems, setLikedItems] = useState([]); // 현재 계정으로 좋아요 누른 게시물들
  const nickName = localStorage.getItem('nickName');

  useEffect(() => {
    fetchLikeData();
  }, [likedItems]);

  useEffect(() => {
    setLiked(Array.isArray(likedItems) ? likedItems.includes(postId) : false);
  }, [likedItems, postId]);
  // likedItems 배열이 업데이트될 때마다, 해당 레시피의 좋아요 상태로 설정

  // 💛 좋아요 / 취소
  const toggleLike = async () => {
    try {
      if (Liked) {
        // ▶️ 좋아요 되어있는 상태면 취소
        const response = await axios.post(
          `/board/dislike`,
          {
            nickName: nickName,
            postId: postId,
          },
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              Accept: 'application/json',
            },
          }
        );
        console.log(response);
        setLiked(!Liked);
      } else {
        // ▶️ 안 눌려져 있는 상태면 좋아요
        const response = await axios.post(
          `/board/like`,
          {
            nickName: nickName,
            postId: postId,
          },
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              Accept: 'application/json',
            },
          }
        );
        console.log(response);
        setLiked(!Liked);
      }
    } catch (error) {
      console.error('좋아요 에러: ', error);
    }
  };

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

  return (
    <div className="flex items-center bg-white mx-5 my-2 p-4 rounded-xl shadow">
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
      <button onClick={toggleLike} className="p-2">
        {Liked ? (
          <FaHeart className="text-red-500 text-2xl" />
        ) : (
          <FaRegHeart className="text-2xl" />
        )}
      </button>
    </div>
  );
};

// 🔎 게시물 검색
const SearchBar = ({ onSearch }) => {
  return (
    <div className="font-score flex-grow flex items-center rounded-full bg-gray-50 p-2 shadow ">
      <img
        src={searchicon}
        alt="검색아이콘"
        className="w-5 h-5 ml-2"
        style={{ opacity: 0.5 }}
      />
      <input
        className="w-full pl-2 py-2 text-sm focus:outline-none bg-gray-50"
        type="text"
        placeholder="검색"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

// ✍️ 게시물 작성 페이지로 이동
const WriteButton = () => {
  return (
    <Link
      to="/board/upload"
      className="bg-gray-50 ml-4 flex items-center justify-center rounded-full  p-4 shadow write-button transition-transform duration-200 hover:scale-110"
    >
      <img
        src={writingicon}
        alt="쓰기아이콘"
        className="w-6 h-6 text-bold text-center"
        style={{ opacity: 0.7 }}
      />
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
  const recipesPerPage = 6;

  useEffect(() => {
    fetchTotalRecipes();
  }, []);

  useEffect(() => {
    fetchRecipesByPage(currentPage);
  }, [currentPage]);

  // 1️⃣ 전체 레시피 수를 가져오는 함수
  const fetchTotalRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/boardSize');

      console.log(response.data);
      const totalRecipes = response.data;

      const totalPages = Math.ceil(totalRecipes / recipesPerPage);
      setTotalPages(totalPages);

      console.log('총 페이지 수:', totalPages);
    } catch (error) {
      console.error('전체 레시피 수 가져오기 에러:', error);
    }
  };

  // 2️⃣ 각 페이지에 해당하는 레시피들을 불러오는 함수
  const fetchRecipesByPage = async (pageNumber) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/board/apiTest',
        pageNumber
      );

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
        console.error('에러 내용1:', response.data);
      }
    } catch (error) {
      console.error('에러 내용2:', error);
    }
  };

  useEffect(() => {
    fetchRecipesByPage(1);
  }, []);

  // 3️⃣ 게시물 검색
  const handleSearch = (query) => {
    if (query.length > 0) {
      const results = recipes.filter((recipe) => recipe.title.includes(query));
      setSearchResults(results);
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  // 4️⃣ 페이지 번호를 받아와 해당 번호에서 1을 뺀 값을 서버로 보내는 함수
  const handlePageClick = (pageNumber) => {
    fetchRecipesByPage(pageNumber - 1);
    setCurrentPage(pageNumber);
  };

  // 5️⃣ 클릭할 페이지번호 순서대로
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="Board pb-24">
      <header className="bg-white px-6 py-7">
        <span className="font-scoreExtraBold font-extrabold text-3xl">
          레시피 게시판
        </span>
      </header>
      <div className="flex items-center mx-8 my-0">
        <SearchBar onSearch={handleSearch} />
        <WriteButton />
      </div>

      <main>
        {isSearching ? (
          <>
            <div className="my-2 mt-4">
              <span className="font-scoreExtraBold font-extrabold ml-6 text-2xl">
                검색 결과
              </span>
              {searchResults.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  postId={recipe.id}
                  title={recipe.title}
                  description={recipe.description}
                  img={recipe.imageUrl}
                  likeCount={recipe.likeCount}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="my-2 mt-4">
              <span className="font-scoreExtrabold font-extrabold ml-6 text-2xl">
                TOP3 레시피🔥
              </span>

              <Ranking />
            </div>
            <div className="my-2">
              <span className="font-scoreExtraBold font-extrabold ml-6 text-2xl">
                레시피🌮
              </span>
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  postId={recipe.id}
                  title={recipe.title}
                  description={recipe.description}
                  img={recipe.imageUrl}
                  likeCount={recipe.likeCount}
                />
              ))}
            </div>
          </>
        )}

        <div className="pagination flex justify-center my-4">
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

// 좋아요 조회 테스트
// import React, { useState, useEffect } from 'react';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// // 🃏 레시피카드 컴포넌트
// const RecipeCard = ({ postId, title, description, img }) => {
//   const [Liked, setLiked] = useState(false);
//   const [likedItems, setLikedItems] = useState([1, 2]); // 초기에 postid 1, 2번 게시물에 좋아요가 되어있다고 가정

//   useEffect(() => {
//     setLiked(likedItems.includes(postId));
//   }, [likedItems, postId]);

//   // 💛 좋아요 / 취소 토글
//   const toggleLike = () => {
//     setLiked(!Liked);
//     if (Liked) {
//       setLikedItems(likedItems.filter(item => item !== postId));
//     } else {
//       setLikedItems([...likedItems, postId]);
//     }
//   };

//   return (
//     <div className="flex items-center bg-white mx-5 my-2 p-4 rounded-xl shadow">
//       <Link to={`/board/${postId}`} className="flex-grow flex">
//         <div className="flex-none w-20 h-20 rounded-xl border-2 border-gray-300 overflow-hidden">
//           <img className="w-full h-full object-cover" src={img} alt={title} />
//         </div>
//         <div className="px-4 py-4">
//           <h3 className="text-lg font-semibold">{title}</h3>
//           <p className="text-gray-500 text-sm">{description}</p>
//         </div>
//       </Link>
//       <button onClick={toggleLike} className="p-2">
//         {Liked ? <FaHeart className="text-red-500 text-2xl" /> : <FaRegHeart className="text-2xl" />}
//       </button>
//     </div>
//   );
// };

// // ----------------------------게시판
// function Board() {
//   const recipesData = [
//     { postId: 1, title: '레시피 1', description: '설명 1', img: 'img_url_1' },
//     { postId: 2, title: '레시피 2', description: '설명 2', img: 'img_url_2' },
//     { postId: 3, title: '레시피 3', description: '설명 3', img: 'img_url_3' },
//   ];

//   return (
//     <section className="Board pb-24">
//       <div className="my-2">
//         <span className="font-bold ml-6 text-2xl">레시피 목록</span>
//         {recipesData.map(recipe => (
//           <RecipeCard
//             key={recipe.postId}
//             postId={recipe.postId}
//             title={recipe.title}
//             description={recipe.description}
//             img={recipe.img}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Board;
