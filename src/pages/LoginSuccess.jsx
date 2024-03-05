import React, { useEffect, useState } from 'react';
import { useUserState, useUserDispatch } from '../context/User.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginSuccess() {
  const [accessToken, setAccessToken] = useState(''); // 액세스 토큰
  const [refreshToken, setRefreshToken] = useState(''); // 리프레시 토큰
  const [socialId, setSocialId] = useState(''); // 소셜 ID
  const user = useUserState(); // 유저 정보

  const dispatch = useUserDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/login-success');

        if (response.status === 200) {
          // 응답 헤더에서 데이터 추출
          const socialId = response.headers['socialId'];
          const accessToken = response.headers['Authorization-Access'];
          const refreshToken = response.headers['Authorization-Refresh'];

          // 로컬 스토리지에 데이터 저장
          localStorage.setItem('socialId', socialId);
          localStorage.setItem('Authorization-Access', accessToken);
          localStorage.setItem('Authorization-Refresh', refreshToken);

          // return 문에서 사용하기 위해 상태 저장
          setSocialId(socialId);
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);

          console.log(`socialId: ${socialId}`);
          console.log(`Access Token: ${accessToken}`);
          console.log(`Refresh Token: ${refreshToken}`);

          // user에 저장
          let user = {
            uid: socialId,
          };

          dispatch({ type: 'SET_USER', user }); //
        }
      } catch (error) {
        console.error(error);
        alert('서버에서 데이터를 보내지 않았습니다!');
      }
    };

    fetchData();
  }, [dispatch]);

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
