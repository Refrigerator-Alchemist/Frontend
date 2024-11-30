import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IP_ADDRESS } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { handleError } from '../../utils/common';
import axios from 'axios';
import BackButton from '../../components/Global/BackButton';

function FormGroup({ label, children }) {
  return (
    <div className="form-group">
      <label className="font-score block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
    </div>
  );
}

function IngredientInput({
  ingredient,
  index,
  handleIngredientChange,
  handleRemoveIngredient,
}) {
  return (
    <div className="font-score flex items-center space-x-2 mb-3">
      <input
        type="text"
        value={ingredient.name}
        onChange={(e) => handleIngredientChange(index, e)}
        placeholder="재료를 입력하세요"
        className="border border-gray-300 rounded-md p-2 text-sm flex-grow"
      />
      <button
        type="button"
        className="font-score text-gray-500 hover:text-gray-700"
        onClick={() => handleRemoveIngredient(index)}
      >
        &times;
      </button>
    </div>
  );
}

function FormButton({ type, onClick, children, className }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`font-score flex-grow rounded-full p-2 ${className}`}
    >
      {children}
    </button>
  );
}

export default function UploadBoard() {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (postId) => {
      const URL = `${IP_ADDRESS}/board/updateBoard?postId=${postId}`;
      try {
        const response = await axios.get(URL, {
          headers: {
            'Authorization-Access': accessToken,
          },
        });

        if (response.data && Array.isArray(response.data.items)) {
          const item = response.data.items[0];
          setTitle(item.title);
          setDescription(item.description);
          setIngredients(
            item.ingredients.map((ingredient) => ({ name: ingredient }))
          );
        }
      } catch (error) {
        handleError(error);
      }
    };
    fetchData(postId);
  }, [handleError, postId, accessToken]);

  const handleIngredientChange = (index, e) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, idx) => {
        if (idx === index) {
          return { ...ingredient, name: e.target.value };
        }
        return ingredient;
      })
    );
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, { name: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = `${IP_ADDRESS}/editpost/update`;

    const formData = new FormData();
    formData.append('postId', postId);
    formData.append('title', title);
    formData.append('description', description);
    ingredients.forEach((ingredient, index) => {
      formData.append(`ingredient[${index}]`, ingredient.name);
    });

    try {
      const response = await axios.post(URL, formData, {
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

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <section className="pt-16 relative">
      <BackButton destination={-1} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-6 mx-auto p-8"
      >
        <FormGroup label="음식 이름">
          <input
            type="text"
            id="food-name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="음식 이름을 입력하세요"
            className="font-score w-full border border-gray-300 rounded-md p-2 text-sm"
          />
        </FormGroup>
        <FormGroup label="설명">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="음식에 대한 설명을 적어주세요"
            className="font-score w-full border border-gray-300 rounded-md p-2 text-sm h-40"
          />
        </FormGroup>
        <FormGroup label="재료 목록">
          {ingredients.map((ingredient, index) => (
            <IngredientInput
              key={index}
              ingredient={ingredient}
              index={index}
              handleIngredientChange={handleIngredientChange}
              handleRemoveIngredient={(index) =>
                setIngredients(ingredients.filter((_, idx) => idx !== index))
              }
            />
          ))}
          <FormButton
            type="button"
            onClick={addIngredientField}
            className="flex items-center justify-center px-10 py-2 mt-5 border border-gray-400 text-black shadow-sm hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
          >
            재료 추가
          </FormButton>
        </FormGroup>
        <footer className="flex space-x-2">
          <FormButton
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400"
          >
            취소
          </FormButton>
          <FormButton
            type="submit"
            className="text-white transition ease-in-out bg-main hover:bg-emerald hover:text-black"
          >
            수정하기
          </FormButton>
        </footer>
      </form>
    </section>
  );
}
