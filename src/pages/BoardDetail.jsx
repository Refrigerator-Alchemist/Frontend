import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import Navigation from '../components/Navigation';
import axios from 'axios';

const BoardDetail = () => {
  const { postId } = useParams(); // 라우터 엔드포인트
  const [imageUrl, setImageUrl] = useState(''); // 이미지
  const [title, setTitle] = useState(''); // 레시피 글 제목
  const [nickName, setNickName] = useState(''); // 작성자 닉네임

  const [description, setDescription] = useState(''); // 내용
  const [ingredients, setIngredients] = useState([]); // 재료
  const [Nickname, setNickname] = useState(''); // 작성자 닉네임
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostData(postId);
  }, [postId]);


  // 1️⃣ 서버에서 기존 정보들을 불러오는 함수
  const fetchPostData = async (postId) => {
    try {
      const response = await axios.post(
        `http://172.30.1.55:8080/board/specific`,
        postId
      );

      if (response.data) {
        if (response.data && Array.isArray(response.data.items)) {
          const items = response.data.items.map((item) => ({
            imageUrl: item.imageUrl,
            title: item.title,
            nickName: item.nickName,
            description: item.description,
            ingredients: item.ingredients.map((ingredient) => ingredient),
          }));
          setImageUrl(items[0].imageUrl);
          setTitle(items[0].title);
          setNickName(items[0].nickName);
          setDescription(items[0].description);
          setIngredients(items[0].ingredients);
          setNickname(items[0].Nickname);  //닉네임 추가 
        }
      } else {
        console.error('데이터 타입 오류:', response.data);
      }
    } catch (error) {
      console.error('에러 내용:', error);
    }
  };

  // 2️⃣ 좋아요 / 취소
   const toggleLike = async (postId) => {
    try {
      if (isLiked) {
        // 좋아요 취소 
        await axios.post(`http://172.30.1.55:8080/board/unlike`,
        { postId }
        );
        setIsLiked(false);
      } else {
        // 좋아요 
        await axios.post(`http://172.30.1.55:8080/board/like`, 
        { postId }
        );
        setIsLiked(true);
      }
    } catch (error) {
      console.error('좋아요 에러내용:', error);
    }
  };
  

  return (
    <section>
      <div
        className="absolute top-5 left-42 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate("/board")}
      >
        <FaArrowLeft />
      </div>

      <main className="pt-16">
        <img
          src={imageUrl}
          alt={title}
          className="mt-10 mb-4 w-80 h-60 object-cover rounded-lg mx-auto sm:w-80"
        />

        <div className="flex flex-col items-center mt-12">
          <div className="flex items-center gap-4">
            
            <h2 className="font-score text-2xl font-bold">{title}</h2>
           
            <button onClick={() => toggleLike(postId)} className="ml-4">
              {isLiked ? (
                <FaHeart className="text-red-500 text-2xl" />
              ) : (
                <FaRegHeart className="text-2xl" />
              )}
            </button>
            
          </div>
          <div>
            <h2 className="font-score text-2xl font-bold">
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
          position: "fixed",
          bottom: "0",
          width: "100%",
          maxWidth: "31rem",
        }}
      >
        <Navigation />
      </footer>
    </section>
  );
};

export default BoardDetail;
