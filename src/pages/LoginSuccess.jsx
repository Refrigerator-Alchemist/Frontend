import React, { useEffect, useState } from 'react';
import { useUserState } from '../context/User.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginSuccess() {
  const [accessToken, setAccessToken] = useState(''); // 액세스 토큰
  const [refreshToken, setRefreshToken] = useState(''); // 리프레시 토큰
  const [socialId, setSocialId] = useState(''); // SNS ID

  const user = useUserState(); // user 상태 가져오기

  const navigate = useNavigate();

  useEffect(() => {
    setAccessToken(localStorage.getItem('Authorization-Access'));
    setRefreshToken(localStorage.getItem('Authorization-Refresh'));
    setSocialId(localStorage.getItem('socialId'));

    console.log(`Access Token: ${accessToken}`);
    console.log(`Refresh Token: ${refreshToken}`);
    console.log(`socialId: ${socialId}`);
    console.log(`사용자의 ID : ${user.uid}`);
  }, []);

  return (
    <section>
      {user ? (
        <div className="flex flex-col justify-center items-center font-score">
          <h1 className="text-4xl">
            로그인에 성공했을 때 볼 수 있는 화면입니다!
          </h1>
          <span>{`SNS 서버의 액세스 토큰 : ${accessToken}`}</span>
          <span>{`SNS 서버의 리프레시 토큰 : ${refreshToken}`}</span>
          <span>{`socialId : ${socialId}`}</span>
          <span>{`사용자의 ID : ${user.uid}`}</span>
          <button onClick={navigate('/main')}>메인페이지</button>
        </div>
      ) : (
        <div>
          <h1>로그인에 실패했거나, 문제가 있습니다😅</h1>
          <button onClick={navigate('/login')}>다시 로그인</button>
        </div>
      )}
    </section>
  );
}
