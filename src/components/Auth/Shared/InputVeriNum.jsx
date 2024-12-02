import React from 'react';

export default function InputVeriNum({
  email,
  handleEmailChange,
  handleRequest,
  selectOption,
  inputNum,
  setInputNum,
  handleVerification,
}) {
  const labelStyle = 'mb-4 text-lg font-bold font-undong text-center';
  return (
    <>
      <div>
        <label className={labelStyle}>이메일</label>
        <div className="flex">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-4 py-3 mt-2 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo"
            placeholder="이메일"
          />
          <button type="button" onClick={handleRequest} className="btn">
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
      <div className="mt-6">
        <label className={labelStyle}>인증번호</label>
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
          <button type="button" onClick={handleVerification} className="btn">
            인증 확인
          </button>
        </div>
      </div>
    </>
  );
}
