import React from 'react';
import RankingList from '../RankingPage/RankingList';

export default function RankingContainer() {
  return (
    <div className="my-2 mt-4">
      <span className="font-scoreExtrabold font-extrabold ml-6 text-2xl">
        TOP3 레시피🔥
      </span>
      <RankingList />
    </div>
  );
}
