import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoEye,
  GoEyeClosed,
} from 'react-icons/go';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [email, setEmail] = useState(null); // 사용자의 이메일
  const [emailError, setEmailError] = useState(''); // 이메일 존재 여부 판단

  const [serverCode, setServerCode] = useState(null); // 발급된 인증번호
  const [code, setCode] = useState(Array(4).fill('')); // 입력한 인증번호
  const [codeIssuedTime, setCodeIssuedTime] = useState(null); // 인증번호 발급시간
  const [verified, setVerified] = useState(false); // 이메일 인증 여부

  const [password, setPassword] = useState(''); // 새로운 비밀번호
  const [checkPassword, setCheckPassword] = useState(''); // 비밀번호 확인
  const [passwordMessage, setPasswordMessage] = useState(null); // 비밀번호 일치여부 안내 문구

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // 1️⃣ 이메일 입력값 저장
  const handleEmailChange = (e) => setEmail(e.target.value);

  // 2️⃣ 서버에 존재하는 이메일인지 확인 : 인증 요청 버튼
  const checkEmailExists = async (email) => {
    if (!email) {
      alert('이메일을 입력해주세요');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/send-email', {
        email,
      });

      if (!response.data.exists) {
        setEmailError('존재하지 않는 이메일입니다');
      } else {
        // 이메일 존재 할 때 통과
        setEmailError('');
        requestServerCode(email);
      }
    } catch (error) {
      console.error('이메일 존재 확인 중 에러 발생: ', error);
    }
  };

  // 3️⃣ 인증번호 요청 : 인증 요청 버튼 (이메일 중복 확인 후 동작)
  const requestServerCode = async (email) => {
    try {
      const response = await axios.post('http://localhost:8080/send-email', {
        email,
      });

      // 서버에서 받은 인증번호 저장
      setServerCode(response.data.code);

      // 인증번호 발급시간 저장
      setCodeIssuedTime(new Date().getTime());
      //
    } catch (error) {
      console.error('인증번호 요청 중 에러 발생: ', error);
    }
  };

  // 4️⃣ 인증번호 입력
  const handleCodeChange = (element, index) => {
    if (element.target.value) {
      setCode([
        ...code.slice(0, index),
        element.target.value,
        ...code.slice(index + 1),
      ]);

      if (index < 3) {
        document.getElementById(`input${index + 1}`).focus();
      }
    }
  };

  // 5️⃣ 인증번호 만료 여부 : 인증 확인 버튼
  const isCodeExpired = (e) => {
    e.preventDefault();

    // 현재 시간과 인증번호 발급 시간의 차이(분) 계산
    const timeDifference = (new Date().getTime() - codeIssuedTime) / 1000 / 60;

    // 인증번호가 만료되었는지 확인 : 5분
    if (timeDifference > 5) {
      console.log('인증번호가 만료되었습니다');
      alert('인증번호가 만료되었습니다');
      return true;
    } else {
      console.log('인증번호가 유효합니다');
      isCodeVaild(e);
      return false;
    }
  };

  // 6️⃣ 인증번호 검증 (인증번호 만료 확인 후 시행)
  const isCodeVaild = async (e) => {
    e.preventDefault();

    const userCode = code.join('');

    if (userCode !== serverCode) {
      setCode('');
      alert('인증번호가 일치하지 않습니다');
    } else {
      try {
        // 서버에 인증 완료 상태 전송
        const response = await axios.post(
          'http://localhost:8080/verify-email',
          {
            email: email,
            code: userCode,
          }
        );

        if (response.data.success) {
          // 서버에서 성공 응답을 받았을 경우
          setVerified(true); // 인증 완료
          setServerCode('');
          alert('인증 완료!');
        } else {
          alert('인증 실패: ' + response.data.message);
        }
      } catch (error) {
        console.error('인증 완료 상태 전송 중 에러 발생: ', error);
      }
    }
  };

  // 7️⃣ 비밀번호 유효성 검사
  const isPasswordValid = (password) => {
    return (
      /\d/.test(password) &&
      /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password) &&
      /[a-zA-Z]/.test(password)
    );
  };

  // 8️⃣ 비밀번호 확인 (e.preventDefault 설정 X)
  const isSamePassword = () => {
    if (password && checkPassword) {
      password !== checkPassword
        ? setPasswordMessage(false)
        : setPasswordMessage(true); // disabled 풀림
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

  // 9️⃣ 서버에 새롭게 설정한 비밀번호를 전송해서 저장하기 : 재설정하기 버튼
  const resetPassword = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/confirmpw', {
        email,
        password,
      });

      if (response.data.success) {
        console.log('비밀번호가 성공적으로 재설정되었습니다');
        alert('비밀번호가 성공적으로 재설정되었습니다');
      } else {
        console.log(
          '비밀번호 재설정에 실패하였습니다: ' + response.data.message
        );
        alert('비밀번호 재설정에 실패하였습니다: ' + response.data.message);
      }
    } catch (error) {
      console.error('비밀번호 재설정 중 에러 발생: ', error);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-8 relative">
      {/* 뒤로가기 버튼 */}
      <div
        className="absolute top-5 left-5 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/login')}
      >
        <FaArrowLeft />
      </div>

      {/* 타이틀 */}
      <header className="flex flex-col items-center">
        <h1 className="font-score font-extrabold text-3xl">비밀번호 재설정</h1>
        <p className="font-score text-md text-gray-400 mt-2">
          재설정할 계정의 이메일과 필수 정보를 입력하세요
        </p>
      </header>

      <form onSubmit={resetPassword}>
        {/* 이메일 인증하기 */}
        <main className="mt-10 w-full px-2">
          {/* 이메일 확인 후 인증요청*/}
          <div>
            <label className="mb-4 text-lg font-bold font-undong text-center ">
              이메일
            </label>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-3 mt-2 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="이메일"
              />
              <button
                onClick={checkEmailExists}
                className="inline-block whitespace-nowrap h-12 px-6 ml-5 mt-2 text-white bg-main rounded-3xl font-jua text-xl transition ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-[#15ed79] hover:text-black duration-300"
              >
                인증 요청
              </button>
            </div>
            <p
              className={`text-red-500 text-sm pl-3 mt-1 ${
                emailError ? 'visible' : 'invisible'
              }`}
            >
              {emailError || 'empty'}
            </p>
          </div>

          {/* 인증번호 확인 */}
          <div className="mt-6">
            <label className="mb-4 text-lg font-bold font-undong text-center">
              인증번호
            </label>
            <div className="flex items-center justify-between">
              <inputs className="flex max-w-xs mt-2">
                {Array(4)
                  .fill('')
                  .map((_, index) => (
                    <input
                      key={index}
                      id={`input${index}`}
                      value={code[index]}
                      type="tel"
                      maxLength="1"
                      placeholder="?"
                      onChange={(e) => {
                        if (
                          e.target.value === '' ||
                          (e.target.value.length === 1 &&
                            !isNaN(e.target.value))
                        ) {
                          handleCodeChange(e, index);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' || e.key === 'Delete') {
                          setCode([
                            ...code.slice(0, index),
                            '',
                            ...code.slice(index + 1),
                          ]);
                        }
                      }}
                      className="w-10 h-12 mx-1 text-center border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ))}
              </inputs>
              <button
                onClick={isCodeExpired}
                className="inline-block whitespace-nowrap h-12 px-6 ml-5 mt-2 text-white bg-main rounded-3xl font-jua text-xl transition ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-[#15ed79] hover:text-black duration-300"
              >
                인증 확인
              </button>
            </div>
          </div>
        </main>

        {/* 비밀번호 재설정 */}
        <footer className="flex flex-col mt-10 w-full p-3">
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
                  className="w-full px-4 py-3 mt-2 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={toggleShowPassword}
                  className="inline-block whitespace-nowrap h-12 ml-5 mt-2 rounded-xl font-score text-md"
                >
                  {showPassword ? <GoEye /> : <GoEyeClosed />}
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-4 text-lg font-bold font-undong text-center">
              비밀번호 확인
            </label>
            <div className="flex">
              <input
                type="password"
                value={checkPassword}
                onChange={(e) => {
                  setCheckPassword(e.target.value);
                  isSamePassword();
                }}
                placeholder="한 번 더 입력하세요"
                className="w-full px-4 py-3 mt-2 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                {verified ? (
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
                최소 8자 이상의 비밀번호를 입력해주세요
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
          <button
            type="submit"
            disabled={
              verified === false &&
              password.length < 8 &&
              isPasswordValid(password) === false &&
              !passwordMessage
            }
            className={`p-3 mx-20 mt-3 rounded-3xl font-jua text-xl transition ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:scale-110  duration-300
              ${
                passwordMessage
                  ? 'text-white bg-main hover:bg-[#15ed79] hover:text-black'
                  : 'bg-gray-500 text-black'
              }
              `}
          >
            재설정하기
          </button>
        </footer>
      </form>
    </section>
  );
}
