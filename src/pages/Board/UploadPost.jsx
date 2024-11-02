import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IP_ADDRESS, useUserApi } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { Skeleton, Box } from '@mui/material';
import BackButton from '../../components/common/BackButton';
import axios from 'axios';

export default function UploadBoard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const nickName = localStorage.getItem('nickName');
  const email = localStorage.getItem('email');
  const accessToken = localStorage.getItem('accessToken');
  const fileInput = useRef(null);
  const navigate = useNavigate();
  const { handleError } = useUserApi();

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('음식 이름을 입력하세요.');
      return;
    }
    if (
      ingredients.length === 0 ||
      ingredients.every((ingredient) => !ingredient.trim())
    ) {
      toast.error('하나 이상의 재료를 입력하세요.');
      return;
    }
    if (!fileInput.current.files.length) {
      toast.error('사진을 추가해주세요.');
      return;
    }

    const formData = new FormData();
    if (fileInput.current.files[0]) {
      formData.append('image', fileInput.current.files[0]);
    }
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
      setLoading(true); // Set loading state to true
      const response = await axios.post(
        `${IP_ADDRESS}/board/upload/post`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization-Access': accessToken,
          },
        }
      );
      if (response.status === 200) {
        const postId = response.data;
        toast.success('게시물을 업로드 했습니다');
        navigate(`/board/${postId}`);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false); // Set loading state to false
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
    <section className="pt-10">
      <BackButton destination="/main" />
      {loading ? (
        <Box>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={40}
            style={{ marginBottom: 16 }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={200}
            style={{ marginBottom: 16 }}
          />
          <Skeleton
            variant="text"
            width="100%"
            height={40}
            style={{ marginBottom: 16 }}
          />
          <Skeleton
            variant="text"
            width="100%"
            height={40}
            style={{ marginBottom: 16 }}
          />
          <Skeleton
            variant="text"
            width="100%"
            height={40}
            style={{ marginBottom: 16 }}
          />
          <Skeleton variant="rectangular" width="100%" height={40} />
        </Box>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 mx-auto p-8"
        >
          <div className="form-group">
            <label
              htmlFor="cover-photo"
              className=" font-score block mt-4 mb-2 text-md font-bold text-gray-700"
            >
              사진 추가하기
            </label>
            <input
              type="file"
              title="파일을 추가해주세요"
              aria-label="파일을 추가해주세요"
              id="cover-photo"
              onChange={handleImageChange}
              className="font-score w-full border-2 border-dashed border-gray-300 rounded-md p-4 text-sm text-gray-700"
              ref={fileInput}
            />
            {imagePreviewUrl && (
              <div className="flex justify-center items-center mt-4">
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="w-64 h-64 border-2 border-gray-300 rounded-lg overflow-hidden object-cover"
                />
              </div>
            )}
          </div>
          <fieldset>
            <div className="form-group mb-2">
              <label
                htmlFor="food-name"
                className="font-bold font-score block mb-2 text-md  text-gray-700"
              >
                음식 이름
              </label>
              <input
                type="text"
                id="title"
                title="음식이름을 입력하세요"
                aria-label="음식이름을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="음식 이름을 입력하세요"
                className="font-score w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="description"
                className="font-score block mb-2 text-md font-bold text-gray-700"
              >
                설명
              </label>
              <textarea
                id="description"
                value={description}
                title="음식에 대한 설명을 적어주세요"
                aria-label="음식에 대한 설명을 적어주세요"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="음식에 대한 설명을 적어주세요"
                className="font-score w-full border border-gray-300 rounded-md p-2 text-sm h-20"
              />
            </div>
          </fieldset>
          <fieldset>
            <legend className="font-score text-md font-bold mb-4">
              재료 목록
            </legend>
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="font-score flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={ingredient}
                  title="재료를 입력하세요"
                  aria-label="재료를 입력하세요"
                  onChange={(e) => handleIngredientChange(index, e)}
                  placeholder="재료를 입력하세요"
                  className="flex-grow border border-gray-300 rounded-md p-2 text-sm mb-2"
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
                    aria-label="Remove ingredient"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredientField}
              className="font-score mt-5 px-10 py-2 border border-gray-400 text-black rounded-full shadow-sm hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
              aria-label="Add ingredient"
            >
              재료 추가
            </button>
          </fieldset>
          <div className="flex space-x-2 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="font-score flex-grow bg-gray-300 rounded-full p-2 hover:bg-gray-400"
              aria-label="Cancel"
            >
              취소
            </button>
            <button
              type="submit"
              className="font-score flex-grow transition ease-in-out bg-main hover:bg-emerald hover:text-black text-white rounded-full p-2"
              aria-label="Submit"
            >
              올리기
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
