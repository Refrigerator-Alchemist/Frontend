import { React, useState } from 'react';
import { PiCookingPot, PiCookingPotFill } from 'react-icons/pi';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { IoAccessibilityOutline, IoAccessibility } from 'react-icons/io5';

export default function Navigation() {
  const [selected, setSelected] = useState('home');
  return (
    <footer className="flex justify-center items-center bg-white p-4 rounded-t-lg drop-shadow-lg">
      <div
        onClick={() => setSelected('food')}
        className="mx-8 text-5xl text-main cursor-pointer"
      >
        {selected === 'food' ? <PiCookingPotFill /> : <PiCookingPot />}
      </div>
      <div
        onClick={() => setSelected('home')}
        className="mx-8 text-5xl text-main cursor-pointer"
      >
        {selected === 'home' ? <GoHomeFill /> : <GoHome />}
      </div>
      <div
        onClick={() => setSelected('profile')}
        className="mx-8 text-5xl text-main cursor-pointer"
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
