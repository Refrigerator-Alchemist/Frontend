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
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('accessToken');
      const email = urlParams.get('email');
      const socialId = urlParams.get('socialId');
      const socialType = urlParams.get('socialType');

      console.log(`액세스 토큰 : ${accessToken}`);
      console.log(`이메일 : ${email}`);
      console.log(`소셜 ID : ${socialId}`);
      console.log(`소셜 타입 : ${socialType}`);

      // ▶ 4개 데이터 받아왔는지 판단
      if (accessToken && email && socialType && socialId) {
        localStorage.setItem('socialId', socialId);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('email', email);
        localStorage.setItem('socialType', socialType);

        let user = {
          uid: socialId,
          email: email,
          socialType: socialType,
        };

        dispatch({ type: 'SET_USER', user });
        alert('데이터 저장 완료');

        // ▶ return문에서 사용하기 위한 상태 저장
        setAccessToken(accessToken);
        setEmail(email);
        setSocialId(socialId);
        setSocialType(socialType);
      } else {
        console.log('유저 데이터 저장 중 문제 발생');
        alert('유저 데이터 저장 중 문제 발생');
      }
    };

    fetchLoginData().then((user) => {
      if (user) {
        alert('유저 데이터 저장 완료');
      }
    });
  }, [dispatch]);

  return (
    <section>
      {user ? (
        <div className="flex flex-col justify-center items-center font-score space-y-3">
          <h1 className="text-4xl font-bold">
            SNS 서버로부터 받은 데이터 확인
          </h1>
          <span className="max-w-md break-words">{`액세스 토큰 : ${accessToken}`}</span>
          <span>{`이메일 : ${email}`}</span>
          <span>{`소셜 ID : ${socialId}`}</span>
          <span>{`소셜 타입 : ${socialType}`}</span>
          <button onClick={() => navigate('/main')}>
            <span className="text-red-500 hover:scale-110">
              메인페이지 이동
            </span>
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold">유저 객체가 없습니다</h1>
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
