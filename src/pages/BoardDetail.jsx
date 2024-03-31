import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import Navigation from '../components/Navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IP_ADDRESS } from '../context/UserContext';
import { PiSirenFill } from 'react-icons/pi';
import { useLocation } from 'react-router-dom';
import mockData from '../assets/data/post.json';

const BoardDetail = () => {
  const { postId } = useParams();
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');

  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const [Liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState('');
  const [likedPosts, setLikedPosts] = useState([]);
  const [nickName, setNickName] = useState('');

  const accessToken = localStorage.getItem('accessToken');
  const myEmail = localStorage.getItem('email');
  const navigate = useNavigate();
  const location = useLocation();

  // ⏯️ 실행: 처음 렌더링, 게시물 검색 후
  useEffect(() => {
    // 🔥 현재 계정으로 좋아요 누른 게시물들 가져오는 함수
    // const fetchLikedPosts = async () => {
    //   if (!accessToken) {
    //     console.log(' fetchLikedPosts : accessToken 없음');
    //     return;
    //   }
    //   const URL = `${IP_ADDRESS}/board/islike?id=${myEmail}`;
    //   try {
    //     const response = await axios.get(URL, {
    //       headers: {
    //         'Authorization-Access': accessToken,
    //       },
    //     });

    //     if (response.data) {
    //       console.log(response);
    //       const posts = response.data.map(Number);
    //       setLikedPosts(posts);
    //       setLiked(posts.includes(Number(postId)));

    //       console.log('좋아요 누른 게시물의 postId 목록:', posts);
    //       console.log('현재 게시물의 postId:', postId);
    //       console.log(
    //         `현재 게시물(${postId})의 좋아요 상태:`,
    //         posts.includes(Number(postId))
    //       );
    //     }
    //   } catch (error) {
    //     console.error('좋아요 누른 기록 받아오는 중 에러 발생', error);
    //   }
    // };

    // fetchPostData(postId);
    fetchMockData(postId);
    // fetchLikedPosts();
  }, [postId, accessToken, email, location, myEmail]);

  // 📝 게시물 정보
  // const fetchPostData = async (postId) => {
  //   try {
  //     const response = await axios.get(
  //       `${IP_ADDRESS}/board/specific?postId=${postId}`
  //     );

  //     if (response.data && Array.isArray(response.data.items)) {
  //       const items = response.data.items.map((item) => ({
  //         imageUrl: item.imageUrl,
  //         title: item.title,
  //         email: item.email,
  //         description: item.description,
  //         ingredients: item.ingredients.map((ingredient) => ingredient),
  //         likeCount: item.likeCount,
  //         nickName: item.nickName,
  //       }));
  //       setImageUrl(items[0].imageUrl);
  //       setTitle(items[0].title);
  //       setEmail(items[0].email);
  //       setDescription(items[0].description);
  //       setIngredients(items[0].ingredients);
  //       setLikeCount(items[0].likeCount);
  //       setNickName(items[0].nickName);
  //     } else {
  //       console.error('데이터 타입 오류:', response.data);
  //     }
  //   } catch (error) {
  //     console.error('에러 내용:', error);
  //   }
  // };

  // 📝 게시물 정보 (Mock Data)
  const fetchMockData = async () => {
    try {
      // post.json 파일에서 데이터를 가져옵니다.

      if (mockData.items && Array.isArray(mockData.items)) {
        const item = mockData.items[0];
        setImageUrl(item.imageUrl);
        setTitle(item.title);
        setEmail(item.email);
        setDescription(item.description);
        setIngredients(item.ingredients);
        setLikeCount(item.likeCount);
        setNickName(item.nickName);
      } else {
        console.error('데이터 타입 오류:', mockData.items);
      }
    } catch (error) {
      console.error('에러 내용:', error);
    }
  };

  // 💛 좋아요 / 취소  (로그인 유저만 누를 수 있음)
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
            email: myEmail,
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

          setLikeCount((prevCount) => Number(prevCount) - 1);
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
            email: myEmail,
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
          setLikeCount((prevCount) => Number(prevCount) + 1);
          setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
        }
        console.log(response);
        console.log('***변경된 likedPosts:', likedPosts);
        setLiked(!Liked);
      }
    } catch (error) {
      console.error('좋아요 에러: ', error);
    }
  };

  // 🚨 게시물 신고
  const reportPost = async (e) => {
    e.preventDefault();

    const URL = `${IP_ADDRESS}/board/report`;

    try {
      const response = await axios.post(
        URL,
        { email: myEmail, postId: postId },
        {
          headers: {
            'Authorization-Access': accessToken,
          },
        }
      );

      if (response.status === 200) {
        console.log(`해당 게시물 ${postId}를 신고했습니다.`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <header className="flex flex-row justify-between mt-5">
        <div
          className="ml-5 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
          onClick={() => navigate('/board')}
        >
          <FaArrowLeft />
        </div>

        <div
          className="mr-5 border-2 w-10 h-10 transition ease-in-out delay-150 text-red-500 hover:bg-red-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
          onClick={reportPost}
        >
          <PiSirenFill />
        </div>
      </header>

      <main className="pt-16">
        <img
          src={imageUrl}
          alt={title}
          className="mt-10 mb-4 w-80 h-60 object-cover rounded-lg mx-auto sm:w-80"
        />

        <div className="flex flex-col items-center mt-12">
          <div className=" items-center">
            <h2 className="font-score text-2xl font-bold">{title}</h2>
            <div>
              <div className="flex items-center justify-center mt-2">
                <span className="text-sm font-score font-semibold mr-2">
                  {likeCount}
                </span>

                <button
                  className="p-2"
                  onClick={
                    accessToken
                      ? toggleLike
                      : () => toast.error('로그인이 필요합니다.')
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
            </div>
          </div>
          <div>
            <h2 className="font-score text-lg font-bold m-2">
              작성자: {nickName}
            </h2>
          </div>
          <div className="font-score text-sm text-gray-500 my-2">
            {ingredients ? ingredients.join(' · ') : ''}
          </div>
          <p className="text-gray-700 font-score pl-12 pr-12">{description}</p>
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
};

export default BoardDetail;
