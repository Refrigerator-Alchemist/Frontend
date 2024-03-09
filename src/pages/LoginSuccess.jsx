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
    const fetchLoginData = async () => {
      // ▶ 헤더 : accessToken, email, socialId, socialType
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('accessToken'); // 쿼리 파라미터 : accessToken
      const email = urlParams.get('email'); // 쿼리 파라미터 : email
      const socialId = urlParams.get('socialId'); // 쿼리 파라미터 : socialId
      const socialType = urlParams.get('socialType'); // 쿼리 파라미터 : socialType

      console.log(`액세스 토큰 : ${accessToken}`);
      console.log(`이메일 : ${email}`);
      console.log(`소셜 ID : ${socialId}`);
      console.log(`소셜 타입 : ${socialType}`);

      if (accessToken && socialId) {
        localStorage.setItem('socialId', socialId);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('email', email);
        localStorage.setItem('socialType', socialType);

        // ▶ 비동기 - 동기 충돌 해결 : 테스트 렌더링용 상태 저장
        setAccessToken(accessToken);
        setEmail(email);
        setSocialId(socialId);
        setSocialType(socialType);
      } else {
        console.log('데이터를 받아오지 못했습니다');
        alert('데이터 저장 중 문제 발생');
      }
    };

    // ▶ 유저 데이터 저장
    fetchLoginData().then((user) => {
      if (user) {
        dispatch({ type: 'SET_USER', user });
        alert('데이터 저장 완료');
      }
    });
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
          <span>{`사용자 ID (소셜 ID와 동일) : ${user.uid}`}</span>
          <span>{`소셜 타입 : ${socialType}`}</span>
          <button onClick={() => navigate('/main')}>메인페이지 이동</button>
        </div>
      ) : (
        <div>
          <h1>로그인에 실패했거나, 문제가 있습니다😅</h1>
          <button
            className="text-red-500 hover:scale-110"
            onClick={() => navigate('/login')}
          >
            다시 로그인 시도
          </button>
        </div>
      )}
    </section>
  );
}
