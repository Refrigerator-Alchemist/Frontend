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
    // 이메일, 비밀번호 서버로 전송
  };

  // 이메일에 @ 미포함시 재입력 하라는 문구가 인풋 아래에 뜨도록 after 속성 추가
  // 그리고 value 초기화
  // 로그인, 회원가입, 비밀번호 재설정에 모두 필요하므로 따로 모듈화 하기!

  // 로그인 실패 함수
  // 로그인 버튼을 눌렀을 때 서버로 요청해서 돌아오는 response를 받아와 '없는 이메일' '비밀번호 틀림'
  // alert로 띄워서 다시 로그인 하도록 만들어야 함

  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col items-center justify-between font-score p-8 min-h-screen">
      <div
        className="absolute top-5 left-5 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/main')}
      >
        <FaArrowLeft />
      </div>

      <header className="flex flex-col items-center justify-center">
        <Logo width="250px" height="250px" />
        <h1 className="text-3xl font-extrabold">로그인</h1>
      </header>

      <main>
        <form className="p-4 rounded-xl" style={{ width: '400px' }}>
          <div className="mb-4">
            <label className="block text-gray-700 ml-3">이메일</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-3 mt-1 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="E-mail"
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 ml-3">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 mt-1 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="PW"
            />
          </div>
          <p
            onClick={() => navigate('/login/resetpw')}
            className="flex justify-end underline font-bold hover:cursor-pointer mb-4 "
          >
            비밀번호 재설정
          </p>
          <button
            onClick={handleSubmit}
            className="w-full py-2 text-white bg-main rounded-3xl font-jua text-2xl transition ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-[#15ed79] hover:text-black duration-300"
          >
            로그인
          </button>
        </form>
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
