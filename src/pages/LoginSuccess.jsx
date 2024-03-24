import React, { useEffect } from 'react';
import { useUserState, useUserDispatch } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginSuccess() {
  const user = useUserState();

  const { dispatch } = useUserDispatch();

  const navigate = useNavigate();

  const SET_USER = 'SET_USER';

  useEffect(() => {
    fetchLoginData()
      .then((user) => {
        if (user) {
          console.log(`⭕ 유저 데이터를 컨텍스트에 저장 완료`);
          navigate('/main');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // 1️⃣ 서버에서 SNS 로그인 데이터를 받아오는 함수
  const fetchLoginData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');
    const socialId = urlParams.get('socialId');
    const email = urlParams.get('email');

    // ▶ 4개 데이터 받아왔는지 판단 : 토큰 앞에 Bearer 추가
    if (accessToken && socialId && refreshToken && email) {
      localStorage.setItem('accessToken', 'Bearer ' + accessToken);
      localStorage.setItem('refreshToken', 'Bearer ' + refreshToken);
      localStorage.setItem('socialId', socialId);
      localStorage.setItem('email', email);

      console.log(`⭕ 로컬스토리지 저장 완료 : ${localStorage}`);

      // ▶ 유저 데이터 저장
      let user = {
        accessToken: localStorage.getItem('accessToken'),
        email: localStorage.getItem('email'),
        socialId: localStorage.getItem('socialId'),
        socialType: localStorage.getItem('socialType'),
      };

      console.log(`⭕ 유저 데이터 저장 완료`);

      // ▶ dispatch로 리듀서에 저장
      dispatch({ type: SET_USER, user });

      return user;
    } else {
      // ▶ 데이터가 하나라도 모자라면 발생
      console.log('❌ 서버에서 데이터 받는 중 문제 발생');
      window.alert('❌ 서버에서 데이터 받는 중 문제 발생');
    }
  };

  return (
    <section>
      {user ? (
        <div className="flex flex-col justify-center items-center font-score space-y-3">
          <h1 className="text-3xl font-bold">메인페이지로 이동합니다</h1>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center font-score space-y-3">
          <h1 className="text-3xl font-bold">
            ❌ 콘솔과 네트워크에서 문제를 확인하세요
          </h1>
        </div>
      )}
    </section>
  );
}
