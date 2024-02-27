import React, { useReducer, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 서버 주소 : http://localhost:8080
// 로그인 /login
// 회원가입 /login/signup

// 초기 상태 정의
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  // 📝 회원가입
  const signup = (email, password, username, socialType) => {
    const URL = 'http://localhost:8080/login/signup';

    axios
      .post(
        URL,
        {
          email: email,
          password: password,
          username: username,
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

  // 🚫 회원탈퇴
  const deleteUser = async () => {
    const URL = 'http://localhost:8080/mypage/delete-user';

    try {
      // 서버에 회원탈퇴 요청
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

  // 🔐 로그인
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
        localStorage.setItem('username', response.data.name);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('socialType', response.data.socialType); // 소셜 로그인 or 이메일 로그인

        let user = {
          uid: response.data.id,
          username: response.data.name,
          email: response.data.email,
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

  //🔓 로그아웃
  const logout = () => {
    // 로컬 스토리지에서 유저 데이터 삭제
    localStorage.removeItem('Authorization');
    localStorage.removeItem('uid');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('socialType');

    // 유저 상태 초기화
    dispatch({ type: SET_USER, user: null });

    // 메인 페이지로 리다이렉트
    navigate('/main');
  };

  // 🔄 비밀번호 재설정
  const resetPassword = async (email, password, socialType) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/reset-password',
        {
          email,
          password,
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

  // Context value에 login과 signup 함수를 포함
  const value = {
    state,
    dispatch,
    login,
    signup,
    logout,
    deleteUser,
    resetPassword,
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
