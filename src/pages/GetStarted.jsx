import React from 'react';
import Logo from '../components/Logo';
import Name from '../components/Name';
import { useNavigate, Link } from 'react-router-dom';

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-main flex items-center justify-center">
      <main className="text-center flex flex-col space-y-8 items-center h-full py-8">
        <Name />
        <Logo page="start" width="300px" height="300px" />
        <Link
          className="text-white text-2xl p-5 font-bold font-jua transition ease-in-out rounded-md bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-[#15ed79] hover:text-black duration-300 ..."
          onClick={() => {
            navigate('/main');
          }}
        >
          시작하기
        </Link>
      </main>
    </section>
  );
}
