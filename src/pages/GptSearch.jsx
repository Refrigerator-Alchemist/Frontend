import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { CiSaveDown2 } from 'react-icons/ci';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserState } from '../context/UserContext';

const TagInput = () => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const user = useUserState(); // 사용자 정보 가져오기

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
    toast.error('임시 에러 메시지. API 연결 전 UI 확인용.');
    try {
      const response = await axios.post(
        'http://localhost:8080/recipe/recommend',
        {
          ingredients: tags,
        }
      );

      console.log('서버 응답:', response.data);

      const recommendId = response.data;

      if (recommendId) {
        navigate(`/recipe/recommend/${recommendId}`);
      } else {
        console.error('recommendId를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('에러내용:', error);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            toast.error('입력된 재료가 없습니다. 재료를 입력해 주세요.');
            break;
          case 400:
            toast.error('recommendId를 찾을 수 없습니다.');
            break;
          case 406:
            toast.error('적절하지 못한 재료가 있습니다.');
            break;
          case 500:
            toast.error('추천 레시피 생성에 실패했습니다.');
            break;
          default:
            toast.error('알 수 없는 에러가 발생했습니다.');
        }
      } else {
        toast.error('서버와의 연결에 실패했습니다.');
      }
    }
  };

  return (
    <section className="bg-white min-h-screen px-4 py-8 flex flex-col">
      <ToastContainer position="top-center" />
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
      </main>
      <footer className="w-full max-w-xs mx-auto pb-8">
        <button
          className="flex justify-center font-score transition ease-in-out delay-150 text-black bg-white hover:bg-white hover:scale-125 hover:cursor-pointer font-bold py-2 px-4 rounded w-full mb-4"
          type="button"
          onClick={() => navigate('/recipe/myRecipe')}
        >
          <CiSaveDown2 className="mr-1 w-6 h-6" />
          {`${user.nickName}의 연금술 레시피`}
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
