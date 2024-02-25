import React, { useContext, useEffect } from 'react';
import { PiCookingPot, PiCookingPotFill } from 'react-icons/pi';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { IoAccessibilityOutline, IoAccessibility } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';

import { NavigationContext } from '../context/NavigationContext';

export default function Navigation() {
  const { selected, setSelected } = useContext(NavigationContext);
  const navigate = useNavigate();
  const location = useLocation();

  // 라우팅으로 마운트가 일어날 때마다 저장된 값대로 네비게이션 표시
  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath === '/board') {
      setSelected('food');
    } else if (currentPath === '/main') {
      setSelected('home');
    } else if (currentPath === '/login') {
      setSelected('profile');
    }
  }, [location.pathname, setSelected]);

  // Context 만들어지면 isLogin일 때 'profile' 선택하면 /mypage로 라우팅
  // navigate({ isLogin ? '/mypage' : '/login' })

  return (
    <footer
      className="sticky bottom-0 flex justify-center items-center bg-white p-4 rounded-t-3xl "
      style={{ boxShadow: '0px -10px 15px rgba(0, 0, 0, 0.1)' }}
    >
      <div
        style={{ position: 'relative' }}
        onClick={() => {
          setSelected('food');
          navigate('/board');
        }}
        className={`mx-12 text-4xl text-main cursor-pointer ${
          selected === 'food' ? 'selected-icon' : ''
        }`}
      >
        {selected === 'food' ? <PiCookingPotFill /> : <PiCookingPot />}
      </div>
      <div
        style={{ position: 'relative' }}
        onClick={() => {
          setSelected('home');
          navigate('/main');
        }}
        className={`mx-12 text-4xl text-main cursor-pointer ${
          selected === 'home' ? 'selected-icon' : ''
        }`}
      >
        {selected === 'home' ? <GoHomeFill /> : <GoHome />}
      </div>
      <div
        style={{ position: 'relative' }}
        onClick={() => {
          setSelected('profile');
          navigate('/login');
        }}
        className={`mx-12 text-4xl text-main cursor-pointer ${
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
