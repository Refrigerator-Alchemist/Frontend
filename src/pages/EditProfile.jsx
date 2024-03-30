import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoCheckCircle, GoCheckCircleFill } from 'react-icons/go';
import IMAGE_PROFILE from '../assets/img/img_profile.png';
import { IP_ADDRESS, useUserState } from '../context/UserContext';
import { toast } from 'react-toastify';
import errorCode from '../utils/ErrorCode';

export default function EditProfile() {
  const [changeNickName, setChangeNickName] = useState(''); // 새로 바꿀 닉네임
  const [nameError, setNameError] = useState(false);

  const [nickName, setNickName] = useState(
    localStorage.getItem('nickName') || ''
  );
  const [email, setEmail] = useState(localStorage.getItem('email') || ''); // 이메일
  const accessToken = localStorage.getItem('accessToken'); // 액세스 토큰

  const [image, setImage] = useState(
    localStorage.getItem('imageUrl') || IMAGE_PROFILE // 프로필 이미지
  );

  const user = useUserState(); // 유저 데이터 : 로그인 상태면 존재

  const fileInput = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // 🚷 비로그인 유저 접속 차단
  useEffect(() => {
    if (!accessToken) {
      toast.error('로그인을 먼저 해야합니다');
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  }, [navigate, location, accessToken]);

  // ⭕️ 바꿀 닉네임 초기값은 원래 닉네임으로 처리해서 입력 가능하게 수정
  useEffect(() => {
    // 닉네임 이메일 받아오는 get 요청 구현하기
    const fetchUserInfo = async () => {
      const URL = `${IP_ADDRESS}/reset/info`;

      try {
        if (accessToken) {
          const response = await axios.get(URL, {
            headers: {
              'Authorization-Access': accessToken,
            },
          });
          localStorage.setItem('nickName', response.headers.get('nickName'));
          localStorage.setItem('email', response.headers.get('email'));
          setNickName(response.headers['nickName']);
          setEmail(response.headers['email']);
        } else {
          return;
        }
      } catch (error) {
        const errorHeaders = error.response?.headers;
        // 🚫 에러 처리
        if (errorHeaders.code) {
          const errorName = Object.values(errorCode).find(
            (obj) => obj.code === errorHeaders.code
          );
          const userNotice = errorName.notice;

          console.log(`에러 내용: ${errorName}`); // 백엔드 확인용
          toast.error(`${userNotice}`); // 유저 팝업용
        } else {
          console.log(`확인되지 않은 에러, ${error}`); // 에러 예외
        }
      }
    };

    fetchUserInfo();
    setChangeNickName(nickName);
  }, [accessToken, nickName]);

  // 1️⃣ 이미지 파일 업로드
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

  // 2️⃣ 프로필 이미지 저장하기
  const uploadImage = async (file) => {
    const URL = `${IP_ADDRESS}/reset/profile`;

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
      const errorHeaders = error.response?.headers;
      // 🚫 에러 처리
      if (errorHeaders.code) {
        const errorName = Object.values(errorCode).find(
          (obj) => obj.code === errorHeaders.code
        );
        const userNotice = errorName.notice;

        console.log(`에러 내용: ${errorName}`); // 백엔드 확인용
        toast.error(`${userNotice}`); // 유저 팝업용
      } else {
        console.log(`확인되지 않은 에러, ${error}`); // 에러 예외
      }
    }
  };

  // 3️⃣ 닉네임 유효성 검사
  const handleNameChange = (e) => {
    setChangeNickName(e.target.value);

    if (!e.target.value.match(/^[가-힣0-9]{2,}$|^[A-Za-z0-9]{3,}$/)) {
      setNameError('한글은 최소 2글자, 영문은 최소 3글자 이상 입력하세요');
    } else {
      setNameError(false);
    }
  };

  // 4️⃣ 닉네임 저장하기
  const handleSubmit = async (e) => {
    e.preventDefault();

    const URL = `${IP_ADDRESS}/reset/nickname`;

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
            localStorage.setItem('nickName', changeNickName); // 로컬스토리지에도 바꾼 닉네임 저장
            user.nickName = changeNickName; // user 객체에도 변경한 닉네임 저장
            console.log(`닉네임 재설정 성공 : ${result}`);
            toast.success('닉네임을 재설정 했습니다');
          });

        navigate('/mypage');
      }
    } catch (error) {
      const errorHeaders = error.response?.headers;
      // 🚫 에러 처리
      if (errorHeaders.code) {
        const errorName = Object.values(errorCode).find(
          (obj) => obj.code === errorHeaders.code
        );
        const userNotice = errorName.notice;

        console.log(`에러 내용: ${errorName}`); // 백엔드 확인용
        toast.error(`${userNotice}`); // 유저 팝업용
      } else {
        console.log(`확인되지 않은 에러, ${error}`); // 에러 예외
      }
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
