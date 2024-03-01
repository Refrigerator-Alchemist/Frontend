import React, { useState, useReducer, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 서버 주소 : http://localhost:8080
// 로그인 path : /login
// 회원가입 : /login/signup

// 유저 초기 상태 정의
const initialState = {
  user: null,
};

// 액션 타입 정의
const SET_USER = 'SET_USER';

// 리듀서 정의 : useReducer를 위한 상태
const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user, // 유저에 액션을 보냄
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Context 생성
const UserStateContext = createContext();
const UserDispatchContext = createContext();

// Provider 컴포넌트 정의
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); // 유저 정보

  const [emailExists, setEmailExists] = useState(false); // 회원가입 시 이메일 중복 여부

  const [randomNum, setRandomNum] = useState(null); // 발급된 인증번호
  const [sendTime, setSendTime] = useState(null); // 인증번호 발급시간
  const [expireTime, setExpireTime] = useState(null); // 인증번호 만료시간
  const [verified, setVerified] = useState(false); // 이메일 인증 여부

  const [nameDuplicated, setNameDuplicated] = useState(true); // 닉네임 중복 여부

  const navigate = useNavigate();

  // 📧 이메일 인증 요청 (회원가입용)
  const requestEmailForSignUp = async (email, emailType, socialType) => {
    const URL = 'http://localhost:8080/send-email';

    try {
      const response = await axios.post(URL, {
        email,
        emailType,
        socialType,
      });
      console.log(response.data); // 콘솔에서 데이터 확인

      // 이메일 중복 아닐 시 발급
      if (response.data.exists) {
        setEmailExists(true);
        alert('이미 서버에 존재하는 이메일입니다');
      } else {
        setEmailExists(false);
        setRandomNum(response.data.randomNum);
        setSendTime(new Date()); // 발급 시간 저장
        setExpireTime(response.data.expireTime); // 만료 시간 저장
        alert('인증번호가 발송되었습니다');
        console.log(`발급된 인증번호 : ${randomNum}`);
      }
    } catch (error) {
      console.error('이메일 인증번호 요청 중 에러 발생: ', error);
    }
  };

  // 📧 이메일 인증 요청 (비밀번호 재설정용)
  const requestEmailForReset = async (email, emailType, socialType) => {
    const URL = 'http://localhost:8080/send-email';

    try {
      const response = await axios.post(URL, {
        email,
        emailType,
        socialType,
      });
      console.log(response.data); // 콘솔에서 데이터 확인

      // 이메일 존재시 발급
      if (response.data.exists) {
        setEmailExists(true);
        setRandomNum(response.data.randomNum);
        setSendTime(new Date()); // 발급 시간 저장
        setExpireTime(response.data.expireTime); // 만료 시간 저장
        alert('인증번호가 발송되었습니다');
        console.log(`발급된 인증번호 : ${randomNum}`);
      } else {
        setEmailExists(false);
        alert('존재하지 않는 이메일입니다');
      }
    } catch (error) {
      console.error('이메일 인증번호 요청 중 에러 발생: ', error);
    }
  };

  // ✅ 이메일 인증 확인
  /* private String email : 이메일
    private String socialType : 소셜타입
    private String randomNum : 발급된 인증번호
    private String inputNum : 사용자가 입력한 인증번호
    private LocalDateTime sendTime : 발급시간
    private LocalDateTime expireTime : 만료시간 */
  const checkCodeVerification = async (email, inputNum, socialType) => {
    const NO_SERVER_CODE_ERROR = '발급된 인증번호가 없습니다';
    const NO_CODE_ERROR = '인증번호를 입력해주세요';
    const EXPIRED_CODE_ERROR = '인증번호가 만료되었습니다';
    const INVALID_CODE_ERROR = '인증번호가 일치하지 않습니다';

    // 발급 확인, 인증번호 입력 확인
    if (!randomNum) {
      alert(NO_SERVER_CODE_ERROR);
      return;
    } else if (!inputNum) {
      alert(NO_CODE_ERROR);
      return;
    }

    // 인증번호 유효 시간 : 10분 - 수정하기
    const timeDifference = (expireTime - sendTime) / 1000 / 60;

    if (timeDifference > 10) {
      console.log(EXPIRED_CODE_ERROR);
      alert(EXPIRED_CODE_ERROR);
      return;
    }

    if (inputNum !== randomNum) {
      alert(INVALID_CODE_ERROR);
      return;
    }

    try {
      // 서버에 인증 완료 상태 전송
      const response = await axios.post('http://localhost:8080/verify-email', {
        email,
        inputNum,
        randomNum,
        socialType,
        sendTime,
        expireTime,
      });

      if (response.status === 204) {
        // 서버에서 성공 응답을 받았을 경우
        setVerified(true); // 인증 완료
        setRandomNum('');
        alert('인증 완료!');
      } else {
        alert('인증 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('인증 완료 상태 전송 중 에러 발생: ', error);
    }
  };

  // ❓ 닉네임 중복 확인
  const checkNameDuplication = async (nickName) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/verify-nickname',
        {
          nickName,
        }
      );

      if (response.data.isDuplicated) {
        console.log('이미 사용중인 닉네임입니다');
        setNameDuplicated(true);
      } else {
        console.log('사용 가능한 닉네임입니다');
        setNameDuplicated(false);
      }
    } catch (error) {
      console.error('닉네임 중복 확인 중 에러 발생: ', error);
    }
  };

  // 📝 회원가입 ---------------------------------------------------------------
  const signup = (email, password, nickName, socialType) => {
    const URL = 'http://localhost:8080/signup';

    axios
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
            Accept: 'application/json', //현재 서버한테 보내는 데이터 타입
          },
        }
      )
      .then((result) => {
        console.log(result);
        console.log('회원가입 요청 성공');
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
    const URL = 'http://localhost:8080/delete-user';

    try {
      await axios.delete(URL, {
        headers: {
          Authorization: localStorage.getItem('Authorization'), // 인증 토큰
        },
      });

      // 로그아웃 처리
      logout();

      alert('회원탈퇴가 완료되었습니다.');
    } catch (error) {
      console.error('회원탈퇴 요청 중 에러 발생: ', error);
    }
  };

  // 🔐 로그인 ---------------------------------------------------------------
  const login = (email, password, socialType) => {
    const URL = 'http://localhost:8080/login';

    axios
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
            Accept: 'application/json', //현재 서버한테 보내는 데이터 타입
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log(response.data); // body 데이터
        console.log(response.headers.authorization); // undefined getItem
        console.log('로그인 되었습니다!');

        // 로컬 스토리지에 유저 데이터 저장
        localStorage.setItem('Authorization', response.headers.authorization);
        localStorage.setItem('uid', response.data.id);
        localStorage.setItem('nickName', response.data.name);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('socialType', response.data.socialType); // 소셜 로그인 or 이메일 로그인

        let user = {
          uid: response.data.id,
          nickName: response.data.name,
          email: response.data.email,
          password,
          socialType: socialType, // SNS로그인 or 이메일 로그인
        };

        dispatch({ type: SET_USER, user });
        window.alert('로그인 되었습니다!');
        navigate('/main'); // 메인페이지 리다이렉트
      })
      .catch((error) => {
        console.log(error);
        window.alert('로그인 실패!');
      });
  };

  //🔓 로그아웃 ---------------------------------------------------------------
  const logout = () => {
    // 로컬 스토리지에서 유저 데이터 삭제
    localStorage.removeItem('Authorization');
    localStorage.removeItem('uid');
    localStorage.removeItem('nickName');
    localStorage.removeItem('email');
    localStorage.removeItem('socialType');

    // 유저 상태 초기화
    dispatch({ type: SET_USER, user: null });

    // 메인 페이지로 리다이렉트
    navigate('/main');
  };

  // 🔄 비밀번호 재설정 ---------------------------------------------------------------
  const resetPassword = async (email, password, rePassword, socialType) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/reset-password',
        {
          email,
          password,
          rePassword,
          socialType,
        }
      );

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

  // Context value
  const value = {
    state,
    dispatch,
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
  };

  return (
    <UserDispatchContext.Provider value={value}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

// UserState 컨텍스트 사용
export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error('Cannot find UserProvider');
  }
  return context;
};

// UserDispatch 컨텍스트 사용
export const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (!context) {
    throw new Error('Cannot find UserProvider');
  }
  return context;
};
