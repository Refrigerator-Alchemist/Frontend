import React, { useContext, useEffect } from 'react';
import { PiCookingPot, PiCookingPotFill } from 'react-icons/pi';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { IoAccessibilityOutline, IoAccessibility } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';

import { NavigationContext } from '../context/NavigationContext';
import { useUserState } from '../context/User';

export default function Navigation() {
  const { selected, setSelected } = useContext(NavigationContext);
  const { user } = useUserState();
  const navigate = useNavigate();
  const location = useLocation();

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
          navigate(user ? '/mypage' : '/login'); // 로그인에 따라 경로가 바뀜
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
