import React from 'react';

export default function Error() {
  return (
    <section className="relative flex flex-col items-center justify-center h-60">
      <span className="text-xl font-score">에러가 발생했습니다 🚫</span>
      <span className="text-xl font-score">
        자세한 내용은 개발자 도구를 확인하세요
      </span>
    </section>
  );
}
