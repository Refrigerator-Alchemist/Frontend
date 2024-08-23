import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import { useUserApi, IP_ADDRESS } from '../../context/UserContext';
import Logo from '../../components/Global/Logo';
import BackButton from '../../components/Global/BackButton';
import LOGO_GOOGLE from '/assets/img/logo_google.png';
import LOGO_KAKAO from '/assets/img/logo_kakao.png';
import LOGO_NAVER from '/assets/img/logo_naver.png';

/** 
 @description 소셜 로그인 버튼 
 */
function SocialLogin({ callback, img, socialType }) {
  return (
    <button onClick={callback}>
      <img
        className="mx-3 hover:scale-110"
        style={{ width: '45px', height: '45px' }}
        src={img}
        alt={socialType}
      ></img>
    </button>
  );
}

/** 
 @description 인풋 박스 - 이메일, 비밀번호 
 */
function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  showPassword,
  toggleShowPassword,
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 ml-3 font-score">{label}</label>
      <div className="flex">
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 mt-1 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo font-score"
          placeholder={placeholder}
          required
        />
        {toggleShowPassword && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="inline-block whitespace-nowrap h-12 ml-5 mt-2 rounded-xl font-score text-md hover:text-red-500"
          >
            {showPassword ? <GoEye /> : <GoEyeClosed />}
          </button>
        )}
      </div>
    </div>
  );
}

/** 
 @description 이메일 유효성 검사 에러 메세지
 */
function ErrorMessage({ message, isVisible }) {
  return (
    <p
      className={`text-red-500 text-sm pl-3 mt-1 ${isVisible ? 'visible' : 'invisible'}`}
    >
      {message || 'empty'}
    </p>
  );
}

/** 
 @description 비밀번호 재설정 페이지 이동 링크
 */
function LinkText({ onClick, children }) {
  return (
    <p
      onClick={onClick}
      className="flex justify-start ml-2 underline font-bold hover:cursor-pointer hover:text-red-500 mb-4 font-score"
    >
      {children}
    </p>
  );
}

/**
 * @description 로그인 페이지
 * @returns {JSX.Element} 로그인 페이지 UI
 */
export default function SignIn() {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const { login, handleError } = useUserApi();
  const navigate = useNavigate();
  const location = useLocation();
  const LAYOUT = 'flex flex-col items-center justify-center';

  useEffect(() => {
    const socialId = localStorage.getItem('socialId');
    if (socialId) {
      toast.error('이미 로그인 상태입니다');
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    }
  }, [navigate, location]);

  useEffect(() => {
    if (emailValid && password.length > 10 && password.length <= 15) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, password]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    const pattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!pattern.test(e.target.value)) {
      setEmailError('이메일 형식이 올바르지 않습니다 : .com .net .org');
      setEmailValid(false);
    } else {
      setEmailError('');
      setEmailValid(true);
    }
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const onLogin = (e) => {
    e.preventDefault();
    login(email, password, 'Refrigerator-Alchemist');
  };

  const goolgleLogin = () => {
    try {
      window.location.href = `${IP_ADDRESS}/oauth2/authorization/google`;
    } catch (error) {
      handleError(error);
    }
  };

  const kakaoLogin = () => {
    try {
      window.location.href = `${IP_ADDRESS}/oauth2/authorization/kakao`;
    } catch (error) {
      handleError(error);
    }
  };

  const naverLogin = () => {
    try {
      window.location.href = `${IP_ADDRESS}/oauth2/authorization/naver`;
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <section className={`relative min-h-screen ${LAYOUT}`}>
      <BackButton destination={'/main'} />
      <header className={LAYOUT}>
        <Logo page="login" width="250px" height="250px" />
        <h1 className="text-3xl font-jua">로그인</h1>
      </header>
      <main>
        <form className="p-4 rounded-xl w-96" onSubmit={onLogin}>
          <InputField
            label="이메일"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일"
          />
          <ErrorMessage message={emailError} isVisible={emailError} />
          <InputField
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
          <LinkText onClick={() => navigate('/reset-password')}>
            비밀번호 재설정
          </LinkText>
          <button
            type="submit"
            disabled={notAllow}
            className={`w-full py-2 text-2xl font-scoreExtraBold font-extrabold transition ease-in-out duration-300 rounded-3xl ${
              notAllow
                ? 'bg-gray-500 text-black'
                : 'bg-main text-white hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-emerald hover:text-black'
            }`}
          >
            로그인
          </button>
        </form>
      </main>
      <footer className="flex flex-col items-center mb-4">
        <p className="my-4 text-gray-400 font-score">SNS 간편 로그인</p>
        <figure className="flex mb-4">
          <SocialLogin
            callback={goolgleLogin}
            img={LOGO_GOOGLE}
            socialType={'Google'}
          />
          <SocialLogin
            callback={kakaoLogin}
            img={LOGO_KAKAO}
            socialType={'Kakao'}
          />
          <SocialLogin
            callback={naverLogin}
            img={LOGO_NAVER}
            socialType={'Naver'}
          />
        </figure>
        <div className="flex">
          <span className="font-score">계정이 없으신가요?</span>
          <span
            onClick={() => navigate('/signup')}
            className="underline font-bold hover:cursor-pointer hover:text-red-500 ml-5 font-score"
          >
            이메일로 회원가입
          </span>
        </div>
      </footer>
    </section>
  );
}
