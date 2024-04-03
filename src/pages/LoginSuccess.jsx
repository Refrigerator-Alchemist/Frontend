import React, { useEffect } from 'react';
import { useUserState, useUserDispatch } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import errorCode from '../utils/ErrorCode';

export default function LoginSuccess() {
  const { dispatch } = useUserDispatch();
  const user = useUserState();
  const SET_USER = 'SET_USER';

  const navigate = useNavigate();

  useEffect(() => {
    // 1️⃣ 서버에서 SNS 로그인 데이터를 받아오는 함수
    const fetchLoginData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('accessToken');
      const refreshToken = urlParams.get('refreshToken');
      const socialId = urlParams.get('socialId');
      const socialType = urlParams.get('socialType');
      const nickName = urlParams.get('nickName');
      const email = urlParams.get('email');

      try {
        // ▶ 로컬 스토리지 : 액세스, 리프레시, 닉네임, 소셜ID, 소셜타입, 이메일
        if (accessToken && refreshToken && socialId) {
          localStorage.setItem('accessToken', 'Bearer ' + accessToken);
          localStorage.setItem('refreshToken', 'Bearer ' + refreshToken);
          localStorage.setItem('nickName', nickName);
          localStorage.setItem('email', email);
          localStorage.setItem('socialId', socialId);
          localStorage.setItem('socialType', socialType);

          console.log(`⭕ 로컬스토리지 저장 완료`);

          let user = {
            socialId: localStorage.getItem('socialId'),
            socialType: localStorage.getItem('socialType'),
          };

          console.log(`⭕ 유저 데이터 저장 완료`);

          // ▶ dispatch로 리듀서에 저장
          dispatch({ type: SET_USER, user });

          return user;
        } else {
          return;
        }
      } catch (error) {
        // 🚫 에러 처리
        const errorHeaders = error.response?.headers;
        if (errorHeaders.code) {
          const errorName = Object.values(errorCode).find(
            (obj) => obj.code === errorHeaders.code
          );
          const userNotice = errorName.notice;

          console.log(`에러 내용: ${errorName}`); // 백엔드 확인용
          toast.error(`${userNotice}`); // 유저 팝업용
        } else {
          console.log(`확인되지 않은 에러, ${error}`); // 에러 예외
        }
      }
    };

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
  }, [navigate, dispatch]);

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
