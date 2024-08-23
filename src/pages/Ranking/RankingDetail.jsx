import Ranking from '../../components/Ranking/RankingList';
import BackButton from '../../components/Global/BackButton';

export default function RankingDetail() {
  return (
    <section className="relative flex flex-col items-center justify-center font-score min-h-screen">
      <BackButton destination={-1} />
      <h1 className="text-4xl font-scoreExtrabold font-extrabold mb-10">
        TOP3 레시피🔥
      </h1>
      <Ranking />
    </section>
  );
}
