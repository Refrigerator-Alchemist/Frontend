import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IP_ADDRESS } from '../context/UserContext';
import { toast } from 'react-toastify';

// 📋 각 게시물
function RankingItem({
  rank,
  imageUrl,
  title,
  ingredients,
  likeCount,
  onClick,
}) {
  return (
    <li
      className="mb-4 mt-2 px-3 transition transform hover:scale-110 ease-in-out duration-300"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <figure className="flex items-center justify-between drop-shadow-xl">
        <div className="flex items-center justify-center space-x-10">
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

// 🏆 Top3 게시물
export default function Ranking() {
  const [topItems, setTopItems] = useState([]);
  const navigate = useNavigate();

  // ⏯️ 실행: 처음 렌더링, topItems 업데이트
  useEffect(() => {
    const fetchRanking = async () => {
      const URL = `${IP_ADDRESS}/ranking/top3`;

      try {
        const response = await axios.get(URL);

        if (response.data && Array.isArray(response.data.items)) {
          const items = response.data.items.map((item) => ({
            id: item.ID,
            imageUrl: item.imageUrl,
            title: item.title,
            ingredients: item.ingredients.map((ingredient) => ingredient),
            likeCount: item.likeCount,
          }));
          setTopItems(items);
        } else {
          toast.error('Top3 게시물 정보 받는 중 오류');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRanking();
  }, []);

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
        {topItems.map((topItem, index) => (
          <RankingItem
            key={index + 1}
            rank={index + 1}
            {...topItem}
            onClick={() => {
              navigate(`/board/${topItem.id}`);
            }}
          />
        ))}
      </ul>
    </article>
  );
}
