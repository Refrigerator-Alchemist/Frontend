import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { handleError } from '../../utils/common';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../../components/Global/Loading';
import BackButton from '../../components/Global/BackButton';

export default function RecipeResult() {
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { recommendId } = useParams();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/recipe/recommend/${recommendId}`, {
          headers: {
            'Authorization-Access': accessToken,
          },
        });

        if (response.data) {
          setTitle(response.data.foodName);
          setIngredients(response.data.ingredients);
          setSteps(response.data.recipe);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (recommendId) {
      fetchData();
    }
  }, [recommendId, accessToken, handleError]);

  const handleSaveButton = async () => {
    if (!accessToken) {
      toast.error('로그인이 필요합니다');
    }
    try {
      await axios.post(
        `/recipe/save`,
        {
          foodName: title,
          ingredients: ingredients,
          recipe: steps,
        },
        {
          headers: {
            'Authorization-Access': accessToken,
          },
        }
      );
      toast.success('레시피가 성공적으로 저장되었습니다.');
      navigate('/recipe/myRecipe');
    } catch (error) {
      handleError(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="bg-white min-h-screen px-4 py-6 relative">
      <BackButton destination="/main" />
      <main className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
        <div className="md:flex">
          <div className="w-full p-4 pt-12">
            <header className="border-b-2 border-gray-100 py-2">
              <h1 className="m-4 font-score text-3xl font-bold text-gray-800 text-center">
                {title}
              </h1>
            </header>
            <article className="mt-8 p-4 bg-gray-100 rounded-lg overflow-y-auto max-h-200">
              <section>
                <h2 className="font-score text-lg font-bold text-gray-800">
                  재료
                </h2>
                <ul className="py-2 flex flex-wrap">
                  {ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="font-score text-gray-600 mr-4 mb-2"
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="font-score text-lg font-bold text-gray-800 mt-4">
                  레시피
                </h2>
                <div className="py-3">
                  {steps.map((step, index) => (
                    <div key={index} className="font-score text-gray-600 mb-4">
                      {index % 2 === 0 && steps.length > index + 1 ? (
                        <div>
                          <div>{step}</div>
                          <div>{steps[index + 1]}</div>
                        </div>
                      ) : index % 2 === 0 ? (
                        <div>{step}</div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            </article>
          </div>
        </div>
      </main>
      <footer className="fixed bottom-5 left-0 right-0 px-6 text-sm md:text-lg">
        <div className="mx-auto flex justify-between mb-4 max-w-[25rem]">
          <button
            className="font-score transition ease-in-out bg-gray-400 hover:bg-gray-600 text-white font-bold py-3 px-9 rounded-full"
            onClick={() => navigate('/recipe/recommend')}
            aria-label="Recommend another recipe"
          >
            다시 할래요 👎🏿
          </button>
          <button
            className="font-score py-3 px-9 rounded-full transition ease-in-out bg-main hover:bg-emerald hover:cursor-pointer text-white hover:text-black"
            onClick={handleSaveButton}
            aria-label="Save this recipe"
          >
            저장할래요 💛
          </button>
        </div>
      </footer>
    </section>
  );
}
