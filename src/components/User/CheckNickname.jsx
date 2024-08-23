import React from 'react';

export default function CheckNickname({
  nickName,
  setNickName,
  isDuplicated,
  nameError,
}) {
  return (
    <div>
      <label className="mb-4 text-md font-bold font-undong text-center">
        닉네임
      </label>
      <div className="flex flex-col mb-6 justify-between">
        <div className="flex">
          <input
            type="text"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            placeholder="닉네임"
            className="w-full px-4 py-3 mt-2 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo"
          />
          <button
            onClick={isDuplicated}
            className="inline-block h-12 px-6 ml-5 mt-2 whitespace-nowrap text-white font-scoreExtrabold font-extrabold text-xl bg-main rounded-3xl transition ease-in-out hover:cursor-pointer hover:scale-110 hover:bg-indigo duration-300"
          >
            중복 확인
          </button>
        </div>
        <p
          className={`text-red-500 text-sm pl-3 mt-1 ${
            nameError ? 'visible' : 'invisible'
          }`}
        >
          {nameError || 'empty'}
        </p>
      </div>
    </div>
  );
}
