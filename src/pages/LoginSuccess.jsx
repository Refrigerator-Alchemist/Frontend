import React, { useEffect, useState } from 'react';
import { useUserState, useUserDispatch } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginSuccess() {
  const [accessToken, setAccessToken] = useState('');
  const [email, setEmail] = useState('');
  const [socialType, setSocialType] = useState('');
  const [socialId, setSocialId] = useState('');
  const user = useUserState();

  const dispatch = useUserDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginData = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('accessToken');
      const email = urlParams.get('email');
      const socialId = urlParams.get('socialId');
      const socialType = urlParams.get('socialType');

      console.log(`액세스 토큰 : ${accessToken}`);
      console.log(`이메일 : ${email}`);
      console.log(`소셜 ID : ${socialId}`);
      console.log(`소셜 타입 : ${socialType}`);

      if (accessToken && email && socialId && socialType) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('email', email);
        localStorage.setItem('socialId', socialId);
        localStorage.setItem('socialType', socialType);

        setAccessToken(accessToken);
        setEmail(email);
        setSocialId(socialId);
        setSocialType(socialType);

        let user = {
          accessToken: localStorage.getItem('accessToken'),
          email: localStorage.getItem('email'),
          uid: localStorage.getItem('socialId'),
          socialType: localStorage.getItem('socialType'),
        };

        // ▶ 유저 객체를 반환
        return user;
      } else {
        console.log('데이터를 받아오지 못했습니다');
        alert('데이터 저장 중 문제 발생');
      }
    };

    // ▶ 함수 실행
    const user = fetchLoginData();

    // ▶ 반환된 유저 객체를 dispatch로 유저 상태 저장
    if (user) {
      dispatch({ type: 'SET_USER', user });
      alert('데이터 저장 완료');
    }
  }, [dispatch]);

  return (
    <section>
      {user ? (
        <div className="flex flex-col justify-center items-center font-score">
          <h1 className="text-4xl">
            로그인에 성공했을 때 볼 수 있는 화면입니다!
          </h1>
          <span>{`액세스 토큰 : ${accessToken}`}</span>
          <span>{`이메일 : ${email}`}</span>
          <span>{`소셜 ID : ${socialId}`}</span>
          <span>{`소셜 타입 : ${socialType}`}</span>
          <button onClick={() => navigate('/main')}>메인페이지 이동</button>
        </div>
      ) : (
        <div>
          <h1>로그인에 실패했거나, 문제가 있습니다😅</h1>
          <button onClick={() => navigate('/login')}>
            <span className="text-red-500 hover:scale-110">
              다시 로그인 시도
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
