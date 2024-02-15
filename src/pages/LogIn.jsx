import React, { useState } from 'react';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API 통신 코드
  };

  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-between p-10 min-h-screen relative font-score">
      <div
        className="absolute top-5 left-5 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </div>
      <header className="flex flex-col items-center justify-center">
        <Logo width="250px" height="250px" />
        <h1>로그인</h1>
      </header>
      <main className="p-4 rounded-xl" style={{ width: '400px' }}>
        <div className="mb-4">
          <label className="block text-gray-700">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-3 py-2 mt-1 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="이메일 입력"
          />
        </div>
        <div className="mb-1">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 mt-1 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="비밀번호 입력"
          />
        </div>
        <p
          onClick={() => navigate('/login/resetpw')}
          className="flex justify-end underline font-bold hover:cursor-pointer mb-4 "
        >
          비밀번호 찾기
        </p>
        <button
          onClick={handleSubmit}
          className="w-full py-2 text-white bg-main rounded-3xl font-jua text-2xl"
        >
          로그인
        </button>
      </main>
      <footer className="flex flex-col items-center mb-4">
        <p className="my-4 text-gray-400">SNS 간편 로그인</p>
        <figure className="flex mb-4">
          <img
            className="mx-3"
            style={{ width: '45px', height: '45px' }}
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
            alt="google"
          ></img>
          <img
            className="mx-3"
            style={{ width: '45px', height: '45px' }}
            src="https://cdn.imweb.me/upload/S201803255ab755f0896c9/d59972cd95aa1.png"
            alt="kakaotalk"
          ></img>
          <img
            className="mx-3"
            style={{ width: '45px', height: '45px' }}
            src="https://clova-phinf.pstatic.net/MjAxODAzMjlfOTIg/MDAxNTIyMjg3MzM3OTAy.WkiZikYhauL1hnpLWmCUBJvKjr6xnkmzP99rZPFXVwgg.mNH66A47eL0Mf8G34mPlwBFKP0nZBf2ZJn5D4Rvs8Vwg.PNG/image.png"
            alt="naver"
          ></img>
        </figure>
        <div className="flex">
          <span>계정이 없으신가요?</span>
          <span
            onClick={() => navigate('/login/signup')}
            className="underline font-bold hover:cursor-pointer ml-5"
          >
            회원가입 하기
          </span>
        </div>
      </footer>
    </section>
  );
}
