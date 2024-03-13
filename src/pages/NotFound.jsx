import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl">완성되지 않았거나 없는 페이지입니다😅</h1>
      <div className="mt-4">
        <Link to="/main" className="underline italic hover:text-red-500">
          메인페이지로 돌아가기
        </Link>
      </div>
    </section>
  );
}
