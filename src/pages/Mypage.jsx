import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white h-screen text-black">
      <div className="p-4 flex items-center">
        <FaArrowLeft className="text-2xl cursor-pointer" onClick={() => navigate(-1)} />
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-gray-300 rounded-full h-40 w-40 mt-20"></div>
        <h1 className="mt-12 text-xl font-semibold">user1</h1>
        <p className="mt-8 pb-12 px-6 text-center">한줄 자기소개</p>
        <Link to='/profile' className="mt-10  w-60 bg-gray-100 text-gray-800 font-semibold py-2 px-4 border  rounded-full shadow">
          프로필 수정
        </Link>
        <Link to='/board' className="mt-8 w-60 bg-gray-100 text-gray-800 font-semibold py-2 px-4 border  rounded-full shadow">
          내가 저장한 레시피
        </Link>
      </div>
    </div>
  );
};

export default MyPage;
