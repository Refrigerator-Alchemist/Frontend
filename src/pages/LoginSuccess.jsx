import React, { useEffect, useState } from 'react';
import { useUserState, useUserDispatch } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginSuccess() {
  const [socialId, setSocialId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const user = useUserState();

  const dispatch = useUserDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('accessToken'); // 쿼리 파라미터 : accessToken
      const socialId = urlParams.get('socialId'); // 쿼리 파라미터 : socialId

      // 쿠키 : refreshToken
      const cookies = document.cookie.split('; ');
      const refreshToken = cookies
        .find((row) => row.startsWith('refreshToken=')) // refreshToken= 으로 시작하는 행
        .split('=')[1]; // = 뒤가 value

      if (accessToken && socialId && refreshToken) {
        localStorage.setItem('socialId', socialId);
        localStorage.setItem('Authorization-Access', accessToken);
        localStorage.setItem('Authorization-Refresh', refreshToken);

        setSocialId(socialId);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        console.log(`소셜 ID : ${socialId}`);
        console.log(`액세스 토큰 : ${accessToken}`);
        console.log(`리프레시 토큰 : ${refreshToken}`);

        // ▶ 유저 데이터 저장
        let user = {
          uid: socialId,
        };

        dispatch({ type: 'SET_USER', user }); //
      } else {
        alert('🥵🥶🥵🥶로그인 실패🥵🥶🥵🥶');
      }
    };

    fetchLoginData();
  }, [dispatch]);

  return (
    <section>
      {user ? (
        <div className="flex flex-col justify-center items-center font-score">
          <h1 className="text-4xl">
            로그인에 성공했을 때 볼 수 있는 화면입니다!
          </h1>
          <span>{`액세스 토큰 : ${accessToken}`}</span>
          <span>{`리프레시 토큰 : ${refreshToken}`}</span>
          <span>{`소셜 ID : ${socialId}`}</span>
          <span>{`사용자 ID (소셜 ID와 동일) : ${user.uid}`}</span>
          <button onClick={navigate('/main')}>메인페이지 이동</button>
        </div>
      ) : (
        <div>
          <h1>로그인에 실패했거나, 문제가 있습니다😅</h1>
          <button onClick={navigate('/login')}>다시 로그인 시도</button>
        </div>
      )}
    </section>
  );
}
