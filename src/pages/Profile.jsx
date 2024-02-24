import React, { useState, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(''); 
  const [nameError, setNameError] = useState('');
  const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

  const fileInput = useRef(null);

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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="bg-white h-screen">
      <div
        className="absolute top-5 left-42 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/mypage')}
      >
        <FaArrowLeft />
      </div>
      <div className="text-center mt-28">
        <div className="inline-block rounded-full bg-gray-200 h-32 w-32 relative">
          <img src={image} alt="프로필 사진" className="rounded-full h-32 w-32 object-cover" />
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleImageChange}
            ref={fileInput}
          />
        </div>
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
                value={name}
                onChange={handleNameChange}
              />
              {nameError && <p className="text-red-500 text-xs italic">{nameError}</p>}
            </div>
            
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start"
              htmlFor="userbio"
            >
              소개
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="userbio"
              placeholder="소개"
            ></textarea>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-start"
              htmlFor="email"
            >
              연결된 계정
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              // placeholder="email@example.com"
            />
          </div>
          <div className="flex mt-10">
            <button
              type="button"
              className="flex-grow h-12 bg-gray-300 rounded-2xl p-2 mr-2  hover:bg-gray-400"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-grow bg-main  text-white rounded-2xl p-2 hover:bg-yellow-500"
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
