import React from 'react';

export default function Name() {
  const letters = ['냉', '장', '고', '　', '연', '금', '술', '사'];

  return (
    <div className=" bg-main flex items-center justify-center">
      <h1 className="text-5xl text-white font-bold">
        {letters.map((letter, index) => (
          <span
            key={index}
            className={`inline-block animate-bounce delay-${index}00 font-undong`}
            style={{ position: 'relative', top: '20px' }}
          >
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
}
