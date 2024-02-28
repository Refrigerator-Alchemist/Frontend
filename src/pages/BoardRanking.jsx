import React from 'react';
import Ranking from '../components/Ranking';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function BoardRanking() {
  const navigate = useNavigate();
  return (
    <section className="relative flex flex-col items-center justify-center font-score min-h-screen">
      {/* 뒤로가기 버튼 */}
      <div
        className="absolute top-5 left-5 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/board')}
      >
        <FaArrowLeft />
      </div>

      <h1 className="text-5xl font-extrabold mb-10">Top 5🔥</h1>
      <Ranking />
    </section>
  );
}
