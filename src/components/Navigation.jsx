import { React, useState } from 'react';
import { PiCookingPot, PiCookingPotFill } from 'react-icons/pi';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { IoAccessibilityOutline, IoAccessibility } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const [selected, setSelected] = useState('home');
  const navigate = useNavigate();

  return (
    <footer
      className="flex justify-center items-center bg-white p-4 rounded-t-3xl"
      style={{ boxShadow: '0px -10px 15px rgba(0, 0, 0, 0.1)' }}
    >
      <div
        style={{ position: 'relative' }}
        onClick={() => {
          setSelected('food');
          // navigate('/board');
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
          navigate('/');
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
