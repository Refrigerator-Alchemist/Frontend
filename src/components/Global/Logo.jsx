import React from 'react';
import logo from '/assets/img/logo.webp';
import logo_transparent from '/assets/img/logo_transparent.webp';

export default function Logo({ page, width, height }) {
  if (page === 'start') {
    return (
      <>
        <img
          src={logo}
          alt="logo"
          width={width}
          height={height}
          className="mb-4 hover:rotate-12 hover:scale-110 transition-all ease-in-out duration-300"
          onContextMenu={(e) => e.preventDefault()}
        ></img>
      </>
    );
  }

  if (page === 'login') {
    return (
      <>
        <img
          src={logo_transparent}
          alt="logo"
          width={width}
          height={height}
          className="mb-4 hover:rotate-12 hover:scale-110 transition-all ease-in-out duration-300"
          onContextMenu={(e) => e.preventDefault()}
        ></img>
      </>
    );
  }
}
