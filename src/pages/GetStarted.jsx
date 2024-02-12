import React from 'react';
import Logo from '../components/Logo';
import Name from '../components/Name';
import { useNavigate, Link } from 'react-router-dom';

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-main flex items-center justify-center">
      <div className="text-center flex flex-col space-y-8 items-center h-full py-8">
        <Name />
        <Logo className="mb-4" />
        <Link
          className="text-white text-2xl p-5 font-bold font-jua transition ease-in-out delay-150 rounded-md bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-[#15ed79] duration-300 ..."
          onClick={() => {
            navigate('/main');
          }}
        >
          시작하기
        </Link>
      </div>
    </div>
  );
}
