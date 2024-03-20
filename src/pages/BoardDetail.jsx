import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import Navigation from '../components/Navigation';
import axios from 'axios';

const BoardDetail = () => {
  const [postData, setPostData] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const { postid } = useParams();
  const navigate = useNavigate();


  //상세페이지 
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.post(`http://172.30.1.55:8080/board/specific`, { postId: postid });
        const { data } = response;
        setPostData(data);
        setIsLiked(data.isLiked);// 하트가 
      } catch (error) {
        console.error('에러 내용:', error);
      }
    };

    fetchPostData();
  }, [postid]);


  // 하트 아이콘을 클릭했을 때 실행되는 함수
  // const handleLikeClick = async () => {
    
  // };

  
  return (
    <section>
      <div
        className="absolute top-5 left-42 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/board')}
      >
        <FaArrowLeft />
      </div>

      <main className="pt-16">
        <img
          src={postData.thumbnail}
          alt={postData.title}
          className="mt-10 mb-4 w-80 h-60 object-cover rounded-lg mx-auto sm:w-80"
        />

        <div className="flex flex-col items-center mt-8">
          <div className="flex items-center gap-4">
            <h2 className="font-score text-2xl font-bold">{postData.title}</h2>
            {/* <button onClick={handleLikeClick} className="ml-2">
              {isLiked ? (
                <FaHeart className="text-red-500 text-2xl" />
              ) : (
                <FaRegHeart className="text-2xl" />
              )}
            </button> */}
          </div>
          <div className="font-score text-sm text-gray-500 my-2">
            {postData.ingredients ? postData.ingredients.join(' · ') : ''}
          </div>
          <p className="text-gray-700 font-score">{postData.description}</p>
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
