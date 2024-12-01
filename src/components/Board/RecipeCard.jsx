import React, { useState, useEffect, forwardRef } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IP_ADDRESS } from '../../context/UserContext';
import { handleError } from '../../utils/common';
import { toast } from 'react-toastify';
import axios from 'axios';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const RecipeCard = (
  { postId, title, description, img, initialLikeCount, isLiked, loading },
  ref
) => {
  const [Liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(parseInt(initialLikeCount));
  const accessToken = localStorage.getItem('accessToken');
  const email = localStorage.getItem('email');
  const textStyle = 'text-lg font-score font-semibold';

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const toggleLike = async () => {
    try {
      if (Liked) {
        const response = await axios.post(
          `${IP_ADDRESS}/board/dislike`,
          { email, postId },
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              Accept: 'application/json',
              'Authorization-Access': accessToken,
            },
          }
        );
        if (response.status === 200) {
          setLiked(false);
          setLikeCount(likeCount - 1);
        }
      } else {
        const response = await axios.post(
          `${IP_ADDRESS}/board/like`,
          { email, postId },
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              Accept: 'application/json',
              'Authorization-Access': accessToken,
            },
          }
        );
        if (response.status === 200) {
          setLiked(true);
          setLikeCount(likeCount + 1);
        }
      }
    } catch (error) {
      handleError(error);
    }
  };

  if (loading) {
    return (
      <Box ref={ref} sx={{ margin: '0 6px' }}>
        <Skeleton variant="rectangular" width="100%" height={200} />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="60%" />
      </Box>
    );
  }

  return (
    <div
      ref={ref}
      className="flex items-center bg-white mx-6 my-2 p-4 rounded-xl shadow"
    >
      <Link to={`/board/${postId}`} className="flex-grow flex">
        <div className="flex-none w-20 h-20 rounded-xl border-2 border-gray-300 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={img}
            alt={`View of ${title}`}
          />
        </div>
        <div className="px-4 py-4">
          <h3 className={textStyle}>{title}</h3>
          <p className="text-gray-500 text-sm font-score">{description}</p>
        </div>
      </Link>
      <div className="mr-2">
        <span className={textStyle}>{likeCount}</span>
      </div>
      <button
        name="like"
        aria-label="like"
        className="p-2"
        onClick={
          accessToken ? toggleLike : () => toast.error('로그인이 필요합니다.')
        }
      >
        {accessToken ? (
          Liked ? (
            <FaHeart className="text-red-500 text-2xl" />
          ) : (
            <FaRegHeart className="text-2xl opacity-100 hover:opacity-100" />
          )
        ) : (
          <FaRegHeart
            className="text-2xl opacity-20 cursor-not-allowed hover:opacity-40"
            title="로그인이 필요합니다."
          />
        )}
      </button>
    </div>
  );
};

export default forwardRef(RecipeCard);
