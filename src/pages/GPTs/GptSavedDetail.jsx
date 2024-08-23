import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { IP_ADDRESS, useUserApi } from '../../context/UserContext';
import Navigation from '../../components/Global/Navbar';
import BackButton from '../../components/Global/BackButton';
import Loading from '../../components/Global/Loading';

const GptSavedDetail = () => {
  const { recipeId } = useParams();
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const { handleError } = useUserApi();

  const fetchRecipeData = async () => {
    if (!recipeId) throw new Error('Recipe ID가 존재하지 않습니다.');
    const response = await axios.get(
      `${IP_ADDRESS}/recipe/myRecipe/${recipeId}`,
      {
        headers: { 'Authorization-Access': accessToken },
      }
    );
    return response.data;
  };

  const {
    data: recipeData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: fetchRecipeData,
    enabled: !!accessToken && !!recipeId,
    onError: handleError,
  });

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <BackButton destination="/main" />
      <main className="pt-16">
        <section className="flex flex-col items-center mt-10">
          <header className="flex items-center gap-4">
            <h1 className="font-score text-3xl font-bold">
              {recipeData?.foodName}
            </h1>
          </header>
          <div className="font-score text-lg text-gray-500 my-8">
            {recipeData?.ingredients ? recipeData.ingredients.join(' · ') : ''}
          </div>
          <article className="text-gray-700 font-score mt-6 m-6 p-5">
            {recipeData?.recipe?.map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </article>
        </section>
      </main>
      <footer className="fixed bottom-0 w-full max-w-md mx-auto px-4">
        <Navigation />
      </footer>
    </>
  );
};

export default GptSavedDetail;
