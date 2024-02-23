import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function DeleteAccount() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('서버 엔드포인트로 수정하기', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error('서버에서 에러가 발생했습니다');
      }

      const data = await response.json();

      if (data.success) {
        setMessage('계정이 성공적으로 삭제되었습니다');
        // 로그아웃하고 로그인 페이지로 리다이렉트
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('계정 삭제 중 에러 발생:', error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-center items-center h-screen p-8 font-score">
      {/* 뒤로 가기 */}
      <div
        className="absolute top-5 left-5 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/mypage')}
      >
        <FaArrowLeft />
      </div>

      {/* 타이틀 */}
      <h1 className="text-3xl font-extrabold mb-5">회원 탈퇴</h1>

      {/* 비밀번호 입력 폼 */}
      <form className="flex flex-col items-center">
        <label className="font-score text-lg text-gray-400">
          계정의 비밀번호를 입력해주세요
        </label>
        <div className="flex mt-2 space-x-3">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
            className="px-4 py-3 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleDeleteAccount}
            className="px-6 ml-5 text-white bg-main rounded-3xl font-jua text-xl transition ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-[#15ed79] hover:text-black duration-300"
          >
            탈퇴하기
          </button>
          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
}
