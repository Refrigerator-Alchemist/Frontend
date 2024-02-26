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

  // 회원가입
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
            'Content-Type': 'application/json',
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

  // 로그인
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

        let user = {
          uid: response.data.id,
          username: response.data.name,
          email: response.data.email,
          socialType: socialType, // SNS로그인 or 이메일 로그인
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

  // Context value에 login과 signup 함수를 포함
  const value = {
    state,
    dispatch,
    login,
    signup,
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
