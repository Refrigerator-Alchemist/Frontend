import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PiCookingPot, PiCookingPotFill } from 'react-icons/pi';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { IoAccessibilityOutline, IoAccessibility } from 'react-icons/io5';
import NavbarIcon from './NavbarIcon';

export default function Navbar() {
  const [selected, setSelected] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const iconStyle = `relative mx-12 text-4xl text-main cursor-pointer hover:text-main-dark hover:scale-110 transition-all duration-300`;

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.startsWith('/board')) {
      setSelected('board');
    } else if (
      currentPath === '/main' ||
      currentPath.startsWith('/recipe/myRecipe')
    ) {
      setSelected('main');
    } else if (currentPath === '/login' || currentPath.startsWith('/mypage')) {
      setSelected('mypage');
    }
  }, [location.pathname, setSelected]);

  return (
    <div className="sticky bottom-0 p-5 rounded-t-3xl shadow-[0px_-0.625rem_0.938rem_rgba(0,0,0,0.1)] bg-white flex justify-center items-center">
      <NavbarIcon
        iconStyle={iconStyle}
        selected={selected}
        onClick={() => {
          setSelected('board');
          navigate('/board');
        }}
        type="board"
        icon={<PiCookingPot />}
        activeIcon={<PiCookingPotFill />}
      />
      <NavbarIcon
        iconStyle={iconStyle}
        selected={selected}
        onClick={() => {
          setSelected('main');
          navigate('/main');
        }}
        type="main"
        icon={<GoHome />}
        activeIcon={<GoHomeFill />}
      />
      <NavbarIcon
        iconStyle={iconStyle}
        selected={selected}
        onClick={() => {
          setSelected('mypage');
          navigate(localStorage.getItem('accessToken') ? '/mypage' : '/login');
        }}
        type="mypage"
        icon={<IoAccessibilityOutline />}
        activeIcon={<IoAccessibility />}
      />
    </div>
  );
}
