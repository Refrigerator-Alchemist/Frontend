import React, { useContext, useEffect } from 'react';
import { PiCookingPot, PiCookingPotFill } from 'react-icons/pi';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { IoAccessibilityOutline, IoAccessibility } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';

import { NavigationContext } from '../../context/NavigationContext';
import { useUserState } from '../../context/UserContext';

export default function Navigation() {
  const { selected, setSelected } = useContext(NavigationContext);
  const { user } = useUserState();

  const navigate = useNavigate();
  const location = useLocation();

  const iconStyle = `mx-12 text-4xl text-main cursor-pointer hover:text-main-dark hover:scale-110 transition-all duration-300`;

  useEffect(() => {
    const currentPath = location.pathname;

    if (
      currentPath === '/board' ||
      currentPath.startsWith('/board/') ||
      currentPath === '/GptSavedList' ||
      currentPath.startsWith('/GptSavedList/')
    ) {
      setSelected('food');
    } else if (
      currentPath === '/main' ||
      currentPath.startsWith('/recipe/myRecipe')
    ) {
      setSelected('home');
    } else if (currentPath === '/login' || currentPath.startsWith('/mypage')) {
      setSelected('profile');
    }
  }, [location.pathname, setSelected]);

  return (
    <div
      className="sticky bottom-0 flex justify-center items-center bg-white p-5 rounded-t-3xl"
      style={{ boxShadow: '0px -10px 15px rgba(0, 0, 0, 0.1)' }}
    >
      <div
        style={{ position: 'relative' }}
        onClick={() => {
          setSelected('food');
          navigate('/board');
        }}
        className={`${iconStyle} ${selected === 'food' ? 'selected-icon' : ''}`}
      >
        {selected === 'food' ? <PiCookingPotFill /> : <PiCookingPot />}
      </div>
      <div
        style={{ position: 'relative' }}
        onClick={() => {
          setSelected('home');
          navigate('/main');
        }}
        className={`${iconStyle} ${selected === 'home' ? 'selected-icon' : ''}`}
      >
        {selected === 'home' ? <GoHomeFill /> : <GoHome />}
      </div>
      <div
        style={{ position: 'relative' }}
        onClick={() => {
          setSelected('profile');
          // ▶️ 로그인에 따라 경로가 바뀜
          navigate(
            user || localStorage.getItem('nickName') ? '/mypage' : '/login'
          );
        }}
        className={`${iconStyle} ${
          selected === 'profile' ? 'selected-icon' : ''
        }`}
      >
        {selected === 'profile' ? (
          <IoAccessibility />
        ) : (
          <IoAccessibilityOutline />
        )}
      </div>
    </div>
  );
}
