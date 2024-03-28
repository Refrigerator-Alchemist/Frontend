import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

import { IP_ADDRESS } from '../context/UserContext';

export default function UploadBoard() {
  const { postId } = useParams(); // 라우터 엔드포인트
  const [title, setTitle] = useState(''); // 레시피 글 제목
  const [description, setDescription] = useState(''); // 내용
  const [ingredients, setIngredients] = useState([]); // 재료

  const accessToken = localStorage.getItem('accessToken');

  const navigate = useNavigate();
  const location = useLocation();

  // 🚷 비로그인 유저 접근 금지
  useEffect(() => {
    if (!accessToken) {
      toast.error('마 로그인 해라ㅋㅋ');
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  }, [navigate, location, accessToken]);

  // 1️⃣ 서버에서 기존 정보들을 불러오는 함수
  useEffect(() => {
    const fetchData = async (postId) => {
      const URL = `${IP_ADDRESS}/board/updateBoard?postId=${postId}`;
      try {
        const response = await axios.get(URL, {
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
        } else {
          console.error('데이터 타입 오류:', response.data);
        }
      } catch (error) {
        console.error('데이터 전송 오류:', error);
      }
    };
    fetchData(postId);
  }, [postId, accessToken]);

  // 2️⃣ 재료 입력
  const handleIngredientChange = (index, e) => {
    const newIngredients = [...ingredients]; // 기존 재료들
    newIngredients[index] = e.target.value; // index번째 재료
    setIngredients(newIngredients); // 모두 재료들 안에 순서대로 합치기
  };

  // 3️⃣ 재료 추가
  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  // 4️⃣ 수정 완료
  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = `${IP_ADDRESS}/editpost/update`;

    const formData = {
      postId: postId,
      title: title,
      description: description,
      ingredients: ingredients,
    };

    try {
      const response = await axios.post(URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization-Access': accessToken,
        },
      });

      if (response.status === 200) {
        console.log('게시물 수정 완료');
        toast.success('게시물 수정 완료');
        navigate(`/board/${postId}`);
      }
    } catch (error) {
      console.error('수정 중 에러가 발생했습니다', error);
      toast.error('수정 중 에러가 발생했습니다');
    }
  };

  // 5️⃣ 취소
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <section className="pt-16">
      <div
        className="absolute top-5 left-42 ml-4 border-2 w-10 h-10 transition ease-in-out delay-150 bg-main hover:bg-indigo-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full flex items-center justify-center"
        onClick={() => navigate('/mypage')}
      >
        <FaArrowLeft />
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
            onClick={handleSubmit}
            className="font-score flex-grow bg-main text-white rounded-full p-2 hover:bg-yellow-500"
          >
            수정완료
          </button>
        </footer>
      </form>
    </section>
  );
}
