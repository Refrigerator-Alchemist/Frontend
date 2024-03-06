import React, { useEffect, useState } from 'react';
import { useUserState, useUserDispatch } from '../context/User.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginSuccess() {
  const [socialId, setSocialId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const user = useUserState();

  const dispatch = useUserDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const socialType = urlParams.get('socialType');
      const code = urlParams.get('code');

      // code 뒷 부분에 Auth토큰, socialId 둘다 붙어서 온다고 함
      // 분리해서 매핑하는 처리와 토큰과 socialId만 저장하도록 해야함
      try {
        const response = await axios.get(
          `http://localhost:8080/login/oauth2/code/${socialType}?code=${code}`
        );

        console.log(`소셜 타입(서비스명) : ${socialType}`);
        console.log(`코드 : ${code}`);

        if (response.status === 200) {
          const socialId = response.headers['socialId'];
          const accessToken = response.headers['Authorization-Access'];
          const refreshToken = response.headers['Authorization-Refresh'];

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
        }
      } catch (error) {
        console.error(error);
        alert('로그인 실패. 🥵🥶🥵🥶🥵🥶다음 기회에ㅋ🥵🥶');
      }
    };

    getData();
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
