import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <span>아직 완성하지 않은 페이지이거나 에러가 발생했습니다😅</span>
      <div>
        <Link to="/main" className="underline italic">
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
