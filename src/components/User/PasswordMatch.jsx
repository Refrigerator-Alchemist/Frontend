import React from 'react';

export default function PasswordMatch({ passwordMessage }) {
  return (
    <p
      className={`text-sm pl-3 mt-1 ${
        passwordMessage === null
          ? ''
          : passwordMessage
            ? 'text-green-500'
            : 'text-red-500'
      }`}
    >
      {passwordMessage === null
        ? '\u00A0'
        : passwordMessage
          ? '비밀번호가 일치합니다'
          : '비밀번호가 일치하지 않습니다'}
    </p>
  );
}
