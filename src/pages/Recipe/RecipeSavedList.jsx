import { useQuery } from '@tanstack/react-query';
import { handleError } from '../../utils/common';
import axios from 'axios';
import Navbar from '../../components/Layout/Navbar';
import SavedListCard from '../../components/Recipe/SavedListCard';
import BackButton from '../../components/Global/BackButton';
import Loading from '../../components/Global/Loading';
import Error from '../../components/Global/Error';
import Footer from '../../components/Global/Footer';

export default function RecipeSavedList() {
  const nickName = localStorage.getItem('nickName') || '';
  const accessToken = localStorage.getItem('accessToken');

  const fetchRecipes = async () => {
    const response = await axios.get(`/recipe/myRecipe`, {
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
      <BackButton destination={'/recipe/recommend'} />
      <div className="py-20">
        <div className="titlebox mb-6 mt-2">
          <span className="font-score font-extrabold ml-8 text-2xl">
            저장한 연금술
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
      <Footer />
    </section>
  );
}
