import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { CiSaveDown2 } from 'react-icons/ci';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IP_ADDRESS } from '../context/UserContext';

const GptSearch = () => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const accessToken = localStorage.getItem('accessToken');
  const nickname = localStorage.getItem('nickName') || '';

  const navigate = useNavigate();

  // 입력 값 변경 시 상태 업데이트
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Enter 키 입력 시 태그 추가
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  // 새 태그 추가 및 입력 필드 초기화
  const addTag = () => {
    if (inputValue.trim() !== '' && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
    inputRef.current.focus();
  };

  // 태그 삭제 - 배열에서 제거
  const handleDelete = (indexToDelete) => {
    setTags(tags.filter((_, index) => index !== indexToDelete));
    inputRef.current.focus();
  };

  // Gpt로 레시피 검색 요청하는 함수
  const handleNextButtonClick = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${IP_ADDRESS}/recipe/recommend`,
        {
          ingredients: tags,
        },
        {
          headers: {
            'Authorization-Access': accessToken,
          },
        }
      );

      console.log('서버 응답:', response.data);
      const recommendId = response.data;
      if (recommendId) {
        navigate(`/recipe/recommend/${recommendId}`);
      } else {
        console.error('recommendId를 찾을 수 없습니다.');
        toast.error('추천 레시피 생성에 실패했습니다..');
      }
    } catch (error) {
      console.error('에러내용:', error);
      console.log('에러 상태 코드:', error.response?.status);
      const statusCode = error.response?.status;
      if (statusCode === 400) {
        toast.error('입력된 재료가 없습니다. 재료를 입력해 주세요.');
      } else if (statusCode === 406) {
        toast.error('적절하지 못한 재료가 있습니다.');
      } else if (statusCode === 404) {
        toast.error('레시피가 존재하지 않습니다.');
      } else if (statusCode === 500) {
        toast.error('추천 레시피 생성에 실패했습니다.');
      } else {
        toast.error('서버와의 연결에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="flex flex-col items-center justify-center h-screen">
        <img
          src="https://media.discordapp.net/attachments/1197868473666248844/1213305395305652264/img_profile.png?ex=660772b4&is=65f4fdb4&hm=fa07101b219d5e41c1501989503c4255d4e8aaaae60a02a1f626e326ca970493&=&format=webp&quality=lossless&width=614&height=614"
          alt="로딩중"
          className="animate-bounce w-24 h-24 mb-4"
        />
        <h1 className=" font-score text-2xl font-bold text-gray-900 mb-4">
          로딩 중
        </h1>
        <button
          onClick={() => navigate('/main')}
          className=" font-score text-sm text-gray-400"
        >
          취소
        </button>
      </section>
    );
  }

  return (
    <section className="bg-white min-h-screen px-4 py-8 flex flex-col">
      <div
        className="absolute top-5 left-45 ml-0 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/main')}
      >
        <FaArrowLeft />
      </div>
      <main className="max-w-lg mx-auto flex-1">
        <h2 className=" font-score text-3xl font-bold mb-12 mt-32 text-center">
          냉장고 재료를 넣어주세요
        </h2>
        <div className="mr-10 ml-10 flex items-center border-b border-gray-300 mb-4">
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
          onClick={() => {
            if (!accessToken) {
              toast.error('로그인이 필요합니다.');
            } else {
              navigate('/recipe/myRecipe');
            }
          }}
        >
          <CiSaveDown2 className="mr-1 w-6 h-6" />
          {accessToken ? `${nickname}의 연금술 레시피` : '저장된 연금술 레시피'}
        </button>
        <button
          className="font-score text-xl transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer text-white font-bold py-3 px-4 rounded w-full"
          type="button"
          onClick={handleNextButtonClick}
        >
          연금술 시작하기
        </button>
      </footer>
    </section>
  );
};

export default GptSearch;
