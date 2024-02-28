import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 컴포넌트 안 개별 아이템
function RankingItem({ rank, thumbnail, name, ingredients, likes }) {
  return (
    <li className="mb-4 mt-2 px-3 transition transform hover:scale-110 ease-in-out duration-300">
      <figure className="flex items-center justify-between drop-shadow-xl">
        <div className="flex items-center justify-center space-x-10">
          <div style={{ width: '30px' }}>
            <span className="font-undong">{rank}</span>
          </div>
          <img
            src={thumbnail}
            alt="썸네일"
            width="60px"
            height="40px"
            className="ml-1"
          />
          <div className="flex flex-col">
            <span className="font-score font-semibold">{name}</span>
            <span className="font-score text-sm">{ingredients.join(', ')}</span>
          </div>
        </div>

        <div>
          <span className="font-ansung text-md font-bold ml-5">{likes}❤️</span>
        </div>
      </figure>
    </li>
  );
}

// 랭킹 컴포넌트
export default function Ranking() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/rank.json')
      .then((response) => response.json())
      .then((data) => {
        setItems(data.items);
      });
  }, []);

  return (
    <article
      className="hover:cursor-pointer w-full my-4 px-3"
      onClick={() => {
        navigate('/ranking');
      }}
    >
      <div className="flex justify-between">
        <span className="font-undong font-bold text-2xl">Ranking</span>
        <span className="flex flex-col justify-end font-score text-sm">
          인기많은 레시피를 볼까요?
        </span>
      </div>

      <ul>
        {items.map((item) => (
          <RankingItem key={item.rank} {...item} />
        ))}
      </ul>
    </article>
  );
}
