import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function ManageAccount({ userInfo, updateUser, deleteUser }) {
  const onUpdate = (e) => {
    e.preventDefault();

    const form = e.target;
    const userEmail = form.userEmail.value;
    const password = form.password.value;
    const name = form.name.value;

    updateUser({ userEmail, password, name });
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
      <h1 className="text-3xl font-extrabold mb-5">회원정보 수정</h1>

      {/* 회원정보 입력 */}
      <form
        className="flex flex-col items-center"
        onSubmit={(e) => onUpdate(e)}
      >
        <div>
          <label className="ml-2 font-score text-lg text-gray-400">
            이메일을 입력해주세요
          </label>
          <input
            type="email"
            placeholder="이메일"
            className="px-4 py-3 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            readOnly
            defaultValue={userInfo?.userEmail}
          />
        </div>

        <div>
          <label className="ml-2 font-score text-lg text-gray-400">
            비밀번호를 입력해주세요
          </label>
          <input
            type="password"
            placeholder="비밀번호"
            className="px-4 py-3 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="ml-2 font-score text-lg text-gray-400">
            닉네임을 입력해주세요
          </label>
          <input
            type="text"
            placeholder="닉네임"
            className="px-4 py-3 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
            defaultValue={userInfo?.name}
          />
        </div>

        <button
          type="submit"
          className="mt-3 ml-5 text-white bg-main rounded-3xl font-jua text-xl transition ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-[#15ed79] hover:text-black duration-300"
        >
          수정하기
        </button>

        <button
          type="button"
          className="mt-3 ml-5 text-white bg-main rounded-3xl font-jua text-xl transition ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-[#15ed79] hover:text-black duration-300"
          onClick={() => deleteUser(userInfo.userEmail)}
        >
          탈퇴하기
        </button>
      </form>
    </div>
  );
}
