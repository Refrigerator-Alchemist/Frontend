import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 랭킹 박스 안 리스트 = 아이템
function RankingItem({ rank, thumbnail, name, ingredients, likes }) {
  return (
    <li className="mb-4">
      <div className="drop-shadow-lg">
        <div className="flex items-center space-x-7">
          <div className="flex items-center">
            <span className="font-undong">{rank}</span>
            <img
              src={thumbnail}
              alt="썸네일"
              width="60px"
              height="40px"
              className={rank === 1 ? 'ml-2' : 'ml-1'}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-score font-semibold">{name}</span>
            <span className="font-score text-sm">{ingredients.join(', ')}</span>
          </div>
          <span className="font-ansung text-md font-bold">{likes}❤️</span>
        </div>
      </div>
    </li>
  );
}

// 랭킹 박스
// API로부터 데이터를 받아와서 리스트에 props로 전달
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
    <div
      className="hover:cursor-pointer w-full my-4"
      onClick={() => {
        navigate('/board');
      }}
    >
      <div className="flex mb-1 justify-between">
        <span className="font-undong font-bold">Ranking</span>
        <span className="font-score text-sm">인기많은 레시피를 볼까요?</span>
      </div>
      <ul>
        {items.map((item) => (
          <RankingItem key={item.rank} {...item} />
        ))}
      </ul>
    </div>
  );
}
