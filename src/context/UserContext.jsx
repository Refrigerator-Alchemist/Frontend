import React, {
  useState,
  useReducer,
  createContext,
  useContext,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import errorCode from '../utils/ErrorCode';
import { toast } from 'react-toastify';

// 🌱 IP : 현재 사용 환경의 IP
export const IP_ADDRESS = 'http://localhost:8080';

// 🌱 axios 인스턴스 : URL 관리 및 인터셉터 설정
export const instance = axios.create({
  baseURL: `${IP_ADDRESS}`,
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken) {
      config.headers['Authorization-Access'] = accessToken;
    }
    if (refreshToken) {
      config.headers['Authorization-Refresh'] = refreshToken;
    }
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

// 🌱 state에 유저 상태 저장하는 리듀서
// 유저 상태 초기화
const initialState = {
  user: null,
};

// 액션 타입
const SET_USER = 'SET_USER';

// 리듀서
const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user, // 유저의 액션
      };
    default:
      throw new Error(`확인되지 않은 액션 타입: ${action.type}`);
  }
};

const UserStateContext = createContext();
const UserDispatchContext = createContext();
const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const { reIssue } = useUserDispatch();
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    if (!token) {
      reIssue();
    }
  }, [token, reIssue]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [emailExists, setEmailExists] = useState(true);
  const [verified, setVerified] = useState(false);
  const [nameDuplicated, setNameDuplicated] = useState(true);

  // 🙍‍♂️ SNS 로그인 엔드 포인트
  const googleURL = `${IP_ADDRESS}/oauth2/authorization/google`;
  const kakaoURL = `${IP_ADDRESS}/oauth2/authorization/kakao`;
  const naverURL = `${IP_ADDRESS}/oauth2/authorization/naver`;
  const navigate = useNavigate();

  // 👩🏻‍🔧 커스텀 에러 처리
  const handleError = async (error) => {
    if (
      error.response &&
      error.response.headers &&
      error.response.headers.code
    ) {
      // 백엔드 콘솔 확인용
      const errorName = Object.values(errorCode).find(
        (obj) => obj.code === error.response.headers.code
      );
      const userNotice = errorName.notice; // 유저 토스트 확인용
      console.log(`에러 내용: ${errorName}`);
      toast.error(`${userNotice}`);
      return error.response.headers.code;
      // 서버 미연결(에러 응답 존재 X)
    } else if (!error.response) {
      console.log('서버와 연결되어있지 않습니다');
      toast.error(`서버와 연결되어있지 않습니다`);
    } else {
      console.log(`확인되지 않은 에러, ${error}`);
      toast.error(`알 수 없는 에러가 발생했습니다`);
    }
  };

  // 📧 이메일 인증 요청 (회원가입용) -------------------------------------------------
  const requestEmailForSignUp = async (email, emailType, socialType) => {
    const URL = `${IP_ADDRESS}/auth/email`;

    try {
      const response = await instance.post(URL, {
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
    const URL = `${IP_ADDRESS}/auth/email`;

    try {
      const response = await instance.post(URL, {
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

  // ✅ 이메일 인증 확인 ------------------------------------------------------------
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
      const response = await instance.post(
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

  // ✅ 닉네임 중복 확인 ------------------------------------------------
  const checkNameDuplication = async (nickName) => {
    try {
      const response = await instance.post(
        `${IP_ADDRESS}/auth/register/authentication/nickname`,
        {
          nickName,
        }
      );

      if (response.status === 204) {
        setNameDuplicated(false);
        toast.success('사용 가능한 닉네임입니다:)');
      } else {
        return;
      }
    } catch (error) {
      setNameDuplicated(true);
      handleError(error);
    }
  };

  // 📝 회원가입 ---------------------------------------------------------------
  const signup = async (email, password, nickName, socialType) => {
    const URL = `${IP_ADDRESS}/auth/register`;
    try {
      const response = await instance.post(
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

  // 👋🏻 회원탈퇴 ---------------------------------------------------------------
  const deleteUser = async () => {
    const URL = `${IP_ADDRESS}/auth/delete-user`;

    try {
      await instance.delete(URL, {
        data: localStorage.getItem('socialId'),
      });
      logout();
      toast.success('회원탈퇴가 완료되었습니다');
    } catch (error) {
      handleError(error);
    }
  };

  // 🔐 로그인 ---------------------------------------------------------------
  const login = async (email, password, socialType) => {
    const URL = `${IP_ADDRESS}/token/login`;

    try {
      const response = await instance.post(
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
        console.log(`⭕ 로컬스토리지 저장 완료`);
        let user = {
          socialId: localStorage.getItem('socialId'),
          socialType: socialType,
        };
        console.log(`⭕ 유저 정보 저장 완료`);
        dispatch({ type: SET_USER, user });
        toast.success('로그인 되었습니다!');
        navigate('/main');
      }
    } catch (error) {
      handleError(error);
    }
  };

  // 🔓 로그아웃 ---------------------------------------------------------------
  const logout = async () => {
    const URL = `${IP_ADDRESS}/token/logout`;
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await instance.post(URL, {
        headers: {
          'Authorization-Access': accessToken,
        },
      });

      if (response.status === 204) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('socialid');
        localStorage.removeItem('nickName');
        localStorage.removeItem('email');
        localStorage.removeItem('socialType');

        dispatch({ type: SET_USER, user: null });
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
      const response = await instance.post(
        `${IP_ADDRESS}/auth/reset/password`,
        {
          email,
          password,
          rePassword,
          socialType,
        }
      );

      if (response.status === 204) {
        toast.success('비밀번호가 성공적으로 재설정되었습니다');
        navigate('/login');
      }
    } catch (error) {
      handleError(error);
    }
  };

  // 🪙 새로운 액세스 토큰 발급
  const reIssue = async () => {
    const URL = `${IP_ADDRESS}/token/reissue`;
    const socialType = localStorage.getItem('socialType');
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    try {
      const response = await instance.post(
        URL,
        {},
        {
          headers: {
            'Authorization-Access': accessToken,
            'Authorization-Refresh': refreshToken,
          },
        }
      );

      if (response.status === 204 && socialType === 'Refrigerator-Alchemist') {
        localStorage.setItem(
          'accessToken',
          response.headers['authorization-access']
        );
        console.log(`새로운 액세스 토큰을 발급받았습니다`);
      } else if (
        response.status === 204 &&
        socialType !== 'Refrigerator-Alchemist'
      ) {
        localStorage.setItem(
          'accessToken',
          'Bearer ' + response.headers['authorization-access']
        );
        console.log(`새로운 액세스 토큰을 발급받았습니다`);
      } else {
        return;
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

  // dispatch로 사용가능한 상태 및 함수
  const value = {
    state,
    dispatch,
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
    reIssue,
    kakaoLogin,
    googleLogin,
    naverLogin,
  };

  return (
    <UserDispatchContext.Provider value={value}>
      <UserStateContext.Provider value={state}>
        <TokenContext.Provider>{children}</TokenContext.Provider>
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

// user 객체를 이용하게 해준다
export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error('Cannot find UserProvider');
  }
  return context;
};

// value를 이용하게 해준다
export const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (!context) {
    throw new Error('Cannot find UserProvider');
  }
  return context;
};

// 토큰 재발급을 이용하게 해준다
export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('Cannot find TokenProvider');
  }
  return context;
};
