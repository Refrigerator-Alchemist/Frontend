import React from 'react';
import Ranking from '../components/Ranking';
import BackButton from '../components/UI/BackButton';

export default function RankingDetail() {
  return (
    <section className="relative flex flex-col items-center justify-center font-score min-h-screen">
      <BackButton />
      <h1 className="text-4xl font-scoreExtrabold font-extrabold mb-10">
        TOP3 레시피🔥
      </h1>
      <Ranking />
    </section>
  );
}
