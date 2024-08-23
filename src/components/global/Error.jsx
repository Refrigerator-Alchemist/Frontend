import React from 'react';
import Logo from '../../components/Global/Logo';
import BackButton from '../../components/Global/BackButton';

export default function Error() {
  return (
    <section className="relative flex flex-col items-center justify-center h-screen">
      <BackButton destination={-1} />
      <h1 className="text-xl font-score">
        에러가 발생했습니다 🚫 자세한 내용은 개발자 도구를 확인하세요
      </h1>
      <Logo page="start" width="550px" height="550px" />
    </section>
  );
}
