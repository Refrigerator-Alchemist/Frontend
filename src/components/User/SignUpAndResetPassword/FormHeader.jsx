import React from 'react';

export default function FormHeader({ title, mention }) {
  return (
    <header className="flex flex-col items-center mt-10">
      <h1 className="font-score text-3xl">{title}</h1>
      <p className="font-score text-xs text-gray-400 mt-5">{mention}</p>
    </header>
  );
}
