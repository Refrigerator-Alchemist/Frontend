import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>아직 완성하지 않은 페이지이거나 에러가 발생했습니다😅</h1>
      <div className="mt-4">
        <Link to="/main" className="underline italic">
          메인페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
}
