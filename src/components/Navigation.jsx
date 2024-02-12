import { React, useState } from 'react';
import { PiCookingPot, PiCookingPotFill } from 'react-icons/pi';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { IoAccessibilityOutline, IoAccessibility } from 'react-icons/io5';

export default function Navigation() {
  const [selected, setSelected] = useState('home');
  // 게시판, 프로필 페이지 만들어지면 Link 기능 추가하기
  return (
    <footer
      className="flex justify-center items-center bg-white p-4 rounded-t-3xl "
      style={{ boxShadow: '0px -10px 15px rgba(0, 0, 0, 0.1)' }}
    >
      <div
        style={{ position: 'relative' }}
        onClick={() => setSelected('food')}
        className={`mx-12 text-4xl text-main cursor-pointer ${
          selected === 'food' ? 'selected-icon' : ''
        }`}
      >
        {selected === 'food' ? <PiCookingPotFill /> : <PiCookingPot />}
      </div>
      <div
        style={{ position: 'relative' }}
        onClick={() => setSelected('home')}
        className={`mx-12 text-4xl text-main cursor-pointer ${
          selected === 'home' ? 'selected-icon' : ''
        }`}
      >
        {selected === 'home' ? <GoHomeFill /> : <GoHome />}
      </div>
      <div
        style={{ position: 'relative' }}
        onClick={() => setSelected('profile')}
        className={`mx-12 text-3xl text-main cursor-pointer ${
          selected === 'profile' ? 'selected-icon' : ''
        }`}
      >
        {selected === 'profile' ? (
          <IoAccessibility />
        ) : (
          <IoAccessibilityOutline />
        )}
      </div>
    </footer>
  );
}
