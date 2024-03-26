import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { IP_ADDRESS } from '../context/UserContext';
import { toast } from 'react-toastify';

const nickName = localStorage.getItem('nickName');
const email = localStorage.getItem('email');
const accessToken = localStorage.getItem('accessToken');

// ✍️ 게시물 작성
export default function UploadBoard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);

  const fileInput = useRef(null);

  const navigate = useNavigate();

  const location = useLocation();

  // 재료 입력
  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  // 재료들에 재료 추가
  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  // 게시물 작성 버튼
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', fileInput.current.files[0]);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('nickName', nickName);
    formData.append('email', email);

    ingredients.forEach((ingredient, index) => {
      if (ingredient.trim() !== '') {
        formData.append(`ingredient${index + 1}`, ingredient);
      }
    });

    try {
      const response = axios.post(`${IP_ADDRESS}/writeTest`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization-Access': accessToken,
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        const postId = response.data; 
        toast.success('게시물을 업로드 했습니다');
        navigate(`/board/specific?postId=${postId}`);
      }
    } catch (error) {
      console.error('에러 내용:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // 🚷 비로그인 유저 접근 금지
  useEffect(() => {
    if (!accessToken) {
      toast.error('마 로그인 해라ㅋㅋ');
      navigate(-1);
    }
  }, [navigate, location]);

  return (
    <section className="pt-16">
      <div
        className="absolute top-5 left-42 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/board')}
      >
        <FaArrowLeft />
      </div>

      {/* main */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-6 mx-auto p-8"
      >
        <div className="form-group ">
          <label
            htmlFor="cover-photo"
            className="font-score block mt-4 mb-2 text-sm font-medium text-gray-700"
          >
            사진 추가하기
          </label>
          <input
            type="file"
            id="cover-photo"
            className="font-score w-full  border-2 border-dashed  border-gray-300 rounded-md p-4 text-sm text-gray-700"
            ref={fileInput}
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="food-name"
            className="font-score block mb-2 text-sm font-medium text-gray-700"
          >
            음식 이름
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="음식 이름을 입력하세요"
            className="font-score w-full border border-gray-300 rounded-md p-2 text-sm"
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="description"
            className="font-score block mb-2 text-sm font-medium text-gray-700"
          >
            설명
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="음식에 대한 설명을 적어주세요"
            className="font-score w-full border border-gray-300 rounded-md p-2 text-sm h-40"
          />
        </div>

        <div className="form-group">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            재료
          </label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="font-score flex items-center space-x-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="재료를 입력하세요"
                className="border border-gray-300 rounded-md p-2 text-sm flex-grow mb-2"
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  className="font-score text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    const newIngredients = ingredients.filter(
                      (_, idx) => idx !== index
                    );
                    setIngredients(newIngredients);
                  }}
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredientField}
            className="font-score flex items-center justify-center px-10 py-2 mt-5 border border-gray-400 text-black rounded-full shadow-sm hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
          >
            재료 추가
          </button>
        </div>

        <footer className="flex space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="font-score flex-grow bg-gray-300 rounded-full p-2 hover:bg-gray-400"
          >
            취소
          </button>
          <button
            type="submit"
            className="font-score flex-grow bg-main  text-white rounded-full p-2 hover:bg-yellow-500"
          >
            올리기
          </button>
        </footer>
      </form>
    </section>
  );
}
