import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 📋 아이템 카드
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
          <span className="font-score text-md font-bold ml-5">
            {likes}
            <span className="ml-2">❤️</span>
          </span>
        </div>
      </figure>
    </li>
  );
}

// 🏆 Top 3 아이템들
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
        {items.map((item) => (
          <RankingItem key={item.rank} {...item} />
        ))}
      </ul>
    </article>
  );
}
