import React, { useState, useEffect } from 'react';
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoEye,
  GoEyeClosed,
} from 'react-icons/go';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUserApi } from '../context/UserContext';
import { toast } from 'react-toastify';
import InputEmail from '../components/Account/InputVeriNum';

export default function ResetPassword() {
  const [email, setEmail] = useState(''); // 이메일
  const [inputNum, setInputNum] = useState(''); // 입력한 인증번호
  const [password, setPassword] = useState(''); // 새로운 비밀번호
  const [rePassword, setRePassword] = useState(''); // 비밀번호 확인
  const [passwordMessage, setPasswordMessage] = useState(null); // 비밀번호 일치여부 안내 문구
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const userApi = useUserApi();
  const emailType = 'reset-password';
  const socialType = 'Refrigerator-Alchemist';

  /** 이메일 입력값 */
  const handleEmailChange = (e) => setEmail(e.target.value);

  // 2️⃣ 인증 요청
  const requestVerifying = async (e) => {
    e.preventDefault();
    console.log(`입력한 이메일 : ${email}`);

    if (!email) {
      toast.error('이메일을 입력해주세요');
      return;
    }

    userApi.requestEmailForReset(email, emailType, socialType);
  };

  // 3️⃣ 인증 확인
  const checkVerifying = async (e) => {
    e.preventDefault();
    console.log(`입력한 인증번호 : ${inputNum}`);
    userApi.checkCodeVerification(email, emailType, inputNum, socialType);
  };

  // 4️⃣ 비밀번호 유효성 검사
  const isPasswordValid = (password) => {
    return (
      password.length >= 8 &&
      password.length <= 15 &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password) &&
      /[a-zA-Z]/.test(password)
    );
  };

  // 5️⃣ 비밀번호 확인 (e.preventDefault 설정 X)
  const isSamePassword = () => {
    if (password && rePassword) {
      password !== rePassword
        ? setPasswordMessage(false)
        : setPasswordMessage(true);
    } else {
      setPasswordMessage(null);
    }
  };

  useEffect(() => {
    isSamePassword();
  });

  // 비밀번호 보기
  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // 6️⃣ 재설정하기
  const onReset = (e) => {
    e.preventDefault();
    userApi.resetPassword(email, password, rePassword, socialType);
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-8 relative">
      {/* 뒤로가기 버튼 */}
      <div
        className="absolute top-5 left-5 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/login')}
      >
        <FaArrowLeft />
      </div>

      {/* 타이틀 */}
      <header className="flex flex-col items-center mt-12">
        <h1 className="font-score text-3xl">비밀번호 재설정</h1>
        <p className="font-score text-md text-gray-400 mt-2">
          인증을 완료하고, 새로운 비밀번호를 설정하세요
        </p>
      </header>

      <form onSubmit={onReset}>
        <main className="mt-10 w-full px-2">
          <InputEmail
            email={email}
            handleEmailChange={handleEmailChange}
            requestVerifying={requestVerifying}
            selectOption={userApi.emailExists}
            inputNum={inputNum}
            setInputNum={setInputNum}
            checkVerifying={checkVerifying}
          />
        </main>

        {/* 비밀번호 입력 */}
        <div className="flex flex-col mt-10 w-full p-3">
          <div>
            <label className="mb-4 text-lg font-bold font-undong text-center">
              새로운 비밀번호
            </label>
            <div className="flex flex-col mb-4">
              <div className="flex">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                  className="w-full px-4 py-3 mt-2 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo"
                />
                <button
                  onClick={toggleShowPassword}
                  className="inline-block whitespace-nowrap h-12 ml-5 mt-2 rounded-xl font-score text-md hover:text-red-500"
                >
                  {showPassword ? <GoEye /> : <GoEyeClosed />}
                </button>
              </div>
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="mb-4 text-lg font-bold font-undong text-center">
              비밀번호 확인
            </label>
            <div className="flex">
              <input
                type="password"
                value={rePassword}
                onChange={(e) => {
                  setRePassword(e.target.value);
                  isSamePassword();
                }}
                placeholder="한 번 더 입력하세요"
                className="w-full px-4 py-3 mt-2 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo"
              />
            </div>
            <p
              className={`text-sm pl-3 mt-1 ${
                passwordMessage === null
                  ? ''
                  : passwordMessage
                    ? 'text-green-500'
                    : 'text-red-500'
              }`}
            >
              {passwordMessage === null
                ? '\u00A0'
                : passwordMessage
                  ? '비밀번호가 일치합니다'
                  : '비밀번호가 일치하지 않습니다'}
            </p>
          </div>

          <ul className="mt-4 font-score">
            <li className="mb-2 flex items-center">
              <span role="img" aria-label="check" className="flex">
                {userApi.verified ? (
                  <GoCheckCircleFill className="text-emerald" />
                ) : (
                  <GoCheckCircle className="text-emerald" />
                )}
              </span>{' '}
              <span className="ml-3">이메일 인증 완료</span>
            </li>
            <li className="mb-2 flex items-center">
              <span role="img" aria-label="check" className="flex">
                {password.length >= 8 ? (
                  <GoCheckCircleFill className="text-emerald" />
                ) : (
                  <GoCheckCircle className="text-emerald" />
                )}
              </span>{' '}
              <span className="ml-3">
                8자 이상 15자 이하의 비밀번호를 입력해주세요
              </span>
            </li>
            <li className="mb-2 flex items-center">
              <span role="img" aria-label="check" className="flex">
                {isPasswordValid(password) ? (
                  <GoCheckCircleFill className="text-emerald" />
                ) : (
                  <GoCheckCircle className="text-emerald" />
                )}
              </span>{' '}
              <span className="ml-3">
                영문, 숫자, 특수문자 각각 1자 이상을 포함해주세요
              </span>
            </li>
          </ul>
          {/* 재설정 버튼 */}
          <button
            type="submit"
            disabled={
              userApi.verified === false &&
              (password.length < 8 || password.length > 15) &&
              isPasswordValid(password) === false &&
              !passwordMessage
            }
            className={`p-3 mx-20 mt-3 rounded-3xl font-scoreExtrabold font-extrabold text-xl transition ease-in-out duration-300
              ${
                passwordMessage
                  ? 'text-white bg-main hover:bg-[#15ed79] hover:text-black hover:cursor-pointer hover:-translate-y-1 hover:scale-110'
                  : 'bg-gray-500 text-black'
              }
              `}
          >
            재설정하기
          </button>
        </div>
      </form>
    </section>
  );
}
