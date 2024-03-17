import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { CiSaveDown2 } from 'react-icons/ci';
import axios from 'axios';

const TagInput = () => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null); // 입력란 참조

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      addTag();
      e.preventDefault();
    }
  };

  const addTag = () => {
    if (inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
    inputRef.current.focus();
  };

  const handleDelete = (indexToDelete) => {
    setTags(tags.filter((_, index) => index !== indexToDelete));
    inputRef.current.focus();
  };

  

  const handleNextButtonClick = async () => {
    try {
      const response = await axios.post(
        "http://172.30.1.42:8080/recipe/recommend",
        {
          ingredients: tags,
        }
      );
  
      console.log("서버 응답:", response.data);
  
      const recommendId = response.data;
  
      if (recommendId) {
        navigate(`/recipe/recommend/${recommendId}`);
      } else {
        console.error("recommendId를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error('에러내용:', error);
      if (error.response && error.response.status === 400) {
        console.error("잘못된 요청입니다.");
        handleNextButtonClick();
      } else {
        console.error('에러내용:', error);
      }
    }
  };

  return (
    <section className="bg-white min-h-screen px-4 py-8 flex flex-col">
      <div
        className="absolute top-5 left-45 ml-0 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/main')}
      >
        <FaArrowLeft />
      </div>
      <main className="max-w-xs mx-auto flex-1">
        <h2 className=" font-score text-3xl font-bold mb-6 mt-24 text-center">
          재료를 넣어주세요
        </h2>
        <div className="flex items-center border-b border-gray-300 mb-4">
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="무엇을 넣으시겠어요?  ↲"
            className="font-score  appearance-none bg-transparent border-none w-full text-gray-700 py-4 px-2 leading-tight focus:outline-none"
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
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
        )}
      </main>
      <footer className="w-full max-w-xs mx-auto pb-8">
        <button
          className="flex justify-center font-score transition ease-in-out delay-150 text-black bg-white hover:bg-white hover:scale-125 hover:cursor-pointer font-bold py-2 px-4 rounded w-full mb-4"
          type="button"
          onClick={() => navigate('/recipe/myRecipe')}
        >
          <CiSaveDown2 className="mr-1 w-6 h-6" />
          나의 연금술 레시피
        </button>
        <button
          className="font-score transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer text-white font-bold py-2 px-4 rounded w-full"
          type="button"
          onClick={handleNextButtonClick}
        >
          연금술 시작하기 
        </button>
      </footer>
    </section>
  );
};

export default TagInput;