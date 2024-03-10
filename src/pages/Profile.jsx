import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [text, setText] = useState('');
  const [connectedAccount, setConnectedAccount] = useState('');
  const [image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );

  const fileInput = useRef(null);

  useEffect(() => {
    // 기존 사용자 정보 불러오기
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/기존 사용자정보'
        );
        const userData = response.data;
        setName(userData.name);
        setText(userData.text);
        setConnectedAccount(userData.connectedAccount);
      } catch (error) {
        console.error('에러 내용:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!e.target.value.match(/^[가-힣]{2,}|[A-Za-z]{3,}$/)) {
      setNameError(
        '최소 한글 2 글자, 영문 3글자 이상 입력해주세요.(공백, 이모티콘 X)'
      );
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

  //정보 수정 후 저장
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('text', text);
      formData.append('image', fileInput.current.files[0]);

      await axios.post('http://localhost:3000/수정된 프로필', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsEditing(false);
    } catch (error) {
      console.error('에러 내용:', error);
    }
    navigate('/mypage');
  };

  return (
    <div className="bg-white h-screen">
      <div
        className="absolute top-5 left-42 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/mypage')}
      >
        <FaArrowLeft />
      </div>
      <div className="text-center mt-20">
        {/* <h2 className="font-score text-xl font-semibold mt-1 mb-8">나의 프로필 수정</h2> */}
        <div className="inline-block rounded-full bg-gray-200 h-32 w-32 relative">
          <img
            src={image}
            alt="프로필 사진"
            className="rounded-full h-32 w-32 object-cover"
          />
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleImageChange}
            ref={fileInput}
          />
        </div>

        <form className="mt-8 px-10" onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <div className="flex-grow mr-3">
              <label
                className="font-score block text-gray-700 text-sm font-bold mb-2 text-start"
                htmlFor="username"
              >
                닉네임
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                value={name}
                onChange={handleNameChange}
              />
              {nameError && (
                <p className="text-red-500 text-xs italic">{nameError}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label
              className="font-score block text-gray-700 text-sm font-bold mb-2 text-start"
              htmlFor="email"
            >
              연결된 이메일
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={connectedAccount}
              readOnly // 읽기 전용
            />
          </div>
          <div className="flex mt-10">
            <button
              type="button"
              className="font-score flex-grow h-12 bg-gray-300 rounded-2xl p-2 mr-2  hover:bg-gray-400"
            >
              취소
            </button>
            <button
              type="submit"
              className="font-score flex-grow bg-main  text-white rounded-2xl p-2 hover:bg-yellow-500"
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
