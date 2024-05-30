import React, { useState, createContext, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ERRORS from '../utils/customedError';

export const IP_ADDRESS = 'http://localhost:8080';

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
  const URI = `${IP_ADDRESS}/token/reissue`;
  const socialType = localStorage.getItem('socialType');
  const socialId = localStorage.getItem('socialId');
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  let newAccessToken;

  try {
    const response = await axios.post(
      URI,
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

const UserDispatchContext = createContext();

export const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (!context) {
    throw new Error('UserProvider를 찾을 수 없음');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [emailExists, setEmailExists] = useState(true);
  const [verified, setVerified] = useState(false);
  const [nameDuplicated, setNameDuplicated] = useState(true);
  const navigate = useNavigate();

  const googleURL = `${IP_ADDRESS}/oauth2/authorization/google`;
  const kakaoURL = `${IP_ADDRESS}/oauth2/authorization/kakao`;
  const naverURL = `${IP_ADDRESS}/oauth2/authorization/naver`;

  // 👩🏻‍🔧 커스텀 에러 처리
  const handleError = async (error) => {
    if (error.response && error.response.data && error.response.data.code) {
      // 백엔드 콘솔 확인용
      const errorName = Object.values(ERRORS).find(
        (obj) => obj.code === error.response.data.code
      );
      const userNotice = errorName.notice; // 유저 토스트 확인용
      console.log(`에러 내용: ${JSON.stringify(errorName)}`);
      toast.error(`${userNotice}`);
      return error.response.data.code;
      // 서버 미연결(에러 응답 존재 X)
    } else if (!error.response) {
      console.log('서버와 연결되어있지 않습니다');
      toast.error(`서버와 연결되어있지 않습니다`);
    } else {
      // 예외
      console.log(`확인되지 않은 에러, ${error}`);
      toast.error(`알 수 없는 에러가 발생했습니다`);
    }
  };

  // 📧 이메일 인증 요청 (회원가입용) -------------------------------------------------
  const requestEmailForSignUp = async (email, emailType, socialType) => {
    const URI = `${IP_ADDRESS}/auth/email`;

    try {
      const response = await axios.post(URI, {
        email,
        emailType,
        socialType,
      });

      console.log(`이메일: ${email} 회원가입 유형: ${socialType}`);

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

  // 📧 이메일 인증 요청 (비밀번호 재설정용) ---------------------------------------------
  const requestEmailForReset = async (email, emailType, socialType) => {
    const URI = `${IP_ADDRESS}/auth/email`;

    try {
      const response = await axios.post(URI, {
        email,
        emailType,
        socialType,
      });

      console.log(`이메일: ${email} 회원가입 유형: ${socialType}`);

      if (response.status === 204) {
        setEmailExists(true);
        toast.success('인증번호가 발송되었습니다');
      } else {
        return;
      }
    } catch (error) {
      setEmailExists(false);
      handleError(error);
    }
  };

  // ✅ 이메일 인증 확인 ---------------------------------------------------------------
  const checkCodeVerification = async (
    email,
    emailType,
    inputNum,
    socialType
  ) => {
    const NO_CODE_ERROR = '인증번호를 입력해주세요';

    // 인증번호 입력 여부 확인
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

  // ✅ 닉네임 중복 확인 ------------------------------------------------------------
  const checkNameDuplication = async (nickName) => {
    try {
      const response = await axios.post(
        `${IP_ADDRESS}/auth/register/authentication/nickname`,
        {
          nickName,
        }
      );

      if (response.status === 204) {
        setNameDuplicated(false);
        toast.success('사용 가능한 닉네임입니다');
      } else {
        return;
      }
    } catch (error) {
      setNameDuplicated(true);
      handleError(error);
    }
  };

  // 📝 회원가입 -----------------------------------------------------------------
  const signup = async (email, password, nickName, socialType) => {
    const URI = `${IP_ADDRESS}/auth/register`;
    try {
      const response = await axios.post(
        URI,
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

  // 👋🏻 회원탈퇴 -----------------------------------------------------------------
  const deleteUser = async () => {
    const URI = `${IP_ADDRESS}/auth/delete`;

    // 다시 합의 후 수정 필요
    try {
      await axios.delete(URI, {
        data: localStorage.getItem('socialId'),
      });
      logout();
      toast.success('회원탈퇴가 완료되었습니다');
    } catch (error) {
      handleError(error);
    }
  };

  // 🔐 로그인 -------------------------------------------------------------------
  const login = async (email, password, socialType) => {
    const URI = `${IP_ADDRESS}/token/login`;

    try {
      const response = await axios.post(
        URI,
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
        const accessToken = response.headers['authorization-access'];
        localStorage.setItem('accessToken', accessToken);
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

  // 🔓 로그아웃 --------------------------------------------------------------------
  const logout = async () => {
    const URI = `${IP_ADDRESS}/token/logout`;
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await axios.post(
        URI,
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

        toast.success('로그아웃 되었습니다!');
        navigate('/main');
      }
    } catch (error) {
      handleError(error);
    }
  };

  // 🔄 비밀번호 재설정 ---------------------------------------------------------------
  const resetPassword = async (email, password, rePassword, socialType) => {
    try {
      const response = await axios.post(`${IP_ADDRESS}/auth/reset/password`, {
        email,
        password,
        rePassword,
        socialType,
      });

      if (response.status === 204) {
        toast.success('비밀번호가 성공적으로 재설정되었습니다');
        navigate('/login');
      }
    } catch (error) {
      handleError(error);
    }
  };

  // 🟡 카카오 --------------------------------------------------
  const kakaoLogin = () => {
    try {
      window.location.href = kakaoURL;
      console.log('카카오 로그인');
    } catch (error) {
      handleError(error);
    }
  };

  // 🔴 구글 ----------------------------------------------------
  const googleLogin = () => {
    try {
      window.location.href = googleURL;
      console.log('구글 로그인');
    } catch (error) {
      handleError(error);
    }
  };

  // 🟢 네이버 --------------------------------------------------
  const naverLogin = () => {
    try {
      window.location.href = naverURL;
      console.log('네이버 로그인');
    } catch (error) {
      handleError(error);
    }
  };

  const value = {
    handleError,
    login,
    logout,
    signup,
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
    nameDuplicated,
    setNameDuplicated,
    kakaoLogin,
    googleLogin,
    naverLogin,
  };

  return (
    <UserDispatchContext.Provider value={value}>
      {children}
    </UserDispatchContext.Provider>
  );
};
