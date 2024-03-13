import React from 'react';

const Pagination = ({ currentPage, recipesPerPage, totalRecipes, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination flex justify-center my-4 mb-24">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-4 py-2 border rounded-full m-1 ${
            currentPage === number ? 'bg-main text-white' : 'bg-white text-main'
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
