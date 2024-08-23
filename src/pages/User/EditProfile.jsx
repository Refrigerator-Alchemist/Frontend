import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoCheckCircle, GoCheckCircleFill } from 'react-icons/go';
import { IP_ADDRESS, useUserApi } from '../../context/UserContext';
import BackButton from '../../components/Global/BackButton';
import IMAGE_PROFILE from '/assets/img/img_profile.webp';

function FormGroup({
  label,
  htmlFor,
  type,
  value,
  onChange,
  readOnly,
  children,
}) {
  return (
    <div className="flex-grow mr-3 mb-4">
      <label
        className="font-score block text-black-300 text-lg font-bold mb-2 text-start"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {children || (
        <input
          className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={htmlFor}
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
        />
      )}
    </div>
  );
}

function Image({ imageUrl }) {
  return (
    <div className="relative inline-block rounded-full bg-gray-200 h-32 w-32">
      <img
        src={imageUrl}
        alt="프로필 사진"
        className="rounded-full h-32 w-32 object-cover border-2"
      />
    </div>
  );
}

function FormButton({ type, onClick, children, className }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`font-score flex-grow rounded-2xl p-2 ${className}`}
    >
      {children}
    </button>
  );
}

function ErrorMessage({ error }) {
  return (
    <p
      className={`text-red-500 text-xs italic ${error ? 'visible' : 'invisible'}`}
    >
      {error || 'nameError'}
    </p>
  );
}

export default function EditProfile() {
  const fileInput = useRef(null);
  const { handleError } = useUserApi();
  const navigate = useNavigate();
  const nickName = localStorage.getItem('nickName') || '';
  const email = localStorage.getItem('email') || '';
  const accessToken = localStorage.getItem('accessToken');
  const [imageUrl, setImageUrl] = useState(IMAGE_PROFILE);
  // const [selectedImage, setSelectedImage] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [changeNickName, setChangeNickName] = useState(nickName);

  useEffect(() => {
    setImageUrl(localStorage.getItem('imageUrl'));
  });

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

  // const handleImageChange = (e) => {
  //   if (e.target.files[0]) {
  //     const file = e.target.files[0];
  //     setSelectedImage(file);

  //     const imageUrl = URL.createObjectURL(file);
  //     setImageUrl(imageUrl);
  //   }
  // };

  // const handleSubmitImage = async () => {
  //   const formData = new FormData();
  //   const nickNameBlob = new Blob([JSON.stringify({ nickName })], {
  //     type: 'application/json;charset=UTF-8',
  //   });
  //   formData.append('nickName', nickNameBlob);
  //   formData.append('file', selectedImage);

  //   try {
  //     const response = await axios.post(
  //       `${IP_ADDRESS}/reset/profile`,
  //       formData,
  //       {
  //         headers: {
  //           'Authorization-Access': accessToken,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     handleError(error);
  //   }
  // };

  /** 새로운 닉네임 입력 */
  const handleNicknameChange = (e) => {
    setChangeNickName(e.target.value);
    if (!e.target.value.match(/^[가-힣0-9]{2,}$|^[A-Za-z0-9]{3,}$/)) {
      setNameError('한글은 최소 2글자, 영문은 최소 3글자 이상 입력하세요');
    } else {
      setNameError(false);
    }
  };

  /** 닉네임 변경하기 */
  const handleSubmitNickname = async (e) => {
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
        <Image imageUrl={imageUrl} />
        <form
          className="flex flex-col mt-8 mx-10"
          onSubmit={handleSubmitNickname}
        >
          <FormGroup
            label="연결된 이메일"
            htmlFor="email"
            type="email"
            value={email}
            readOnly
          />
          <FormGroup
            label="닉네임"
            htmlFor="nickName"
            type="text"
            value={changeNickName}
            onChange={handleNicknameChange}
          >
            <input
              className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nickName"
              type="text"
              value={changeNickName}
              onChange={handleNicknameChange}
            />
            <ErrorMessage error={nameError} />
          </FormGroup>
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
          <div className="flex mt-2 mr-3 gap-3">
            <FormButton
              type="submit"
              className="text-white bg-main transition ease-in-out hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-emerald hover:text-black"
            >
              닉네임 변경
            </FormButton>
          </div>
        </form>
      </main>
    </section>
  );
}
