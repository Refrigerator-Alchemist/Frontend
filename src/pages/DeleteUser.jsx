import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useUserDispatch, useUserState } from '../context/UserContext';
import { toast } from 'react-toastify';

export default function DeleteUser() {
  const [password, setPassword] = useState('');

  const user = useUserState();

  const { deleteUser } = useUserDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  // 🚷 비로그인 유저 접근 금지
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      toast.error('로그인을 먼저 해야합니다');
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  }, [navigate, location]);

  // 1️⃣ 비밀번호 입력
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // 2️⃣ 회원 탈퇴
  const handleDeleteUser = async (e) => {
    e.preventDefault();

    if (password !== user.password) {
      toast.error('비밀번호가 일치하지 않습니다');
      return;
    }

    // ▶️ 사용자에게 확인 질문
    const confirmDelete = window.confirm('정말 회원탈퇴를 진행할까요?');

    if (confirmDelete) {
      await deleteUser();
    }
  };

  return (
    <section className="relative flex flex-col justify-center items-center h-screen p-8 font-score">
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
      <form className="flex flex-col items-center" onSubmit={handleDeleteUser}>
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
            type="submit"
            disabled={!password}
            className={`px-6 ml-5  rounded-3xl font-jua text-xl transition ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:scale-110  duration-300 ${
              password
                ? 'text-white bg-main hover:bg-[#15ed79] hover:text-black'
                : 'bg-gray-500 text-black'
            }`}
          >
            탈퇴하기
          </button>
        </div>
      </form>
    </section>
  );
}
