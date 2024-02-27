import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const TagInput = () => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue) {
      addTag();
      e.preventDefault();
    }
  };

  const addTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
      setInputValue('');
    }
  };

  const handleDelete = (indexToDelete) => {
    setTags(tags.filter((_, index) => index !== indexToDelete));
  };

  const handleNextButtonClick = () => {
    navigate("/gptresult")
    axios.post('http://localhost:3000/recipe/recommend', { ingredients: tags })
      .then(response => {
        console.log(response.data); 
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  

  return (
    <div className="bg-white min-h-screen px-4 py-8 flex flex-col">
      <div
        className="absolute top-5 left-45 ml-0 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate("/main")}
      >
        <FaArrowLeft />
      </div>
      <div className="max-w-xs mx-auto flex-1">
        <h2 className="text-3xl font-bold mb-6 mt-24 text-center">
          재료를 넣어주세요
        </h2>
        <div className="flex items-center border-b border-gray-300 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="무엇을 넣으시겠어요?  ↲" 
            className="appearance-none bg-transparent border-none w-full text-gray-700 py-4 px-2 leading-tight focus:outline-none"
          />
          <button
            className="bg-white hover:cursor-pointer text-lg text-black font-bold py-2 px-4 rounded-full flex items-center"
            onClick={addTag}
          >
            +
          </button>
        </div>
        <div className="flex flex-col items-center mb-8 w-full">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-full px-3 py-2 mt-2 text-sm font-semibold text-gray-700 my-1 flex items-center justify-between w-auto"
            >
              <span className="flex-1">{tag}</span>
              <button
                onClick={() => handleDelete(index)}
                className="text-gray-500 focus:outline-none focus:text-gray-600 ml-4"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-xs mx-auto pb-8">
        <button
          className="transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer text-white font-bold py-2 px-4 rounded w-full"
          type="button"
          onClick={handleNextButtonClick}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default TagInput;
