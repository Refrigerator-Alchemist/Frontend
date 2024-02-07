import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadBoard() {
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const navigate = useNavigate();

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ foodName, description, ingredients });
  };
  
  const handleCancel = () => {
    navigate(-1); 
  };


  return (
    <div className="max-w-md mx-auto pt-16">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <div className="form-group ">
          <label
            htmlFor="cover-photo"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            사진 추가하기
          </label>
          <input
            type="file"
            id="cover-photo"
            className="w-full  border-2 border-dashed  border-gray-300 rounded-md p-4 text-sm text-gray-700"
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="food-name"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            음식 이름
          </label>
          <input
            type="text"
            id="food-name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="음식 이름을 입력하세요"
            className="w-full border border-gray-300 rounded-md p-2 text-sm" 
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            설명
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="음식에 대한 설명을 적어주세요"
            className="w-full border border-gray-300 rounded-md p-2 text-sm h-40"
          />
        </div>

        <div className="form-group">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            재료
          </label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center space-x-2">
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
                  className="text-gray-500 hover:text-gray-700"
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
            className="flex items-center justify-center px-10 py-2 mt-5 border border-gray-400 text-black rounded-full shadow-sm hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
          >
        
            재료 추가 
          </button>
        </div>

        <div className="flex space-x-2">
        <button
            type="button"
            onClick={handleCancel} 
            className="flex-grow bg-gray-300 rounded-full p-2 hover:bg-gray-400"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-grow bg-yellow-400  text-white rounded-full p-2 hover:bg-yellow-500"
          >
            올리기
          </button>
          
        </div>
      </form>
    </div>
  );
}

export default UploadBoard;
