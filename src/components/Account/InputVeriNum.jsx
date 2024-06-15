import React from 'react';

export default function InputVeriNum({
  email,
  handleEmailChange,
  requestVerifying,
  selectOption,
  inputNum,
  setInputNum,
  checkVerifying,
}) {
  return (
    <>
      {/* 이메일 확인 & 인증 요청*/}
      <div>
        <label className="mb-4 text-lg font-bold font-undong text-center ">
          이메일
        </label>
        <div className="flex">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-4 py-3 mt-2 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo"
            placeholder="이메일"
          />
          <button
            onClick={requestVerifying}
            className="inline-block whitespace-nowrap h-12 px-6 ml-5 mt-2 text-white bg-main rounded-3xl font-scoreExtrabold font-extrabold text-xl transition ease-in-out hover:cursor-pointer hover:scale-110 hover:bg-indigo duration-300"
          >
            인증 요청
          </button>
        </div>
        <p
          className={`text-red-500 text-sm pl-3 mt-1 ${
            selectOption ? 'visible' : 'invisible'
          }`}
        >
          {selectOption || 'empty'}
        </p>
      </div>

      {/* 인증 확인 */}
      <div className="mt-6">
        <label className="mb-4 text-lg font-bold font-undong text-center">
          인증번호
        </label>
        <div className="flex items-center justify-between">
          <div className="flex max-w-xs mt-2">
            <input
              id="input"
              value={inputNum}
              type="tel"
              maxLength="4"
              placeholder="????"
              onChange={(e) => {
                if (
                  e.target.value === '' ||
                  (!isNaN(e.target.value) && e.target.value.length <= 4)
                ) {
                  setInputNum(e.target.value);
                }
              }}
              className="w-40 h-12 mx-1 text-center border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo"
            />
          </div>
          <button
            onClick={checkVerifying}
            className="inline-block whitespace-nowrap h-12 px-6 ml-5 mt-2 text-white bg-main rounded-3xl font-scoreExtrabold font-extrabold text-xl transition ease-in-out hover:cursor-pointer hover:scale-110 hover:bg-indigo duration-300"
          >
            인증 확인
          </button>
        </div>
      </div>
    </>
  );
}
