import React, { createContext, useState } from 'react';
import api from '../apis/api';
import Cookies from 'js-cookie';
import * as auth from '../apis/auth';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  /*
    상태
    - 로그인 여부
    - 유저 정보
    - 아이디 저장
   */

  /*--------------------------- [State] --------------------------- */
  // 로그인 여부
  const [isLogin, setIsLogin] = useState(false);

  // 유저 정보
  const [userInfo, setUserInfo] = useState({});

  // 이메일 저장
  const [rememberUserEmail, setRememberUserEmail] = useState();

  /*--------------------------------------------------------------- */

  /*
  ✅ 로그인 체크
  - 쿠키에 JWT가 있는지 확인
  - JWT로 사용자 정보를 요청
   */
  const loginCheck = async () => {
    // 쿠키에서 토큰을 가져오기
    const accessToken = Cookies.get('accessToken');
    console.log(`accessToken :  ${accessToken}`);

    let response;
    let data;

    response = await auth.info();

    data = response.data;
    console.log(`data : ${data}`);

    // ✅ 인증 성공
    // 로그인 세팅
    loginSetting(data, accessToken);
  };

  // 🔓 로그인
  const login = async (userEmail, password) => {
    console.log(`userEmail : ${userEmail}`);
    console.log(`password : ${password}`);

    const response = await auth.login(userEmail, password);
    const data = response.data;
    const status = response.status;
    const headers = response.headers;
    const authorization = headers.authorization;
    const accessToken = authorization.replace('Bear ', '');

    console.log(`data : ${data}`);
    console.log(`status ${status}`);
    console.log(`headers ${headers}`);
    console.log(`jwt : ${accessToken}`);

    // 🟢 로그인 성공
    if (status === 200) {
      // 쿠키에 accessToken(jwt) 저장
      Cookies.set('accessToken', accessToken);
      loginCheck();
      alert('로그인 성공');
    }
  };

  // ❗ 로그아웃
  const logout = () => {
    setIsLogin(false);
  };

  // 🔐 로그인 세팅
  // 👩‍🌾 userData, accessToken(JWT)
  const loginSetting = (userData, accessToken) => {
    const { no, userEmail, socialType } = userData;

    console.log(`no : ${no}`);
    console.log(`userEmail : ${userEmail}`);
    console.log(`socialType : ${socialType}`);

    // axios 객체의 header(Authorization : `Bear ${accessToken}`)
    api.defaults.headers.common.Authorization = `Bear ${accessToken}`;

    // 로그인 여부 : true
    setIsLogin(true);

    // 유저정보 세팅
    const updateUserInfo = { no, userEmail, socialType };
    setUserInfo(updateUserInfo);
  };

  // 🔐 로그아웃 세팅
  const logoutSetting = () => {
    // axios 헤더 초기화
    api.defaults.headers.common.Authorization = undefined;

    // 쿠키 초기화
    Cookies.remove('accessToken');

    // 로그인 여부 : false
    setIsLogin(false);

    // 유저 정보 초기화
    setUserInfo(null);
  };

  return (
    <LoginContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
