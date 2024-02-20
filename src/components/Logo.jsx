import React from 'react';
import logo from '../img/logo.png';

export default function Logo({ width, height }) {
  return (
    <>
      <img
        src={logo}
        alt="logo"
        width={width}
        height={height}
        className="mb-4 hover:rotate-12 hover:scale-110 transition-all ease-in-out duration-300"
      ></img>
    </>
  );
}
