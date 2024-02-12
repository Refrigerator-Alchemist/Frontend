import React, { useEffect, useState } from 'react';

// 랭킹 박스 안 리스트
function RankingItem({ rank, thumbnail, name, ingredients, likes }) {
  return (
    <li className="mb-4">
      <div className="drop-shadow-lg">
        <div className="flex items-center">
          <span className="font-undong">{rank}</span>
          <img src={thumbnail} alt="썸네일" width="80px" height="60px" />
          <span className="font-score font-semibold">{name}</span>
          <span>{ingredients}</span>
          <span>{likes}❤️</span>
        </div>
      </div>
    </li>
  );
}

// 랭킹 박스
// API로부터 데이터를 받아와서 리스트에 props로 전달
export default function Ranking() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/data/rank.json')
      .then((response) => response.json())
      .then((data) => {
        setItems(data.items);
      });
  }, []);

  return (
    <ul>
      {items.map((item) => (
        <RankingItem key={item.rank} {...item} />
      ))}
    </ul>
  );
}
