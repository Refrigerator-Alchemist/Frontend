import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoAccessibility } from 'react-icons/io5';
import { toast } from 'react-toastify';

import { IP_ADDRESS, useUserDispatch } from '../context/UserContext';
import axios from 'axios';

export default function UploadBoard() {
  const { postId } = useParams(); // 라우터 엔드포인트
  const [title, setTitle] = useState(''); // 레시피 글 제목
  const [description, setDescription] = useState(''); // 내용
  const [ingredients, setIngredients] = useState([]); // 재료

  const accessToken = localStorage.getItem('accessToken');

  const navigate = useNavigate();
  const { handleError } = useUserDispatch();

  // 1️⃣ 해당 게시물의 제목, 설명, 재료를 불러오는 함수
  useEffect(() => {
    const fetchData = async (postId) => {
      const URI = `${IP_ADDRESS}/board/updateBoard?postId=${postId}`;
      try {
        const response = await axios.get(URI, {
          headers: {
            'Authorization-Access': accessToken,
          },
        });

        if (response.data) {
          if (response.data && Array.isArray(response.data.items)) {
            const items = response.data.items.map((item) => ({
              title: item.title,
              description: item.description,
              ingredients: item.ingredients.map((ingredient) => ingredient),
            }));
            setTitle(items[0].title);
            setDescription(items[0].description);
            setIngredients(items[0].ingredients);
          }
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchData(postId);
  }, [handleError, postId, accessToken]);

  // 2️⃣ 재료 입력
  const handleIngredientChange = (index, e) => {
    const newIngredients = [...ingredients]; // 기존 재료들
    newIngredients[index].name = e.target.value; // index번째 재료
    setIngredients(newIngredients); // 모두 재료들 안에 순서대로 합치기
  };

  // 3️⃣ 재료 추가
  const addIngredientField = () => {
    // setIngredients([...ingredients, '']);
    setIngredients([...ingredients, { name: '' }]);
  };

  // 4️⃣ 수정 완료
  const handleSubmit = async (e) => {
    e.preventDefault();
    const URI = `${IP_ADDRESS}/editpost/update`;

    const formData = {
      postId: postId,
      title: title,
      description: description,
      // ingredients: ingredients,
      ingredients: ingredients.map(ingredient => ingredient.name),
    };

    try {
      const response = await axios.post(URI, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization-Access': accessToken,
        },
      });

      if (response.status === 200) {
        console.log('게시물 수정 완료');
        toast.success('게시물이 수정되었습니다');
        navigate(`/board/${postId}`);
      }
    } catch (error) {
      handleError(error);
    }
  };

  // 5️⃣ 취소
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <section className="pt-16 relative">
      <div
        className="absolute top-5 left-1 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate("/mypage")}
      >
        <IoAccessibility />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-6 mx-auto p-8"
      >
        <div className="form-group">
          <label
            htmlFor="food-name"
            className="font-score block mb-2 text-sm font-medium text-gray-700"
          >
            음식 이름
          </label>
          <input
            type="text"
            id="food-name"
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
                className="border border-gray-300 rounded-md p-2 text-sm flex-grow"
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  className="font-score text-gray-500 hover:text-gray-700"
                  onClick={() =>
                    setIngredients(
                      ingredients.filter((_, idx) => idx !== index)
                    )
                  }
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
            className="font-score flex-grow text-white rounded-full p-2 transition ease-in-out bg-main hover:bg-emerald hover:text-black"
          >
            수정하기
          </button>
        </footer>
      </form>
    </section>
  );
}
