import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(''); 
  const [nameError, setNameError] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!e.target.value.match(/^[가-힣]{2,}|[A-Za-z]{3,}$/)) {
      setNameError('최소 한글 2 글자, 영문 3글자 이상 입력해주세요.(공백, 이모티콘 X)');
    } else {
      setNameError('');
    }
  };

  const handleSubmit = (e) => {
    // 이름 저장 로직 
  };
  return (
    <div className="bg-white h-screen">
      <div className="p-4 flex items-center">
        <FaArrowLeft
          onClick={() => navigate(-1)}
          className="text-gray-800 text-2xl cursor-pointer"
        />
      </div>
      <div className="text-center mt-4">
        <div className="inline-block rounded-full bg-gray-200 h-24 w-24 "></div>
        <h2 className="text-xl font-semibold mt-4">나의 프로필 수정</h2>
        <form className="mt-8 px-10" onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <div className="flex-grow mr-3">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 text-start"
                htmlFor="username"
              >
                이름
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="이름"
                value={name}
                onChange={handleNameChange}
                disabled={!isEditing}
              />
              {nameError && (
                <p className="text-red-500 text-xs italic">{nameError}</p>
              )}
            </div>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-600 text-white font-bold mt-7 py-2 px-4 rounded focus:outline-none focus:shadow-outline flex-shrink-0"
              onClick={handleEditClick}
            >
              수정하기
            </button>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start"
              htmlFor="userbio"
            >
              소개
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="userbio"
              placeholder="소개"
            ></textarea>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start"
              htmlFor="email"
            >
              연락처
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="email@example.com"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="flex-grow bg-gray-300 rounded-full p-2 hover:bg-gray-400"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-grow bg-yellow-400  text-white rounded-full p-2 hover:bg-yellow-500"
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
