import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IP_ADDRESS, useUserApi } from '../context/UserContext';
import { toast } from 'react-toastify';
import { GoCheckCircle, GoCheckCircleFill } from 'react-icons/go';
import IMAGE_PROFILE from '../assets/img/img_profile.png';
import BackButton from '../components/UI/BackButton';

export default function EditProfile() {
  const fileInput = useRef(null);
  const { handleError } = useUserApi();
  const navigate = useNavigate();
  const nickName = localStorage.getItem('nickName') || '';
  const email = localStorage.getItem('email') || '';
  const accessToken = localStorage.getItem('accessToken');
  const [imageUrl, setImageUrl] = useState(
    localStorage.getItem('imageUrl') || IMAGE_PROFILE
  );
  const [nameError, setNameError] = useState(false);
  const [changeNickName, setChangeNickName] = useState(nickName);

  useEffect(() => {
    const checkTokenExpired = async () => {
      try {
        await axios.get(`${IP_ADDRESS}/reset/info`, {
          headers: {
            'Authorization-Access': accessToken,
          },
        });
      } catch (error) {
        handleError(error);
      }
    };
    checkTokenExpired();
    setChangeNickName(nickName);
  }, [handleError, accessToken, nickName]);

  /** 프로필 이미지 선택 */
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = async () => {
        if (reader.readyState === 2) {
          setImageUrl(reader.result);
          await uploadImage(e.target.files[0]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  /** 이미지 업로드 */
  const uploadImage = async (file) => {
    const formData = new FormData();
    const nickNameBlob = new Blob([JSON.stringify({ nickName })], {
      type: 'application/json;charset=UTF-8',
    });
    formData.append('nickName', nickNameBlob);
    formData.append('file', file);
    await axios
      .post(`${IP_ADDRESS}/reset/profile`, formData, {
        headers: {
          'Authorization-Access': accessToken,
        },
      })
      .then(() => {
        toast.success('이미지를 변경했습니다');
      })
      .catch((error) => {
        handleError(error);
      });
  };

  /** 새로운 닉네임 입력 */
  const handleNameChange = (e) => {
    setChangeNickName(e.target.value);
    if (!e.target.value.match(/^[가-힣0-9]{2,}$|^[A-Za-z0-9]{3,}$/)) {
      setNameError('한글은 최소 2글자, 영문은 최소 3글자 이상 입력하세요');
    } else {
      setNameError(false);
    }
  };

  /** 프로필 이미지, 닉네임 폼 전송*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameError === false) {
      try {
        const response = await axios.post(
          `${IP_ADDRESS}/reset/nickname`,
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
        );
        if (response) {
          console.log(`닉네임 재설정 성공`);
          localStorage.setItem('nickName', changeNickName);
          toast.success('닉네임을 재설정 했습니다');
          navigate('/mypage');
        }
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <section className="relative w-full h-screen flex flex-col justify-center bg-white">
      <BackButton destination={'/mypage'} />
      <header className="font-semibold font-score text-2xl text-center">
        프로필 수정
      </header>
      <main className="mt-6 text-center">
        <div className="relative inline-block rounded-full bg-gray-200 h-32 w-32">
          <img
            src={imageUrl}
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
              value={changeNickName}
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
                {!nameError && changeNickName ? (
                  <GoCheckCircleFill className="text-emerald" />
                ) : (
                  <GoCheckCircle className="text-emerald" />
                )}
              </span>{' '}
              <span className="ml-3">닉네임 사용 가능</span>
            </li>
          </p>
          <div className="flex mt-2 mr-3">
            <button
              type="submit"
              className="font-score flex-grow text-white rounded-2xl p-2 bg-main transition ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-emerald hover:text-black"
            >
              닉네임 저장하기
            </button>
          </div>
        </form>
      </main>
    </section>
  );
}
