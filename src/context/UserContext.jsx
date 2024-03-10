import React, { useState, useReducer, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/*
🚚
서버 로컬 : http://localhost:8080
PATH(엔드포인트)
로그인 : /login
회원가입 : /signup
비밀번호 재설정 : /reset-password
*/

// 📀 토큰 처리
const instance = axios.create({
  baseURL: 'http://localhost:8080/auth',
});

// ❕ 요청 인터셉터 : 토큰 업데이트
instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken) {
      config.headers['Authorization-Access'] = 'Bearer ' + accessToken;
    }
    if (refreshToken) {
      config.headers['Authorization-Refresh'] = 'Bearer ' + refreshToken;
    }
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

// ❕ 유저 상태 초기화
const initialState = {
  user: null,
};

// ❕ 액션 타입
const SET_USER = 'SET_USER';

// ❕ Reducer : state에 유저 상태 저장
const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user, // 유저의 액션
      };
    default:
      throw new Error(`통제되지 않는 타입: ${action.type}`);
  }
};

// ❕ Context 정의
const UserStateContext = createContext();
const UserDispatchContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); // 유저 상태 공유

  const [emailExists, setEmailExists] = useState(true); // 회원가입 시 이메일 중복 여부

  const [randomNum, setRandomNum] = useState(null); // 발급된 인증번호
  const [sendTime, setSendTime] = useState(null); // 인증번호 발급시간
  const [expireTime, setExpireTime] = useState(null); // 인증번호 만료시간
  const [verified, setVerified] = useState(false); // 이메일 인증 여부

  const [nameDuplicated, setNameDuplicated] = useState(true); // 닉네임 중복 여부

  // 🙍‍♂️🙍‍♀️ SNS 로그인 엔드 포인트
  const googleURL = `http://localhost:8080/oauth2/authorization/google`;
  const kakaoURL = `http://localhost:8080/oauth2/authorization/kakao`;
  const naverURL = `http://localhost:8080/oauth2/authorization/naver`;

  const navigate = useNavigate();

  // 📧 이메일 인증 요청 (회원가입용)
  const requestEmailForSignUp = async (email, emailType, socialType) => {
    const URL = 'http://localhost:8080/auth/send-email';

    try {
      const response = await instance.post(URL, {
        email,
        emailType,
        socialType,
      });

      // ▶ 이메일 중복 아니어야 발급 : false
      // response.data X -> .data.exists
      // status === 409 로 판단하기
      if (response.data.exists) {
        setEmailExists(true);
        window.alert('이미 서버에 존재하는 이메일입니다');
      } else {
        setEmailExists(false);
        setRandomNum(response.data.randomNum);
        setSendTime(new Date());
        setExpireTime(response.data.expireTime);
        window.alert('인증번호가 발송되었습니다');
      }
    } catch (error) {
      console.error('이메일 인증번호 요청 중 에러 발생: ', error);
    }
  };

  // 📧 이메일 인증 요청 (비밀번호 재설정용)
  const requestEmailForReset = async (email, emailType, socialType) => {
    const URL = 'http://localhost:8080/auth/send-email';

    try {
      const response = await instance.post(URL, {
        email,
        emailType,
        socialType,
      });

      // ▶ 이메일 존재해야 발급 : true
      if (response.data) {
        setEmailExists(true);
        setRandomNum(response.data.randomNum);
        setSendTime(new Date()); //
        setExpireTime(response.data.expireTime);
        window.alert('인증번호가 발송되었습니다');
      } else {
        setEmailExists(false);
        window.alert('존재하지 않는 이메일입니다');
      }
    } catch (error) {
      console.error('이메일 인증번호 요청 중 에러 발생: ', error);
    }
  };

  // ✅ 이메일 인증 확인
  const checkCodeVerification = async (
    email,
    inputNum,
    emailType,
    socialType
  ) => {
    const NO_SERVER_CODE_ERROR = '발급된 인증번호가 없습니다';
    const NO_CODE_ERROR = '인증번호를 입력해주세요';
    const EXPIRED_CODE_ERROR = '인증번호가 만료되었습니다';
    const INVALID_CODE_ERROR = '인증번호가 일치하지 않습니다';

    // ▶ 발급 여부 확인, 인증번호 입력여부 확인
    if (!randomNum) {
      window.alert(NO_SERVER_CODE_ERROR);
      return;
    } else if (!inputNum) {
      window.alert(NO_CODE_ERROR);
      return;
    }

    // ▶ 인증 유효 시간 10분
    const timeDifference = (expireTime - sendTime) / 1000 / 60;

    if (timeDifference > 10) {
      window.alert(EXPIRED_CODE_ERROR);
      return;
    }

    if (inputNum !== randomNum) {
      window.alert(INVALID_CODE_ERROR);
      return;
    }

    try {
      const response = await instance.post(
        'http://localhost:8080/auth/verify-email',
        {
          email,
          randomNum,
          inputNum,
          emailType,
          socialType,
          sendTime,
          expireTime,
        }
      );

      if (response.status === 204) {
        setVerified(true);
        setRandomNum('');
        window.alert('인증 완료!');
      } else {
        window.alert('인증 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('인증 완료 상태 전송 중 에러 발생: ', error);
    }
  };

  // ❓ 닉네임 중복 확인
  const checkNameDuplication = async (nickName) => {
    try {
      const response = await instance.post(
        'http://localhost:8080/auth/verify-nickname',
        {
          nickName,
        }
      );

      if (response.data.isDuplicated) {
        setNameDuplicated(true);
        window.alert('이미 존재하는 닉네임입니다');
      } else {
        setNameDuplicated(false);
        window.alert('사용가능한 닉네임입니다:)');
      }
    } catch (error) {
      console.error('닉네임 중복 확인 중 에러 발생: ', error);
    }
  };

  // 📝 회원가입 ---------------------------------------------------------------
  const signup = (email, password, nickName, socialType) => {
    const URL = 'http://localhost:8080/auth/signup';

    instance
      .post(
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
      )
      .then((result) => {
        console.log(`회원가입 요청 성공 : ${result}`);
        window.alert('회원가입이 완료되었습니다!');
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        window.alert('회원가입이 정상적으로 완료되지 못했습니다;');
      });
  };

  // 🚫 회원탈퇴 ---------------------------------------------------------------
  const deleteUser = async () => {
    const URL = 'http://localhost:8080/auth/delete-user';

    try {
      await instance.delete(URL, {
        headers: {
          'authorization-access': localStorage.getItem('accessToken'),
          'authorization-refresh': localStorage.getItem('refreshToken'),
        },
      });

      // ▶ 로그아웃 처리
      logout();

      window.alert('회원탈퇴가 완료되었습니다.');
    } catch (error) {
      console.error('회원탈퇴 요청 중 에러 발생: ', error);
    }
  };

  // 🔐 로그인 ---------------------------------------------------------------
  const login = (email, password, socialType) => {
    const URL = 'http://localhost:8080/auth/login';

    instance
      .post(
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
      )
      .then((response) => {
        console.log(response);
        console.log(response.headers.authorization);
        console.log('로그인 되었습니다!');

        // ▶ 유저 데이터 저장
        localStorage.setItem(
          'accessToken',
          response.headers['authorization-access']
        );
        localStorage.setItem(
          'refreshToken',
          response.headers['authorization-refresh']
        );
        localStorage.setItem('uid', response.data.id);
        localStorage.setItem('nickName', response.data.name);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('socialType', response.data.socialType);

        // ▶ 유저 상태 업데이트
        let user = {
          uid: response.data.id,
          nickName: response.data.name,
          email: response.data.email,
          password,
          socialType: socialType,
        };

        dispatch({ type: SET_USER, user });
        window.alert('로그인 되었습니다!');
        navigate('/main');
      })
      .catch((error) => {
        console.log(error);
        window.alert('로그인 실패!');
      });
  };

  //🔓 로그아웃 ---------------------------------------------------------------
  const logout = async () => {
    // post로 토큰 보내고 204 받아와서 삭제하기
    const URL = 'http://localhost:8080/auth/token/logout';
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await instance.post(
        URL,
        { accessToken: accessToken },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      if (response.status === 204) {
        console.log(response.status);

        // ▶ 유저 데이터 삭제
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('uid');
        localStorage.removeItem('nickName');
        localStorage.removeItem('email');
        localStorage.removeItem('socialType');

        // ▶ 유저 상태 초기화
        dispatch({ type: SET_USER, user: null });

        // ▶ 유저 상태 초기화
        window.alert('로그아웃 되었습니다!');

        // ▶ Redirect
        navigate('/main');
      }
    } catch (error) {
      console.log(error);
      window.alert('💥 로그아웃에 문제가 생겼습니다!');
    }
  };

  // 🔄 비밀번호 재설정 ---------------------------------------------------------------
  const resetPassword = async (email, password, rePassword, socialType) => {
    try {
      const response = await instance.post(
        'http://localhost:8080/auth/reset-password',
        {
          email,
          password,
          rePassword,
          socialType,
        }
      );

      if (response.status === 204) {
        window.alert('비밀번호가 성공적으로 재설정되었습니다');
      } else {
        window.alert('비밀번호 재설정에 실패하였습니다');
      }
    } catch (error) {
      console.error('비밀번호 재설정 중 에러 발생: ', error);
    }

    navigate('/login');
  };

  // 🚀 리프레시 토큰 전송 -----------------------------------------------------------
  const sendRefresh = async () => {
    const URL = 'http://localhost:8080/auth/token/refresh';
    const accessToken = localStorage.getItem('accessToken');
    const email = localStorage.getItem('email');
    const socialType = localStorage.getItem('socialType');
    const socialId = localStorage.getItem('socialId');

    try {
      const response = await instance.post(URL, {
        email,
        socialType,
        socialId,
        accessToken,
      });

      if (response.status === 204) {
        localStorage.setItem('accessToken', response.data.accessToken);
        console.log(`새로운 액세스 토큰을 발급받았습니다 : ${accessToken}`);
        navigate(window.location.pathname);
      }
    } catch (error) {
      console.error(error);
      window.alert('리프레시 토큰 전송에 실패했습니다');
    }
  };

  // 🟡 카카오 --------------------------------------------------
  const kakaoLogin = () => {
    window.location.href = kakaoURL;
    console.log('카카오 로그인 페이지 접속');
  };

  // 🔴 구글 ----------------------------------------------------
  const googleLogin = async () => {
    window.location.href = googleURL;
    console.log('구글 로그인 페이지 접속');
  };

  // 🟢 네이버 --------------------------------------------------
  const naverLogin = async () => {
    window.location.href = naverURL;
    console.log('네이버 로그인 페이지 접속');
  };

  // ⚙ SNS 로그인 리디렉션 - 유저 데이터 저장
  const fetchLoginData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const email = urlParams.get('email');
    const socialId = urlParams.get('socialId');
    const socialType = urlParams.get('socialType');

    console.log(`액세스 토큰 : ${accessToken}`);
    console.log(`이메일 : ${email}`);
    console.log(`소셜 ID : ${socialId}`);
    console.log(`소셜 타입 : ${socialType}`);
    console.log('서버에서 데이터를 문제없이 받아옴');

    try {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('email', email);
      localStorage.setItem('socialId', socialId);
      localStorage.setItem('socialType', socialType);

      let user = {
        accessToken: localStorage.getItem('accessToken'),
        email: localStorage.getItem('email'),
        uid: localStorage.getItem('socialId'),
        socialType: localStorage.getItem('socialType'),
      };

      dispatch({ type: SET_USER, user });
      window.alert('데이터 저장 완료');
    } catch (error) {
      console.error('데이터 저장 중 문제 발생');
      window.alert('데이터 저장 중 문제 발생');
    }
  };

  const extendedDispatch = (action) => {
    if (action.type === 'FETCH_LOGIN_DATA') {
      fetchLoginData();
    } else {
      dispatch(action);
    }
  };

  // ❤ Dispatch에 담길 value
  const value = {
    state,
    dispatch: extendedDispatch,
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
    sendRefresh,
    kakaoLogin,
    googleLogin,
    naverLogin,
    fetchLoginData,
  };

  return (
    <UserDispatchContext.Provider value={value}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

// 🔱 UserState을 사용 가능하게 하는 훅
export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error('Cannot find UserProvider');
  }
  return context;
};

// 🔱 UserDispatch를 사용 가능하게 하는 훅
export const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (!context) {
    throw new Error('Cannot find UserProvider');
  }
  return context;
};
