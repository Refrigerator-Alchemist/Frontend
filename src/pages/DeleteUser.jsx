import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useUserDispatch } from '../context/UserContext';
import { toast } from 'react-toastify';
import errorCode from '../utils/ErrorCode';

export default function DeleteUser() {
  const [password, setPassword] = useState('');

  const { deleteUser } = useUserDispatch();

  const navigate = useNavigate();

  // 1️⃣ 비밀번호 입력
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // 2️⃣ 회원 탈퇴
  const handleDeleteUser = (e) => {
    e.preventDefault();

    // ▶️ 사용자에게 확인 질문
    const confirmDelete = window.confirm('정말 회원탈퇴를 진행할까요?');

    try {
      if (confirmDelete) {
        deleteUser();
      }
    } catch (error) {
      // 🚫 에러 처리
      const errorHeaders = error.response?.headers;
      if (errorHeaders.code) {
        const errorName = Object.values(errorCode).find(
          (obj) => obj.code === errorHeaders.code
        );
        const userNotice = errorName.notice;

        console.log(`에러 내용: ${errorName}`);
        toast.error(`${userNotice}`);
      } else {
        console.log(`확인되지 않은 에러, ${error}`);
      }
    }
  };

  return (
    <section className="relative flex flex-col justify-center items-center h-screen p-8 font-score">
      {/* 뒤로 가기 */}
      <div
        className="absolute top-5 left-5 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/mypage')}
      >
        <FaArrowLeft />
      </div>

      {/* 타이틀 */}
      <h1 className="text-3xl font-scoreExtrabold mb-2">회원 탈퇴</h1>

      {/* 비밀번호 입력 폼 */}
      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleDeleteUser}
      >
        <label className="font-score text-lg text-gray-400">
          계정의 비밀번호를 입력해주세요
        </label>
        <div className="flex mt-2 space-x-3 w-full">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
            className="px-4 py-3 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo w-full"
          />
          <button
            type="submit"
            disabled={!password}
            className={`px-3 rounded-3xl font-scoreExtrabold text-md transition ease-in-out hover:cursor-pointer hover:scale-110 duration-300 w-full ${
              password
                ? 'text-white bg-main hover:bg-emerald hover:text-black'
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
