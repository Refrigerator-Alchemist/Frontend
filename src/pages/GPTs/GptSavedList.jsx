import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { IP_ADDRESS, useUserApi } from '../../context/UserContext';
import Navigation from '../../components/Global/Navbar';
import SavedListCard from '../../components/GPTs/SavedListCard';
import BackButton from '../../components/Global/BackButton';
import Loading from '../../components/Global/Loading';
import Error from '../../components/Global/Error';

export default function GptSavedList() {
  const nickName = localStorage.getItem('nickName') || '';
  const accessToken = localStorage.getItem('accessToken');

  const { handleError } = useUserApi();

  const fetchRecipes = async () => {
    const response = await axios.get(`${IP_ADDRESS}/recipe/myRecipe`, {
      headers: { 'Authorization-Access': accessToken },
    });
    return response.data;
  };

  const {
    data: recipes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['recipes', accessToken],
    queryFn: fetchRecipes,
    enabled: !!accessToken,
    onError: handleError,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <section className="history">
      <BackButton destination="/main" />
      <div className="my-2 mt-20 mb-4">
        <div className="titlebox mb-6 mt-2">
          <span className="font-score font-extrabold ml-8 text-2xl">
            {accessToken ? `${nickName}의 연금술 기록` : '연금술 기록'}
          </span>
        </div>
        {recipes?.map((recipe) => (
          <SavedListCard
            key={recipe.recipeId}
            recipeId={recipe.recipeId}
            foodName={recipe.foodName}
            ingredientList={recipe.ingredientList}
          />
        ))}
      </div>
      <footer
        style={{
          position: 'fixed',
          bottom: '0',
          width: '100%',
          maxWidth: '31rem',
        }}
      >
        <Navigation />
      </footer>
    </section>
  );
}
