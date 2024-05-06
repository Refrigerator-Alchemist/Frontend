import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { IP_ADDRESS, useUserDispatch } from '../context/UserContext';

import { toast } from 'react-toastify';

// ✍️ 게시물 작성
export default function UploadBoard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const nickName = localStorage.getItem('nickName');
  const email = localStorage.getItem('email');
  const accessToken = localStorage.getItem('accessToken');

  const fileInput = useRef(null);

  const navigate = useNavigate();
  const { handleError } = useUserDispatch();

  // 1️⃣ 재료 입력
  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  // 2️⃣ 재료들에 재료 추가
  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  // 3️⃣ 게시물 작성 버튼
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
      const response = await instance.post(
        `${IP_ADDRESS}/board/upload/post`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization-Access': accessToken,
          },
        }
      );
      console.log('response.data : ', response.data);
      if (response.status === 200) {
        const postId = response.data;
        toast.success('게시물을 업로드 했습니다');
        navigate(`/board/${postId}`);
      }
    } catch (error) {
      console.error('게시물 업로드 중 에러 내용:', error);
      toast.error('게시물 업로드에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    try {
      if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviewUrl(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreviewUrl('');
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <section className="pt-16">
      <div
        className="absolute top-5 left-42 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/board')}
      >
        <FaArrowLeft />
      </div>

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
            onChange={handleImageChange}
            className="font-score w-full  border-2 border-dashed  border-gray-300 rounded-md p-4 text-sm text-gray-700"
            ref={fileInput}
          />
        </div>
        {imagePreviewUrl && (
          <div className="flex justify-center items-center">
            <div className="w-64 h-64 border-2 border-gray-300 rounded-lg overflow-hidden">
              <img
                src={imagePreviewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
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
            className="font-score w-full border border-gray-300 rounded-md p-2 text-sm h-28"
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
            className="font-score flex-grow transition ease-in-out bg-main hover:bg-emerald hover:text-black text-white rounded-full p-2"
          >
            올리기
          </button>
        </footer>
      </form>
    </section>
  );
}
