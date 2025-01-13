import { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils/common';
import { toast } from 'react-toastify';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [emailExists, setEmailExists] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [nicknameAvailable, setNicknameAvailable] = useState(false);

  const navigate = useNavigate();

  /** 이메일 유효성 검사 */
  const emailPattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  /** 비밀번호 유효성 검사
    @param 비밀번호
   */
  const isPasswordValid = (password) => {
    return (
      password.length >= 10 &&
      password.length <= 15 &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password) &&
      /[a-zA-Z]/.test(password)
    );
  };

  /** 회원가입용 이메일 인증 요청
    @param 이메일, 이메일 타입, 소셜 타입
   */
  const requestEmailForSignUp = async (email, emailType, socialType) => {
    try {
      const response = await axios.post(`/auth/email`, {
        email,
        emailType,
        socialType,
      });

      if (response.status === 204) {
        setEmailExists(false);
        toast.success('인증번호가 발송되었습니다');
      } else {
        return;
      }
    } catch (error) {
      setEmailExists(true);
      handleError(error);
    }
  };

  /** 비밀번호 재설정용 이메일 인증 요청
    @param 이메일, 이메일 타입, 소셜 타입
  */
  const requestEmailForResetPassword = async (email, emailType, socialType) => {
    try {
      const response = await axios.post(`/auth/email`, {
        email,
        emailType,
        socialType,
      });

      if (response.status === 204) {
        toast.success('인증번호가 발송되었습니다');
      } else {
        return;
      }
    } catch (error) {
      handleError(error);
    }
  };

  /** 이메일 인증 확인
    @params 이메일, 이메일 타입, 인증번호, 소셜 타입
  */
  const checkCodeVerification = async (
    email,
    emailType,
    inputNum,
    socialType
  ) => {
    const NO_CODE_ERROR = '인증번호를 입력해주세요';
    if (!inputNum) {
      toast.error(NO_CODE_ERROR);
      return;
    }
    try {
      const response = await axios.post(
        `/auth/register/authentication/number`,
        {
          email,
          emailType,
          inputNum,
          socialType,
        }
      );
      if (response.status === 204) {
        setEmailVerified(true);
        toast.success('인증 완료되었습니다');
      } else {
        return;
      }
    } catch (error) {
      setEmailVerified(false);
      handleError(error);
    }
  };

  /** 닉네임 중복 확인
    @params 닉네임
  */
  const checkNicknameDuplication = async (nickName) => {
    try {
      const response = await axios.post(
        `/auth/register/authentication/nickname`,
        {
          nickName,
        }
      );
      if (response.status === 204) {
        setNicknameAvailable(true);
        toast.success('사용 가능한 닉네임입니다');
      } else {
        return;
      }
    } catch (error) {
      setNicknameAvailable(false);
      handleError(error);
    }
  };

  /** 회원가입 요청
    @params 이메일, 닉네임, 비밀번호, 소셜 타입
  */
  const signup = async (email, password, nickName, socialType) => {
    const URL = `/auth/register`;
    try {
      const response = await axios.post(
        URL,
        {
          email: email,
          password: password,
          nickName: nickName,
          socialType: socialType,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
          },
        }
      );
      if (response.status === 204) {
        toast.success('회원가입이 완료되었습니다');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        return;
      }
    } catch (error) {
      handleError(error);
    }
  };

  /** 회원탈퇴 */
  const deleteAccount = async () => {
    const URL = `/auth/delete`;
    try {
      await axios.delete(URL, {
        data: localStorage.getItem('socialId'),
      });
      logout();
      toast.success('회원탈퇴가 완료되었습니다');
    } catch (error) {
      handleError(error);
    }
  };

  /** 로그인
   @params 이메일, 비밀번호, 서비스 타입
  */
  const signin = async (email, password, socialType) => {
    const URL = `/token/login`;
    try {
      const response = await axios.post(
        URL,
        {
          email: email,
          password: password,
          socialType: socialType,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      if (response.headers) {
        localStorage.setItem(
          'accessToken',
          response.headers['authorization-access']
        );
        localStorage.setItem(
          'refreshToken',
          response.headers['authorization-refresh']
        );
        localStorage.setItem(
          'nickName',
          decodeURIComponent(response.headers.get('nickName'))
        );
        localStorage.setItem('email', email);
        localStorage.setItem('socialId', response.headers.get('socialId'));
        localStorage.setItem('socialType', socialType);
        toast.success('로그인 되었습니다');
        navigate('/main');
      }
    } catch (error) {
      handleError(error);
    }
  };

  /** 로그아웃
   @header 액세스 토큰
   */
  const signout = async () => {
    const URL = `/token/logout`;
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.post(
        URL,
        {},
        {
          headers: {
            'Authorization-Access': accessToken,
          },
        }
      );

      if (response.status === 204) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('socialId');
        localStorage.removeItem('nickName');
        localStorage.removeItem('email');
        localStorage.removeItem('socialType');
        localStorage.removeItem('imageUrl');

        toast.success('로그아웃 되었습니다');
        navigate('/main');
      }
    } catch (error) {
      handleError(error);
    }
  };

  /** 비밀번호 재설정
   @params 이메일, 비밀번호, 새로운 비밀번호, 소셜 타입
   */
  const resetPassword = async (email, password, newPassword, socialType) => {
    try {
      const response = await axios.post(`/auth/reset/password`, {
        email,
        password,
        rePassword: newPassword,
        socialType,
      });

      if (response.status === 204) {
        toast.success('비밀번호가 재설정되었습니다');
        navigate('/login');
      }
    } catch (error) {
      handleError(error);
    }
  };

  const value = {
    handleError,
    signin,
    signout,
    signup,
    deleteAccount,
    resetPassword,
    requestEmailForSignUp,
    requestEmailForResetPassword,
    emailPattern,
    emailExists,
    setEmailExists,
    checkCodeVerification,
    emailVerified,
    setEmailVerified,
    checkNicknameDuplication,
    nicknameAvailable,
    setNicknameAvailable,
    isPasswordValid,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
