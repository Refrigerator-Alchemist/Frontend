import React from 'react';
import LOGO from '/assets/img/logo.webp';
import LOGO_TRANS from '/assets/img/logo_transparent.webp';

export default function Logo({ page, width, height }) {
  if (page === 'start') {
    return (
      <>
        <img
          src={LOGO}
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
          src={LOGO_TRANS}
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
