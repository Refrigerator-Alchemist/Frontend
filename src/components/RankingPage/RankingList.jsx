import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../../utils/common';
import React from 'react';
import axios from 'axios';
import Loading from '../Global/Loading';
import Error from '../Global/Error';
import RankingCard from './RankingCard';

export default function RankingList() {
  const navigate = useNavigate();
  const fetchRanking = async () => {
    try {
      const response = await axios.get(`/ranking/top3`);
      if (response.data && Array.isArray(response.data.items)) {
        return response.data.items.map((item) => ({
          id: item.ID,
          imageUrl: item.imageUrl,
          title: item.title,
          ingredients: item.ingredients.map((ingredient) => ingredient),
          likeCount: item.likeCount,
        }));
      }
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const {
    data: topItems,
    isPending,
    error,
  } = useQuery({
    queryKey: ['topItems'],
    queryFn: fetchRanking,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) return <Loading paddingTop={'pt-28'} height={'h-20'} />;
  if (error) return <Error />;

  return (
    <article
      className="hover:cursor-pointer w-full my-2"
      onClick={() => {
        navigate('/ranking');
      }}
    >
      <div className="flex justify-end">
        <span className="relative flex flex-col justify-end font-score text-sm hover:text-indigo mr-4 group">
          가장 많은 좋아요를 받은 레시피는?
          <div className="absolute bottom-full right-2 mb-1 hidden group-hover:block z-50 whitespace-normal break-words rounded-lg bg-black py-1.5 px-2 font-score text-xs font-normal text-white opacity-50">
            랭킹보드 이동
          </div>
        </span>
      </div>
      <ul>
        {topItems.map((topItem, index) => (
          <RankingCard
            key={index + 1}
            rank={index + 1}
            {...topItem}
            onClick={() => {
              navigate(`/board/${topItem.id}`);
            }}
          />
        ))}
      </ul>
    </article>
  );
}
