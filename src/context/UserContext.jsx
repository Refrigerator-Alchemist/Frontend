import { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils/common';
import { toast } from 'react-toastify';
import axios from 'axios';

export const IP_ADDRESS = 'http://localhost:8080'; // 환경변수로 빼기

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const isLoginRequest = originalRequest.url.includes('/token/login');
    if (!isLoginRequest && error.response.data.code === 'RAT8') {
      const newAccessToken = await reIssue();
      originalRequest.headers['Authorization-Access'] = newAccessToken;
      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

let isRefreshing = false;

const reIssue = async () => {
  if (isRefreshing) return;
  isRefreshing = true;
  const URL = `${IP_ADDRESS}/token/reissue`;
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const socialType = localStorage.getItem('socialType');
  const socialId = localStorage.getItem('socialId');

  let newAccessToken;
  try {
    const response = await axios.post(
      URL,
      {},
      {
        headers: {
          'Authorization-Access': accessToken,
          'Authorization-Refresh': refreshToken,
          socialId,
        },
      }
    );
    if (response.status === 200 && socialType === 'Refrigerator-Alchemist') {
      newAccessToken = response.headers.get('authorization-access');
      localStorage.setItem('accessToken', newAccessToken);
      console.log(`새로운 액세스 토큰을 발급받았습니다`);
    } else if (
      response.status === 200 &&
      socialType !== 'Refrigerator-Alchemist'
    ) {
      newAccessToken = 'Bearer ' + response.headers.get('authorization-access');
      localStorage.setItem('accessToken', newAccessToken);
      console.log(`새로운 액세스 토큰을 발급받았습니다`);
    } else {
      return;
    }
  } catch (error) {
    console.error(error.response.data.code);
  } finally {
    isRefreshing = false;
  }
  return newAccessToken;
};

const UserContext = createContext();
export const useUserApi = () => {
  return useContext(UserContext);
};

export const UserApiProvider = ({ children }) => {
  const [emailExists, setEmailExists] = useState(true);
  const [verified, setVerified] = useState(false);
  const [nameAvailable, setNameAvailable] = useState(false);

  const navigate = useNavigate();

  /** 회원가입용 이메일 인증 요청
    @param 이메일, 이메일 타입, 소셜 타입
   */
  const requestEmailForSignUp = async (email, emailType, socialType) => {
    try {
      const response = await axios.post(`${IP_ADDRESS}/auth/email`, {
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
  const requestEmailForReset = async (email, emailType, socialType) => {
    try {
      const response = await axios.post(`${IP_ADDRESS}/auth/email`, {
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
        `${IP_ADDRESS}/auth/register/authentication/number`,
        {
          email,
          emailType,
          inputNum,
          socialType,
        }
      );
      if (response.status === 204) {
        setVerified(true);
        toast.success('인증 완료!');
      } else {
        return;
      }
    } catch (error) {
      setVerified(false);
      handleError(error);
    }
  };

  const checkNameDuplication = async (nickName) => {
    try {
      const response = await axios.post(
        `${IP_ADDRESS}/auth/register/authentication/nickname`,
        {
          nickName,
        }
      );
      if (response.status === 204) {
        setNameAvailable(true);
        toast.success('사용 가능한 닉네임입니다');
      } else {
        return;
      }
    } catch (error) {
      setNameAvailable(false);
      handleError(error);
    }
  };

  /** 회원가입 요청
    @params 이메일, 닉네임, 비밀번호, 소셜 타입
  
    @header 
    -'Content-Type': 'application/json;charset=UTF-8'
    - Accept: 'application/json'
  */
  const signUp = async (email, password, nickName, socialType) => {
    const URL = `${IP_ADDRESS}/auth/register`;
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

  const deleteUser = async () => {
    const URL = `${IP_ADDRESS}/auth/delete`;
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
  const login = async (email, password, socialType) => {
    const URL = `${IP_ADDRESS}/token/login`;
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
        toast.success('로그인 되었습니다!');
        navigate('/main');
      }
    } catch (error) {
      handleError(error);
    }
  };

  /** 로그아웃
   @header 액세스 토큰
   */
  const logout = async () => {
    const URL = `${IP_ADDRESS}/token/logout`;
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

        toast.success('로그아웃 되었습니다!');
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
      const response = await axios.post(`${IP_ADDRESS}/auth/reset/password`, {
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
    login,
    logout,
    signUp,
    deleteUser,
    resetPassword,
    requestEmailForSignUp,
    requestEmailForReset,
    setEmailExists,
    emailExists,
    checkCodeVerification,
    verified,
    setVerified,
    checkNameDuplication,
    nameAvailable,
    setNameAvailable,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
