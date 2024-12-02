import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { handleError } from '../../utils/common';
import axios from 'axios';
import Header from '../../components/Board/BoardDetail/Header';
import BoardDetailCard from '../../components/Board/BoardDetail/BoardDetailCard';
import Footer from '../../components/Global/Footer';
import Loading from '../../components/Global/Loading';
import Error from '../../components/Global/Error';
import useThrottle from '../../hooks/useThrottle';

export default function BoardDetail() {
  const [Liked, setLiked] = useState(false);
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const accessToken = localStorage.getItem('accessToken');
  const myEmail = localStorage.getItem('email');

  const fetchPostData = async () => {
    const response = await axios.get(`/board/specific?postId=${postId}`);
    if (response.data && Array.isArray(response.data.items)) {
      const item = response.data.items[0];
      return {
        imageUrl: item.imageUrl,
        title: item.title,
        email: item.email,
        description: item.description,
        ingredients: item.ingredients,
        likeCount: item.likeCount,
        nickName: item.nickName,
      };
    } else {
      throw new Error('데이터 타입 오류');
    }
  };

  const fetchLikedPosts = async () => {
    if (!accessToken) return [];
    const URL = `/board/islike?id=${myEmail}`;
    const response = await axios.get(URL, {
      headers: {
        'Authorization-Access': accessToken,
      },
    });
    return response.data.map(Number);
  };

  const postQuery = useQuery({
    queryKey: ['postData', postId],
    queryFn: fetchPostData,
    enabled: !!postId,
  });

  const likedPostsQuery = useQuery({
    queryKey: ['likedPosts'],
    queryFn: fetchLikedPosts,
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (likedPostsQuery.data) {
      setLiked(likedPostsQuery.data.includes(Number(postId)));
    }
  }, [likedPostsQuery.data, postId]);

  const likeMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `/board/like`,
        { email: myEmail, postId: postId },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
            'Authorization-Access': accessToken,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['postData', postId], {
        refetchActive: true,
      });
      queryClient.invalidateQueries(['likedPosts']);
      fetchPostData();
    },
    onError: handleError,
  });

  const dislikeMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `board/dislike`,
        { email: myEmail, postId: postId },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
            'Authorization-Access': accessToken,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['postData', postId]);
      queryClient.invalidateQueries(['likedPosts']);
    },
    onError: handleError,
  });

  const toggleLike = () => {
    if (Liked) {
      dislikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  const reportPost = async () => {
    try {
      const response = await axios.post(
        `/board/report`,
        { email: myEmail, postId: postId },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
            'Authorization-Access': accessToken,
          },
        }
      );
      if (response && response.data === 'ok') {
        toast.success('해당 게시물을 신고했습니다');
      }
      if (response && response.data === 'no') {
        toast.error('이미 신고한 게시물입니다');
      }
    } catch (error) {
      handleError(error);
    }
  };

  const throttledReportPost = useThrottle(() => {
    reportPost();
  }, 3000);

  if (postQuery.isLoading || likedPostsQuery.isLoading) return <Loading />;
  if (postQuery.isError || likedPostsQuery.isError) return <Error />;

  return (
    <section className="mb-[5.625rem]">
      <Header reportPost={throttledReportPost} />
      <BoardDetailCard
        imageUrl={postQuery.data.imageUrl}
        title={postQuery.data.title}
        description={postQuery.data.description}
        ingredients={postQuery.data.ingredients}
        nickName={postQuery.data.nickName}
        likeCount={postQuery.data.likeCount}
        Liked={Liked}
        toggleLike={toggleLike}
        accessToken={accessToken}
      />
      <Footer />
    </section>
  );
}
