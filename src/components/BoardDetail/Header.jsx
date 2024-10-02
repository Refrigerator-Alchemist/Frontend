import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { PiSirenFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const BoardDetailHeader = ({ reportPost }) => {
  const navigate = useNavigate();

  return (
    <header className="flex flex-row justify-between mt-5">
      <div
        className="ml-5 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/board')}
      >
        <FaArrowLeft />
      </div>

      <div
        className="mr-5 border-2 w-10 h-10 transition ease-in-out delay-150 text-red-500 hover:bg-red-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={reportPost}
      >
        <PiSirenFill />
      </div>
    </header>
  );
};

export default BoardDetailHeader;
