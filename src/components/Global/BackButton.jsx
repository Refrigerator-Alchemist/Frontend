import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import React from 'react';

function BackButton({ destination }) {
  const navigate = useNavigate();

  return (
    <div
      className="absolute top-5 left-5 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
      onClick={() => navigate(destination)}
    >
      <FaArrowLeft />
    </div>
  );
}

export default React.memo(BackButton);
