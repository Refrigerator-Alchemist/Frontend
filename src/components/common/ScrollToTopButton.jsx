import { FaArrowUp } from 'react-icons/fa';
import React from 'react';

const ScrollToTopButton = ({ showScrollToTop, scrollToTop }) => {
  return (
    showScrollToTop && (
      <button
        name="위로 가기"
        aria-label="위로 가기"
        onClick={scrollToTop}
        className="fixed bottom-20 mb-6 right-5 p-3 rounded-full bg-main text-white shadow-lg transition-transform duration-300 hover:scale-110"
      >
        <FaArrowUp className="text-xl" />
      </button>
    )
  );
};

export default ScrollToTopButton;
