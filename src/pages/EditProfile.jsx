import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GoCheckCircle, GoCheckCircleFill } from 'react-icons/go';
import IMAGE_PROFILE from '../assets/img/img_profile.png';
import { IP_ADDRESS, useUserState } from '../context/UserContext';

export default function EditProfile() {
  const user = useUserState();

  const [nickName, setNickName] = useState(user.nickName); // 원래 닉네임
  const [changeNickName, setChangeNickName] = useState(''); // 새로 바꿀 닉네임
  const [nameError, setNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(
    localStorage.getItem('imageUrl') || IMAGE_PROFILE
  );

  const fileInput = useRef(null);

  const navigate = useNavigate();

  // 1️⃣ 처음에 보여줄 기본 유저 정보
  useEffect(() => {
    const fetchUserData = async () => {
      const URL = `${IP_ADDRESS}/profile`;
      const accessToken = localStorage.getItem('accessToken');

      try {
        const response = await axios.get(URL, {
          headers: {
            'Authorization-Access': accessToken,
          },
        });

        setNickName(response.data.nickName);
        setEmail(response.data.email);
      } catch (error) {
        console.error(`유저 데이터 불러오는 중 문제 발생 : ${error}`);
      }
    };

    fetchUserData();
  }, []);

  // input에 닉네임 수정 적용
  useEffect(() => {
    setChangeNickName(nickName);
  }, [nickName]);

  // 2️⃣ 이미지 파일 업로드
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = async () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
          await uploadImage(e.target.files[0]);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // 3️⃣ 프로필 이미지 저장하기
  const uploadImage = async (file) => {
    const URL = `${IP_ADDRESS}/change-profile`;
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();
    const nickNameBlob = new Blob([JSON.stringify({ nickName })], {
      type: 'application/json',
    });
    formData.append('nickName', nickNameBlob);
    formData.append('file', file);

    try {
      await axios.post(URL, formData, {
        headers: {
          'Authorization-Access': accessToken,
        },
      });
    } catch (error) {
      console.error('에러 내용:', error);
    }
  };

  // 4️⃣ 닉네임 유효성 검사
  const handleNameChange = (e) => {
    setChangeNickName(e.target.value);

    if (!e.target.value.match(/^[가-힣0-9]{2,}$|^[A-Za-z0-9]{3,}$/)) {
      setNameError('한글은 최소 2글자, 영문은 최소 3글자 이상 입력하세요');
    } else {
      setNameError(false);
    }
  };

  // 5️⃣ 닉네임 저장하기
  const handleSubmit = async (e) => {
    e.preventDefault();

    const URL = `${IP_ADDRESS}/change-nickname`;
    const accessToken = localStorage.getItem('accessToken');

    try {
      if (nameError === false) {
        await axios
          .post(
            URL,
            {
              presentNickName: nickName,
              changeNickName: changeNickName,
            },
            {
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization-Access': accessToken,
              },
            }
          )
          .then((result) => {
            console.log(`닉네임 재설정 성공 : ${result}`);
            window.alert('닉네임을 재설정 했습니다');
          });

        navigate('/mypage');
      }
    } catch (error) {
      console.error('닉네임 저장 중 에러 발생:', error);
    }
  };

  return (
    <section className="w-full h-screen bg-white">
      <div
        className="absolute top-5 left-42 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/mypage')}
      >
        <FaArrowLeft />
      </div>

      <header className="mt-20 font-semibold font-score text-2xl text-center">
        나의 프로필 수정
      </header>

      <main className="mt-6 text-center">
        <div className="relative inline-block rounded-full bg-gray-200 h-32 w-32">
          <img
            src={image}
            alt="프로필 사진"
            className="rounded-full h-32 w-32 object-cover border-2"
          />
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            onChange={handleImageChange}
            ref={fileInput}
            className="rounded-full absolute inset-0 w-full h-full opacity-0 cursor-pointer hover:opacity-50 duration-200 ease-out transition-opacity bg-gray-500"
          />
        </div>

        <form className="flex flex-col mt-8 mx-10" onSubmit={handleSubmit}>
          {/* 이메일 박스 */}
          <div className="flex-grow mr-3 mb-4">
            <label
              className="font-score block text-black-300 text-lg font-bold mb-2 text-start"
              htmlFor="email"
            >
              연결된 이메일
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              readOnly
            />
          </div>

          {/* 닉네임 박스 */}
          <div className="flex-grow mr-3 mb-2">
            <label
              className="font-score block text-black-300 text-lg font-bold mb-2 text-start"
              htmlFor="nickName"
            >
              닉네임
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nickName"
              type="text"
              value={changeNickName || nickName}
              onChange={handleNameChange}
            />
            {nameError ? (
              <p className="text-red-500 text-xs italic">{nameError}</p>
            ) : (
              <p className="text-red-500 text-xs italic invisible">nameError</p>
            )}
          </div>

          <p className="mt-6">
            <li className="mb-2 flex items-center">
              <span role="img" aria-label="check" className="flex">
                {!nameError ? (
                  <GoCheckCircleFill className="text-emerald" />
                ) : (
                  <GoCheckCircle className="text-emerald" />
                )}
              </span>{' '}
              <span className="ml-3">닉네임 사용 가능</span>
            </li>
          </p>

          {/* 버튼 */}
          <div className="flex mt-2 mr-3">
            <button
              type="submit"
              className="font-score flex-grow bg-main text-white rounded-2xl p-2 hover:bg-yellow-500"
            >
              닉네임 저장하기
            </button>
          </div>
        </form>
      </main>
    </section>
  );
}
