import React from 'react';

export default function AccountHeader({ title, mention }) {
  return (
    <header className="flex flex-col items-center mt-10">
      <h1 className="font-score text-3xl">{title}</h1>
      <p className="font-score text-md text-gray-400 mt-2">{mention}</p>
    </header>
  );
}
