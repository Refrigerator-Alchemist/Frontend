import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/assets/img/logo.png';

const Loading = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <img src={logo} alt="로딩 중" className="animate-bounce w-40 h-40 mb-4" />
      <h1 className="font-score text-2xl font-bold text-gray-900 mb-4">
        로딩 중
      </h1>
      <button
        onClick={() => navigate('/recipe/recommend')}
        className="font-score text-sm text-gray-400"
      >
        취소
      </button>
    </section>
  );
};

export default Loading;
