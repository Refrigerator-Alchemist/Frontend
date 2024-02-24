import React, { useState, useEffect } from 'react';
import {
  GoCheckCircle,
  GoCheckCircleFill,
  GoEye,
  GoEyeClosed,
} from 'react-icons/go';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as auth from '../apis/auth';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [serverCode, setServerCode] = useState(null);
  const [code, setCode] = useState(Array(4).fill(''));
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // 이메일 상태 저장
  const handleEmailChange = (e) => setEmail(e.target.value);

  // 이메일 유효성 검사
  const isEmailVaild = (e) => {
    e.preventDefault();
    const pattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    if (!pattern.test(email)) {
      setEmailError('이메일 형식이 올바르지 않습니다');
      setEmail('');
    } else {
      setEmailError('');
      requestServerCode();
    }
  };

  // 이메일 인증번호 요청
  const requestServerCode = async () => {
    isEmailVaild();

    try {
      const response = await fetch('서버 엔드포인트로 바꾸기', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('서버에서 에러가 발생했습니다');
      }

      const data = await response.json();

      // 서버에서 받은 인증번호를 상태에 저장
      setServerCode(data.code); // code가 'authCode'라면 수정
    } catch (error) {
      console.error('인증번호 요청 중 에러 발생:', error);
    }
  };

  // 인증번호 입력
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

  // 인증번호 일치 확인
  const isCodeVaild = () => {
    const userCode = code.join('');

    if (userCode !== serverCode) {
      setCode('');
      console.log('코드가 일치하지 않습니다');
    } else {
      console.log('코드가 일치합니다');
    }
  };

  // 인증번호 만료 : 시간 제한
  // 인증번호 재요청 : 실패나 만료시 버튼이 재요청으로 바뀌도록

  // 닉네임 중복 확인 함수 만들기 : 서버에서 사용되고 있는 닉네임이 있는지 조회

  // 비밀번호 유효성 검사
  const isPasswordValid = (password) => {
    return (
      /\d/.test(password) &&
      /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password) &&
      /[a-zA-Z]/.test(password)
    );
  };

  // 비밀번호 확인 함수 만들기 : 완료 버튼 위 인풋
  const isSamePassword = () => {
    if (password && checkPassword) {
      password !== checkPassword
        ? setPasswordMessage(false)
        : setPasswordMessage(true);
    } else {
      setPasswordMessage(null);
    }
  };

  useEffect(() => {
    isSamePassword();
  }, [checkPassword]);

  // 비밀번호 보기
  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // 회원가입 요청
  const signup = async (form) => {
    console.log(form);

    let response;
    let data;
    try {
      response = await auth.signup(form);
    } catch (error) {
      console.error(`${error}`);
      console.error('회원가입 요청 중 에러가 발생하였습니다.');
      return;
    }

    data = response.data;
    const status = response.status;
    console.log(`data : ${data}`);
    console.log(`status : ${status}`);

    if (status === 200) {
      console.log('회원가입에 성공했습니다');
      alert('회원가입에 성공했습니다');
      navigate('/login');
    } else {
      console.log('회원가입에 실패했습니다');
      alert('회원가입에 실패했습니다');
    }
  };

  // 서버에 회원가입 정보 전송 : 이메일, 이름, 패스워드
  const onSignUp = (e) => {
    e.preventDefault();

    const userEmail = email;
    const userName = name;
    const userPassword = password;
    const socialType = 'Refrigerator-Cleaner';

    console.log(userEmail, userName, userPassword, socialType);

    signup({ userEmail, userName, userPassword, socialType });
  };

  const navigate = useNavigate();

  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-10 relative">
      {/* 뒤로가기 버튼 */}
      <div
        className="absolute top-5 left-5 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/login')}
      >
        <FaArrowLeft />
      </div>

      {/* 타이틀 */}
      <header className="flex flex-col items-center mt-10">
        <h1 className="font-score font-extrabold text-3xl">신규 회원가입</h1>
        <p className="font-score text-md text-gray-400 mt-2">
          회원가입에 사용할 이메일과 필수 정보를 입력하세요
        </p>
      </header>

      {/* 회원가입 정보 입력 */}
      <form>
        <main className="mt-10 w-full px-2">
          {/* 이메일 인증 */}
          <div>
            <label className="mb-4 text-md font-bold font-undong text-center ">
              이메일 입력
            </label>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-3 mt-2 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="E-mail"
              />
              <button
                onClick={requestServerCode}
                className="inline-block whitespace-nowrap h-12 px-6 ml-5 mt-2 text-white bg-main rounded-3xl font-jua text-xl transition ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-[#15ed79] hover:text-black duration-300"
              >
                인증번호 발송
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

          {/* 인증하기 */}
          <div className="mt-6">
            <label className="mb-4 font-bold font-undong text-center text-md">
              인증번호 입력
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
                onClick={isCodeVaild}
                className="inline-block whitespace-nowrap h-12 px-6 ml-5 mt-2 text-white bg-main rounded-3xl font-jua text-xl transition ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-[#15ed79] hover:text-black duration-300"
              >
                인증하기
              </button>
            </div>
          </div>
        </main>

        <footer className="flex flex-col mt-6 w-full p-3">
          <div>
            {/* 닉네임 입력 */}
            <label className="mb-4 text-md font-bold font-undong text-center">
              이름
            </label>
            <div className="flex mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="닉네임 입력(최소 3자 이상)"
                className="w-full px-4 py-3 mt-2 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="inline-block whitespace-nowrap h-12 px-6 ml-5 mt-2 text-white bg-main rounded-3xl font-jua text-xl transition ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-[#15ed79] hover:text-black duration-300">
                중복 확인
              </button>
            </div>

            {/* 비밀번호 입력 */}
            <label className="mb-4 text-md font-bold font-undong text-center">
              비밀번호 입력
            </label>
            <div className="flex flex-col">
              <div className="flex">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New PW"
                  className="w-full px-4 py-3 mt-2 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={toggleShowPassword}
                  className="inline-block whitespace-nowrap h-12 ml-5 mt-2 rounded-xl font-score text-md"
                >
                  {showPassword ? <GoEye /> : <GoEyeClosed />}
                </button>
              </div>
              <ul className="mt-4 mb-4 font-score">
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

              {/* 비밀번호 확인 */}
              <label className="flex mb-4 text-md font-bold font-undong text-center">
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
              {passwordMessage !== null && (
                <p
                  className={`text-sm pl-3 mt-1 ${
                    passwordMessage ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {passwordMessage
                    ? '비밀번호가 일치합니다'
                    : '비밀번호가 일치하지 않습니다'}
                </p>
              )}
              <button
                type="submit"
                onSubmit={onSignUp}
                disabled={!passwordMessage}
                className={`p-3 mx-20 mt-3 rounded-3xl font-jua text-xl transition ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:scale-110  duration-300
              ${
                passwordMessage
                  ? 'text-white bg-main hover:bg-[#15ed79] hover:text-black'
                  : 'bg-gray-500 text-black'
              }
              `}
              >
                가입하기
              </button>
            </div>
          </div>
        </footer>
      </form>
    </section>
  );
}
