import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { useUserDispatch } from '../context/UserContext';
import LOGO_GOOGLE from '../assets/img/logo_google.png';
import LOGO_KAKAO from '../assets/img/logo_kakao.png';
import LOGO_NAVER from '../assets/img/logo_naver.png';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false); // 이메일 유효성 검사
  const [emailError, setEmailError] = useState(''); // 로그인 오류 메세지

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시

  const [notAllow, setNotAllow] = useState(true); // 로그인 disabled on/off

  const { login, kakaoLogin, googleLogin, naverLogin } = useUserDispatch(); // 로그인 dispatch

  const navigate = useNavigate();
  const location = useLocation();

  const socialType = 'Refrigerator-Alchemist';

  // 🚷 로그인 유저 접속 차단
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      toast.error('이미 로그인 상태입니다');
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  }, [navigate, location]);

  // 🔓 로그인 버튼 활성화
  useEffect(() => {
    if (emailValid && password.length > 8) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, password]);

  // 1️⃣ 이메일 입력값 저장
  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    // ▶️ 이메일 유효성 검사 : '.com .net .org' 형식
    const pattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!pattern.test(email)) {
      setEmailError('이메일 형식이 올바르지 않습니다 : .com .net .org');
      setEmailValid(false);
    } else {
      setEmailError('');
      setEmailValid(true);
    }
  };

  // 2️⃣ 비밀번호 입력값 저장
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // 비밀번호 사용자에게 표시
  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // 3️⃣ 서버에 로그인 정보 (이메일, 패스워드, socialType) 전송 : 로그인 버튼
  const onLogin = (e) => {
    e.preventDefault();
    login(email, password, socialType);
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen">
      {/* 뒤로가기 버튼 */}
      <div
        className="absolute top-5 left-5 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/main')}
      >
        <FaArrowLeft />
      </div>

      {/* 로고, 타이틀 */}
      <header className="flex flex-col items-center justify-center">
        <Logo page="login" width="250px" height="250px" />
        <h1 className="text-3xl font-score">로그인</h1>
      </header>

      {/* 이메일, 비밀번호 입력 + 로그인 */}
      <main>
        <form
          className="p-4 rounded-xl"
          style={{ width: '400px' }}
          onSubmit={onLogin}
        >
          <div className="">
            <label className="block text-gray-700 ml-3 font-score">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-3 mt-1 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-score"
              placeholder="이메일"
              required
            />
            <p
              className={`text-red-500 text-sm pl-3 mt-1 ${
                emailError ? 'visible' : 'invisible'
              }`}
            >
              {emailError || 'empty'}
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 ml-3 font-score">
              비밀번호
            </label>
            <div className="flex">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 mt-1 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-score"
                placeholder="비밀번호"
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="inline-block whitespace-nowrap h-12 ml-5 mt-2 rounded-xl font-score text-md hover:text-red-500"
              >
                {showPassword ? <GoEye /> : <GoEyeClosed />}
              </button>
            </div>
          </div>
          <p
            onClick={() => navigate('/reset-password')}
            className="flex justify-start ml-2 underline font-bold hover:cursor-pointer hover:text-red-500 mb-4 font-score"
          >
            비밀번호 재설정
          </p>
          <button
            type="submit"
            disabled={notAllow}
            className={`w-full py-2 text-2xl font-scoreExtraBold font-extrabold transition ease-in-out duration-300 rounded-3xl ${
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
        <p className="my-4 text-gray-400 font-score">SNS 간편 로그인</p>
        <figure className="flex mb-4">
          <button onClick={googleLogin}>
            <img
              className="mx-3 hover:scale-110"
              style={{ width: '45px', height: '45px' }}
              src={LOGO_GOOGLE}
              alt="google"
            ></img>
          </button>
          <button onClick={kakaoLogin}>
            <img
              className="mx-3 hover:scale-110"
              style={{ width: '45px', height: '45px' }}
              src={LOGO_KAKAO}
              alt="kakaotalk"
            ></img>
          </button>
          <button onClick={naverLogin}>
            <img
              className="mx-3 hover:scale-110"
              style={{ width: '45px', height: '45px' }}
              src={LOGO_NAVER}
              alt="naver"
            ></img>
          </button>
        </figure>

        {/* 이메일 회원가입 */}
        <div className="flex">
          <span className="font-score">계정이 없으신가요?</span>
          <span
            onClick={() => navigate('/signup')}
            className="underline font-bold hover:cursor-pointer hover:text-red-500 ml-5 font-score"
          >
            회원가입 하기
          </span>
        </div>
      </footer>
    </section>
  );
}
