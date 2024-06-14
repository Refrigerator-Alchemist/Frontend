import React, { useEffect } from 'react';
import { useUserApi } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginSuccess() {
  const { handleError } = useUserApi();
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
        } else {
          return;
        }
      } catch (error) {
        handleError(error);
      }
    };

    fetchLoginData().then(navigate('/main'));
  }, [navigate, handleError]);

  return (
    <section>
      {localStorage.getItem('accessToken') ? (
        <div className="flex flex-col justify-center items-center font-score space-y-3">
          <h1 className="text-3xl font-bold">메인페이지로 이동합니다</h1>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center font-score space-y-3">
          <h1 className="text-3xl font-bold">
            콘솔과 네트워크에서 문제를 확인하세요
          </h1>
        </div>
      )}
    </section>
  );
}
