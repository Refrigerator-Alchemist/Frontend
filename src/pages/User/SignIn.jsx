import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserApi, IP_ADDRESS } from '../../context/UserContext';
import { handleError } from '../../utils/customedError';
import { emailPattern } from '../../utils/common';
import { toast } from 'react-toastify';
import Logo from '../../components/common/Logo';
import BackButton from '../../components/common/BackButton';
import SocialLogin from '../../components/User/Signin/SocialLogin';
import InputField from '../../components/User/Signin/InputField';
import ErrorMessage from '../../components/User/Signin/ErrorMessage';
import LinkText from '../../components/User/Signin/LinkText';
import LOGO_GOOGLE from '/assets/img/logo_google.webp';
import LOGO_KAKAO from '/assets/img/logo_kakao.webp';
import LOGO_NAVER from '/assets/img/logo_naver.webp';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const { login } = useUserApi();

  const navigate = useNavigate();
  const location = useLocation();
  const headerStyle = 'flex flex-col items-center justify-center';

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

    if (!emailPattern.test(e.target.value)) {
      setEmailError('이메일 형식이 올바르지 않습니다');
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
    <section className={`relative min-h-screen ${headerStyle}`}>
      <BackButton destination={'/main'} />
      <header className={headerStyle}>
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
