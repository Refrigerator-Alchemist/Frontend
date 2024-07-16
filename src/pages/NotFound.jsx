import React from 'react';
import Logo from '../components/ui/Logo';
import BackButton from '../components/ui/BackButton';

export default function NotFound() {
  return (
    <section className="relative flex flex-col items-center justify-center h-screen">
      <BackButton destination={'/main'} />
      <h1 className="text-xl font-score">
        잘못된 경로입니다! 뒤로가기를 눌러주세요:)
      </h1>
      <Logo page="start" width="550px" height="550px" />
    </section>
  );
}
