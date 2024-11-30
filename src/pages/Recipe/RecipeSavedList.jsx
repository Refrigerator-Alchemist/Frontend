import { useQuery } from '@tanstack/react-query';
import { IP_ADDRESS } from '../../context/UserContext';
import { handleError } from '../../utils/common';
import axios from 'axios';
import Navigation from '../../components/Layout/Navbar';
import SavedListCard from '../../components/Recipe/SavedListCard';
import BackButton from '../../components/Global/BackButton';
import Loading from '../../components/Global/Loading';
import Error from '../../components/Global/Error';

export default function RecipeSavedList() {
  const nickName = localStorage.getItem('nickName') || '';
  const accessToken = localStorage.getItem('accessToken');

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
    <section className="relative">
      <BackButton destination={-1} />
      <div className="py-20">
        <div className="titlebox mb-6 mt-2">
          <span className="font-score font-extrabold ml-8 text-2xl">
            {accessToken ? `${nickName}의 연금술 기록` : '연금술 기록'}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {recipes?.map((recipe) => (
            <SavedListCard
              key={recipe.recipeId}
              recipeId={recipe.recipeId}
              foodName={recipe.foodName}
              ingredientList={recipe.ingredientList}
            />
          ))}
        </div>
      </div>
      <footer className="fixed bottom-0 w-[31rem]">
        <Navigation />
      </footer>
    </section>
  );
}
