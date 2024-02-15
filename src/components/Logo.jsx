import React from 'react';
import logo from '../img/logo.png';

export default function Logo({ width, height }) {
  return (
    <>
      <img src={logo} alt="logo" width={width} height={height}></img>
    </>
  );
}
