import React from 'react';
import { Link } from 'react-router-dom';
import { PiPencilSimpleLine } from 'react-icons/pi';

const WriteButton = () => {
  return (
    <Link
      to="/board/upload"
      className="bg-gray-50 ml-3 flex items-center justify-center rounded-full p-3 shadow write-button transition-transform duration-200 hover:scale-110 hover:bg-gray-200"
    >
      <PiPencilSimpleLine style={{ fontSize: '26px' }} />
    </Link>
  );
};

export default WriteButton;
