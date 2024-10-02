import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = ({ showScrollToTop, scrollToTop }) => {
  return (
    showScrollToTop && (
      <button
        onClick={scrollToTop}
        title='위로 가기'
        aria-label="맨 위로 가기"
        className="fixed bottom-5 right-5 md:bottom-10 md:right-10 p-3 rounded-full bg-main text-white shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main"
      >
        <FaArrowUp className="text-xl" />
      </button>
    )
  );
};

export default ScrollToTop;
