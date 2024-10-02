import React, { useState } from 'react';
import axios from 'axios';
import ICON_SEARCHING from '/assets/img/search.webp';
import { IP_ADDRESS, useUserApi } from '../../context/UserContext';

const accessToken = localStorage.getItem('accessToken');

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { handleError } = useUserApi();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleSearchClick = async () => {
    if (query.trim() !== '') {
      try {
        const response = await axios.get(
          `${IP_ADDRESS}/board/searchTitle?title=${query.trim()}`,
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              Accept: 'application/json',
              'Authorization-Access': accessToken,
            },
          }
        );
        if (response.data && Array.isArray(response.data.items)) {
          const formattedData = response.data.items.map((item) => ({
            id: item.ID,
            title: item.title,
            description: item.description,
            imageUrl: item.imageUrl,
            likeCount: item.likeCount,
          }));
          onSearch(formattedData);
        } else {
          console.error('검색결과가 배열이 아닙니다', response.data);
        }
        setQuery('');
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <div className="font-score flex-grow flex items-center rounded-full bg-gray-50 p-1 shadow">
      <input
        className="w-full pl-2 py-2 text-sm focus:outline-none bg-gray-50"
        title="검색"
        aria-label="검색"
        type="text"
        placeholder="검색"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button
        className="flex items-center justify-center hover:bg-gray-200 px-3 py-2 rounded-full"
        onClick={handleSearchClick}
        style={{ minWidth: '40px', height: '40px', borderRadius: '30px' }}
      >
        <img
          src={ICON_SEARCHING}
          alt="검색아이콘"
          className="w-7 h-6"
          style={{ opacity: 0.5 }}
        />
      </button>
    </div>
  );
};

export default SearchBar;
