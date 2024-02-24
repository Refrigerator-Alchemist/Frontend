import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import axios from 'axios';
import Kakao from '../components/Kakao';

export default function LogIn() {
  const [email, setEmail] = useState(''); // 이메일
  const [emailError, setEmailError] = useState(''); // 이메일 유효성 검사
  const [emailValid, setEmailValid] = useState(false);

  const [notAllow, setNotAllow] = useState(true);

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // 이메일 상태 저장
  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    // 이메일 유효성 검사 : '.com .net .org' 형식
    const pattern =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!pattern.test(email)) {
      setEmailError('이메일 형식이 올바르지 않습니다');
      setEmailValid(false);
    } else {
      setEmailError('');
      setEmailValid(true);
    }
  };

  // 이메일 유효성 검사 통과 & 비밀번호 8자 이상 : 로그인 버튼 활성화
  useEffect(() => {
    if (emailValid && password.length > 8) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, password]);

  // 비밀번호 상태 저장
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // 비밀번호 표시
  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // 서버에 로그인 정보 전송 : 이메일, 패스워드, socialType
  const onLogin = async (e) => {
    e.preventDefault();

    const userEmail = email;
    const userPassword = password;
    const socialType = 'Refrigerator-Cleaner';

    const URL = '/login';

    try {
      const response = await axios.post(
        URL,
        {
          userEmail,
          userPassword,
          socialType,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;
      const status = response.status;
      const headers = response.headers;
      const authorization = headers.authorization;
      const accessToken = authorization.replace('Bearer ', '');

      console.log(`data : ${data}`);
      console.log(`status ${status}`);
      console.log(`headers ${headers}`);
      console.log(`JWT : ${accessToken}`);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col items-center justify-between font-score p-8 min-h-screen">
      {/* 뒤로가기 버튼 */}
      <div
        className="absolute top-5 left-5 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/main')}
      >
        <FaArrowLeft />
      </div>

      {/* 로고, 타이틀 */}
      <header className="flex flex-col items-center justify-center">
        <Logo width="250px" height="250px" />
        <h1 className="text-3xl font-extrabold">로그인</h1>
      </header>

      {/* 이메일, 비밀번호 입력 + 로그인 */}
      <main>
        <form className="p-4 rounded-xl" style={{ width: '400px' }}>
          <div className="mb-4">
            <label className="block text-gray-700 ml-3">이메일</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-3 mt-1 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="이메일"
            />
            <p
              className={`text-red-500 text-sm pl-3 mt-1 ${
                emailError ? 'visible' : 'invisible'
              }`}
            >
              {emailError || 'empty'}
            </p>
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 ml-3">비밀번호</label>
            <div className="flex">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 mt-1 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="비밀번호"
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="inline-block whitespace-nowrap h-12 ml-5 mt-2 rounded-xl font-score text-md"
              >
                {showPassword ? <GoEye /> : <GoEyeClosed />}
              </button>
            </div>
          </div>
          <p
            onClick={() => navigate('/login/resetpw')}
            className="flex justify-end underline font-bold hover:cursor-pointer hover:text-red-500 mb-4 "
          >
            비밀번호 재설정
          </p>
          <button
            type="submit"
            onSubmit={(e) => {
              onLogin(e);
            }}
            disabled={notAllow}
            className={`w-full py-2 text-2xl font-jua transition ease-in-out duration-300 rounded-3xl ${
              notAllow
                ? 'bg-gray-500 text-black'
                : 'bg-main text-white hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-[#15ed79] hover:text-black'
            }`}
          >
            로그인
          </button>
        </form>
      </main>

      {/* 신규 회원가입 */}
      <footer className="flex flex-col items-center mb-4">
        {/* SNS 계정으로 가입 */}
        <p className="my-4 text-gray-400">SNS 간편 로그인</p>
        <figure className="flex mb-4">
          <img
            className="mx-3"
            style={{ width: '45px', height: '45px' }}
            src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
            alt="google"
          ></img>
          <Kakao />
          <img
            className="mx-3"
            style={{ width: '45px', height: '45px' }}
            src="https://clova-phinf.pstatic.net/MjAxODAzMjlfOTIg/MDAxNTIyMjg3MzM3OTAy.WkiZikYhauL1hnpLWmCUBJvKjr6xnkmzP99rZPFXVwgg.mNH66A47eL0Mf8G34mPlwBFKP0nZBf2ZJn5D4Rvs8Vwg.PNG/image.png"
            alt="naver"
          ></img>
        </figure>

        {/* 이메일 회원가입 */}
        <div className="flex">
          <span>계정이 없으신가요?</span>
          <span
            onClick={() => navigate('/login/signup')}
            className="underline font-bold hover:cursor-pointer hover:text-red-500 ml-5"
          >
            회원가입 하기
          </span>
        </div>
      </footer>
    </section>
  );
}
