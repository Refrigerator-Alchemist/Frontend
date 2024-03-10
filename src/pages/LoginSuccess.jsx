import React, { useState } from 'react';
import { useUserState } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginSuccess() {
  const [accessToken, setAccessToken] = useState('');
  const [email, setEmail] = useState('');
  const [socialType, setSocialType] = useState('');
  const [socialId, setSocialId] = useState('');

  const { fetchLoginData, user } = useUserState();

  const navigate = useNavigate();

  const handleButtonClick = () => {
    fetchLoginData();
    setAccessToken(localStorage.getItem('accessToken'));
    setEmail(localStorage.getItem('email'));
    setSocialType(localStorage.getItem('socialType'));
    setSocialId(localStorage.getItem('socialId'));
  };

  return (
    <section>
      {user ? (
        <div className="flex flex-col justify-center items-center font-score space-y-3">
          <h1 className="text-4xl font-bold">
            SNS 서버로부터 받은 데이터 확인
          </h1>
          <button onClick={handleButtonClick}>데이터 가져오기</button>
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
