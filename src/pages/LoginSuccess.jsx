import React, { useEffect, useState } from 'react';
import { useUserState, useUserDispatch } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginSuccess() {
  const [accessToken, setAccessToken] = useState('');
  const [email, setEmail] = useState('');
  const [socialType, setSocialType] = useState('');
  const [socialId, setSocialId] = useState('');
  const user = useUserState();

  const { dispatch } = useUserDispatch();

  const navigate = useNavigate();

  const SET_USER = 'SET_USER';

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
      console.log('⭕ 데이터 받아오는 건 문제없음');

      // ▶ 4개 데이터 받아왔는지 판단
      if (accessToken && email && socialType && socialId) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('email', email);
        localStorage.setItem('socialId', socialId);
        localStorage.setItem('socialType', socialType);

        // ▶ 유저 데이터 저장
        let user = {
          accessToken: localStorage.getItem('accessToken'),
          email: localStorage.getItem('email'),
          uid: localStorage.getItem('socialId'),
          socialType: localStorage.getItem('socialType'),
        };

        console.log(`유저 데이터 저장 완료 : ${user}`);

        // ▶ dispatch로 리듀서에 저장
        dispatch({ type: SET_USER, user });
        window.alert('⭕ dispatch 문제없음');
        console.log('⭕ dispatch 문제없음');

        setAccessToken(localStorage.getItem('accessToken'));
        setEmail(localStorage.getItem('email'));
        setSocialId(localStorage.getItem('socialId'));
        setSocialType(localStorage.getItem('socialType'));

        return user;
      } else {
        // ▶ 데이터가 하나라도 모자라면 발생
        console.log('서버에서 데이터 받는 중 문제 발생');
        window.alert('서버에서 데이터 받는 중 문제 발생');
      }
    };

    fetchLoginData()
      .then((user) => {
        if (user) {
          window.alert('⭕ SNS 로그인 데이터 저장 완료');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section>
      {user ? (
        <div className="flex flex-col justify-center items-center font-score space-y-3">
          <h1 className="text-3xl font-bold">
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
