import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 📋 아이템 카드
function RankingItem({ rank, imageUrl, title, ingredients, likeCount }) {
  return (
    <li className="mb-4 mt-2 px-3 transition transform hover:scale-110 ease-in-out duration-300">
      <figure className="flex topItems-center justify-between drop-shadow-xl">
        <div className="flex topItems-center justify-center space-x-10">
          <div style={{ width: '30px' }}>
            <span className="font-undong">{rank}</span>
          </div>
          <img
            src={imageUrl}
            alt="썸네일"
            width="60px"
            height="40px"
            className="ml-1"
          />
          <div className="flex flex-col">
            <span className="font-score font-semibold">{title}</span>
            <span className="font-score text-sm">{ingredients.join(', ')}</span>
          </div>
        </div>

        <div>
          <span className="font-score text-md font-bold ml-5">
            {likeCount}
            <span className="ml-2">❤️</span>
          </span>
        </div>
      </figure>
    </li>
  );
}

// 🏆 Top 3 아이템들
export default function Ranking() {
  const [topItems, setTopItems] = useState([]);
  const [id, setId] = useState('');
  const navigate = useNavigate();

  // imageUrl : imageUrl 썸네일
  // title : title 음식 이름
  // ingredients : ingredients 재료
  // likeCount : likeCount 좋아요 수
  // id : 키

  useEffect(() => {
    const URL = 'http://192.168.0.13:8080/board/apiTestLikeCount';
    axios.get(URL).then(function (response) {
      if (response.data && Array.isArray(response.data.items)) {
        const items = response.data.items.map((item) => ({
          id: item.id,
          imageUrl: item.imageUrl,
          title: item.title,
          ingredients: item.ingredients.map((ingredient) => ingredient),
          likeCount: item.likeCount,
        }));
        setTopItems(items); // ▶️ json을 받아와서 topItems에 저장
        setId(id); // ▶️ id에 저장
      } else {
        console.error('서버에서 데이터 전송 중 오류 발생');
      }
    });
  }, []);

  // 👿 ID 보내고 게시물 포스트 ID 받기
  const getPostId = async () => {
    const URL = 'http://192.168.0.13:8080/board/specific';
    try {
      axios.post(URL, id, {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    } catch (error) {
      console.error('에러 내용:', error);
    }
  };

  return (
    <article
      className="hover:cursor-pointer w-full my-2 px-3"
      onClick={() => {
        navigate('/ranking');
      }}
    >
      <div className="flex justify-end">
        <span className="flex flex-col justify-end font-score text-sm">
          가장 많은 좋아요를 받은 레시피는?
        </span>
      </div>

      <ul>
        {topItems.map((item) => (
          <RankingItem key={item.id} {...item} onClick={() => {}} />
        ))}
      </ul>
    </article>
  );
}
