import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../../utils/common';
import { toast } from 'react-toastify';
import { CiSaveDown2 } from 'react-icons/ci';
import axios from 'axios';
import useThrottle from '../../hooks/useThrottle';
import TagInput from '../../components/Recipe/TagInput';
import Loading from '../../components/Global/Loading';
import BackButton from '../../components/Global/BackButton';

export default function RecipeAlchemy() {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const nickName = localStorage.getItem('nickName') || '';

  const handleAlchemy = useThrottle(async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `/recipe/recommend`,
        {
          ingredients: tags,
        },
        {
          headers: {
            'Authorization-Access': accessToken,
          },
        }
      );

      const recommendId = response.data;
      if (recommendId) navigate(`/recipe/recommend/${recommendId}`);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }, 3000);

  if (isLoading) return <Loading />;

  return (
    <section className="bg-white min-h-screen px-4 py-8 flex flex-col relative">
      <BackButton destination="/main" />
      <main className="max-w-lg mx-auto flex-1">
        <h2 className="font-jua text-xl md:text-2xl font-bold mb-12 mt-32 text-center">
          재료를 입력해주세요
        </h2>
        <TagInput tags={tags} setTags={setTags} />
      </main>
      <footer className="w-full max-w-xs mx-auto pb-8">
        <button
          className="flex justify-center items-center font-jua transition ease-in-out delay-150 text-black text-md md:text-2xl bg-white hover:bg-white hover:scale-125 hover:cursor-pointer font-bold py-2 px-4 rounded w-full mb-4"
          type="button"
          onClick={() => {
            if (!accessToken) {
              toast.error('로그인이 필요합니다.');
            } else {
              navigate('/recipe/myRecipe');
            }
          }}
        >
          <CiSaveDown2 className="mr-1 w-6 h-6" />
          {accessToken ? `${nickName}의 연금술 내역 열기` : '연금술 내역 열기'}
        </button>
        <button
          className="font-jua text-xl transition ease-in-out bg-main hover:bg-emerald hover:scale-110 hover:cursor-pointer hover:text-black text-white font-bold py-3 px-4 rounded-md w-full"
          type="button"
          onClick={handleAlchemy}
        >
          연금술 실행
        </button>
      </footer>
    </section>
  );
}
