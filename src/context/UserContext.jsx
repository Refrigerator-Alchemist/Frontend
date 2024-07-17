import React, { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ERRORS from '../utils/customedError';

export const IP_ADDRESS = 'http://43.201.57.180:8080';

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

/** 유저 Context Provider
 - 인증번호 요청, 인증 확인, 회원 가입, 로그인, 로그아웃, 비밀번호 재설정, 회원탈퇴
 - API의 Body에는 순서대로 값을 넣어야 한다
 */
export const UserApiProvider = ({ children }) => {
  const [emailExists, setEmailExists] = useState(true);
  const [verified, setVerified] = useState(false);
  const [nameAvailable, setNameAvailable] = useState(false);

  const navigate = useNavigate();

  /** 커스텀 에러 처리 
   - errorName : 백엔드 확인용 에러명
   - errorName.notice : 유저 확인용 메세지
  */
  const handleError = async (error) => {
    const genericToastId = 'generic-error';

    if (error.response && error.response.data && error.response.data.code) {
      const errorName = Object.values(ERRORS).find(
        (obj) => obj.code === error.response.data.code
      );
      const userNotice = errorName ? errorName.notice : '확인되지 않은 에러';
      console.log(`에러 내용: ${JSON.stringify(errorName)}`);
      toast.error(userNotice, {
        toastId: error.response.data.code,
      });
      return error.response.data.code;
    } else if (!error.response) {
      console.log('서버로부터 응답이 없습니다');
      toast.error('서버로부터 응답이 없습니다', {
        toastId: 'no-server-connection',
      });
    } else {
      console.log(`확인되지 않은 에러, ${error}`);
      toast.error('알 수 없는 에러가 발생했습니다', {
        toastId: genericToastId,
      });
    }
  };

  /** 이메일 인증 요청 : 회원가입용
   - 요청 Body 
        - email 이메일
        - emailType 회원가입 | 비밀번호 변경
        - socialType 서비스 타입
   */
  const requestEmailForSignUp = async (email, emailType, socialType) => {
    try {
      const response = await axios.post(`${IP_ADDRESS}/auth/email`, {
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

  /** 이메일 인증 요청 : 비밀번호 재설정용
   - 요청 Body
        - email 이메일
        - emailType 회원가입 | 비밀번호 변경
        - socialType 서비스 타입
  */
  const requestEmailForReset = async (email, emailType, socialType) => {
    try {
      const response = await axios.post(`${IP_ADDRESS}/auth/email`, {
        email,
        emailType,
        socialType,
      });
      console.log(`이메일: ${email} 회원가입 유형: ${socialType}`);
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
   - 요청 Body
        - email 이메일
        - emailType 회원가입 | 비밀번호 변경
        - inputNum 인증번호
        - socialType 서비스 타입
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

  /** 닉네임 중복 확인
   - 요청 Body
        - nickName 닉네임 
  */
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
   - 요청 Body
        - email 이메일
        - nickName 닉네임 
        - password 비밀번호
        - socialType 서비스 타입
  
  - 요청 Header
        - 'Content-Type': 'application/json;charset=UTF-8'
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

  /** 회원 탈퇴
   - 백엔드 구현 X, 수정 필요
  */
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
   - 요청 Body
        - email 이메일
        - password 비밀번호
        - socialType 서비스 타입
  
  - 요청 Header
        - 'Content-Type': 'application/json;charset=UTF-8'
        - Accept: 'application/json'
        - 'Access-Control-Allow-Origin': '*'
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
   - 요청 Header
        - accessToken 액세스 토큰
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
   - 요청 Body :
        - email 이메일
        - password 비밀번호
        - newPassword 새로운 비밀번호
        - socialType 서비스 타입
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
        toast.success('비밀번호가 성공적으로 재설정되었습니다');
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
