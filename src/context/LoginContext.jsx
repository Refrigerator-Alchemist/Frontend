import React, { createContext, useEffect, useState } from 'react';
import api from '../apis/api';
import Cookies from 'js-cookie';
import * as auth from '../apis/auth';
import { useNavigate } from 'react-router-dom';

export const LoginContext = createContext();

/**
 * 로그인 컨텍스트 : 전체 페이지에 로그인 상태를 전달
 * 🔓 로그인
 * ⚡ 로그인 체크
 * ⚡ 로그인 세팅
 *
 * 🔐 로그아웃
 * ⚡ 로그아웃 세팅
 * */
export const LoginProvider = ({ children }) => {
  /*
    State
    - 로그인 여부
    - 유저 정보
    - 아이디 저장
   */
  /*--------------------------- [State] --------------------------- */
  // 로그인 여부
  const [isLogin, setIsLogin] = useState(false);

  // 유저 정보
  const [userInfo, setUserInfo] = useState({});

  // 페이지 이동
  const navigate = useNavigate();

  /*--------------------------------------------------------------- */

  // ----------------------- 로그인 -------------------------------

  // 🔓 로그인 1️⃣
  const login = async (userEmail, password, socialType) => {
    console.log(`userEmail : ${userEmail}`);
    console.log(`password : ${password}`);
    console.log(`socialType : ${socialType}`);

    try {
      const response = await auth.login(userEmail, password, socialType);
      const data = response.data;
      const status = response.status;
      const headers = response.headers;
      const authorization = headers.authorization;
      const accessToken = authorization.replace('Bearer ', '');

      console.log(`data : ${data}`);
      console.log(`status ${status}`);
      console.log(`headers ${headers}`);
      console.log(`JWT : ${accessToken}`);

      // 로그인 성공
      if (status === 200) {
        // 🍪 쿠키에 accessToken(jwt) 저장
        Cookies.set('accessToken', accessToken);

        // 로그인 체크
        loginCheck();
        alert('로그인에 성공했습니다');

        // 메인페이지 이동
        navigate('/main');
      }
    } catch (error) {
      // 로그인 실패
      alert('로그인에 실패했습니다');
    }
  };

  /*
  ⚡ 로그인 체크 2️⃣
  - 쿠키에 JWT가 있는지 확인
  - JWT로 사용자 정보를 요청
   */
  const loginCheck = async () => {
    // 🍪 쿠키에서 토큰을 가져오기
    const accessToken = Cookies.get('accessToken');
    console.log(`accessToken :  ${accessToken}`);

    // accessToken(JWT)이 없는 경우
    if (!accessToken) {
      console.log('쿠키에 accessToken(JWT)이 없음');
      logoutSetting();
      return;
    }

    // accessToken(JWT)이 있는 경우
    // ↪ App에 JWT 담기
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // 사용자 정보 요청
    let response;
    let data;

    // 로그인 실패 캐치
    try {
      response = await auth.info();
    } catch (error) {
      console.log(`error : ${error}`);
      console.log(`status : ${response.status}`);
      return;
    }
    data = response.data;
    console.log(`data : ${data}`);

    // ❌ 인증 실패
    if (data === 'UNAUTHRIZED' || response.status === 401) {
      console.error('accessToken(JWT 토큰)이 만료되었거나 인증에 실패했습니다');
    }

    // ✅ 인증 성공 : 로그인 세팅
    console.log('accessToken(JWT 토큰)으로 사용자 인증에 성공했습니다');
    loginSetting(data, accessToken);
  };

  // ⚡ 로그인 세팅 3️⃣ : userData, accessToken(JWT)
  const loginSetting = (userData, accessToken) => {
    const { no, userEmail } = userData;

    console.log(`no : ${no}`);
    console.log(`userEmail : ${userEmail}`);

    // axios 객체의 header(Authorization : `Bearer ${accessToken}`)
    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    setIsLogin(true); // 로그인 여부 : true

    // 유저정보 세팅
    const updateUserInfo = { no, userEmail };
    setUserInfo(updateUserInfo);

    // 리다이렉트 : 토큰 만료 처리
  };

  useEffect(() => {
    loginCheck(); // 마운트 될때마다 로그인 체크
  }, []);

  // ----------------------- 로그아웃 ------------------------------

  // 🔐 로그아웃
  const logout = () => {
    // 로그아웃 컨펌
    const check = window.confirm('로그아웃 할까요?');
    if (check) {
      logoutSetting();
      navigate('/main');
      alert('로그아웃 되었습니다');
    }
  };

  // ⚡ 로그아웃 세팅
  const logoutSetting = () => {
    api.defaults.headers.common.Authorization = undefined; // axios 헤더 초기화
    Cookies.remove('accessToken'); // 쿠키 초기화
    setIsLogin(false); // 로그인 여부 : false
    setUserInfo(null); // 유저 정보 초기화
  };

  // ---------------------------------------------------------------

  return (
    <LoginContext.Provider value={{ isLogin, userInfo, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
