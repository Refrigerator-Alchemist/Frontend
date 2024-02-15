import React from 'react';

export default function SignUp() {
  return (
    <div>
      <h1>새로운 가입</h1>
      <h2>필수 정보를 입력해야 합니다</h2>
      <input placeholder="이메일을 입력하세요" />
      <input placeholder="비밀번호를 입력하세요" />
      <span>비밀번호 설정 시 주의!</span>
      <p>영문, 숫자, 특수문자를 최소 1자씩 사용</p>
      <p>전체 글자 수가 최소 8자 이상</p>
      <span>인증번호 입력</span>
      <span>입력한 이메일에 발송된 인증번호를 입력해주세요.</span>
    </div>
  );
}
