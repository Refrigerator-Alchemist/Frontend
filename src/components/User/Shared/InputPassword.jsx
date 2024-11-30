import { GoEye, GoEyeClosed } from 'react-icons/go';
import React from 'react';

export default function InputPassword({
  showPassword,
  password,
  setPassword,
  toggleShowPassword,
  checkPassword,
  setCheckPassword,
  isSamePassword,
}) {
  const inputStyle =
    'w-full px-4 py-3 mt-2 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo';
  const labelStyle = 'text-md font-bold font-undong text-center';

  return (
    <div>
      <label className={`mb-4 ${labelStyle}`}>비밀번호</label>
      <div className="flex mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className={inputStyle}
        />
        <button
          onClick={toggleShowPassword}
          className="inline-block whitespace-nowrap h-12 ml-5 mt-2 rounded-xl font-score text-md hover:text-red-500"
        >
          {showPassword ? <GoEye /> : <GoEyeClosed />}
        </button>
      </div>
      <label className={`flex ${labelStyle}`}>비밀번호 확인</label>
      <div className="flex">
        <input
          type="password"
          value={checkPassword}
          onChange={(e) => {
            setCheckPassword(e.target.value);
            isSamePassword();
          }}
          placeholder="한 번 더 입력하세요"
          className={inputStyle}
        />
      </div>
    </div>
  );
}
