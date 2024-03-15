import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

function UploadBoard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);

  useEffect(() => {
    if (location.state && location.state.postId) {
      fetchData(location.state.postId); // postId를 전달하여 fetchData 함수 호출
    }
  }, [location]);

  // 서버에서 기존 정보들을 불러오는 함수 
  const fetchData = async (postId) => {
    try {
      const response = await axios.post('http://192.168.0.13:8080/board/updateBoard', {
        postId: postId
      });
      if (response.data) {
        const { foodName, description, ingredients } = response.data;
        setFoodName(foodName);
        setDescription(description);
        setIngredients(ingredients);
      }
    } catch (error) {
      console.error('불러오는 API 에러 내용:', error);
    }
  };

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  // 수정 완료 버튼 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('foodName', foodName);
      formData.append('description', description);
      ingredients.forEach((ingredient, index) => {
        formData.append(`ingredient${index + 1}`, ingredient);
      });

      const response = await axios.post(
        '수정한 내용 서버로 보내는 서버주소',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data);
      navigate('/board');
    } catch (error) {
      console.error('에러 내용:', error);
    }
  };

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
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
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

export default UploadBoard;
