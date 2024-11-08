import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { IP_ADDRESS } from '../../context/UserContext';
import { handleError } from '../../utils/customedError';
import axios from 'axios';
import Loading from '../common/Loading';
import Error from '../common/Error';

function RankingCard({
  rank,
  imageUrl,
  title,
  ingredients,
  likeCount,
  onClick,
}) {
  const textStyle = 'text-lg font-score font-semibold';
  return (
    <li
      className="mb-4 mt-2 px-3 transition transform hover:scale-110 ease-in-out duration-300"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <figure className="flex items-center justify-between drop-shadow-xl">
        <div className="flex items-center justify-center space-x-6">
          <div style={{ width: '30px' }}>
            <span className="font-undong ml-4">{rank}</span>
          </div>
          <div className="flex-none w-20 h-20 rounded-xl border-2 border-gray-300 overflow-hidden">
            <img
              src={imageUrl}
              alt="thumbnail"
              width="60px"
              height="40px"
              className=" w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className={textStyle}>{title}</span>
            <span className="font-score text-sm">{ingredients.join(', ')}</span>
          </div>
        </div>
        <div>
          <span className="font-score flex gap-2 text-md font-bold ml-5 mr-5">
            {likeCount}
            <FaHeart className="text-red-500 text-2xl" />
          </span>
        </div>
      </figure>
    </li>
  );
}

/** 🏆 Top3 게시물
  - 리액트 쿼리 사용 : 실시간 업데이트하지 않아도 됨 */
export default function RankingList() {
  const navigate = useNavigate();
  const fetchRanking = async () => {
    try {
      const response = await axios.get(`${IP_ADDRESS}/ranking/top3`);
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

  if (isPending) return <Loading />;
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
