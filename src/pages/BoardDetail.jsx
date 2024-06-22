import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IP_ADDRESS, useUserApi } from '../context/UserContext';
import Header from '../components/BoardDetail/Header';
import BoardDetailMain from '../components/BoardDetail/BoardDetailMain';
import Footer from '../components/UI/Footer';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const BoardDetail = () => {
  const { postId } = useParams();
  const [Liked, setLiked] = useState(false);
  const accessToken = localStorage.getItem('accessToken');
  const myEmail = localStorage.getItem('email');
  const location = useLocation();
  const { handleError } = useUserApi();
  const queryClient = useQueryClient();

  const fetchPostData = async () => {
    const response = await axios.get(`${IP_ADDRESS}/board/specific?postId=${postId}`);
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
    const URL = `${IP_ADDRESS}/board/islike?id=${myEmail}`;
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
    enabled: !!postId, //postId 있을때만 쿼리 활성화 
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
        `${IP_ADDRESS}/board/like`,
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

  const dislikeMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${IP_ADDRESS}/board/dislike`,
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

  const reportPost = async (e) => {
    e.preventDefault();
    const URL = `${IP_ADDRESS}/board/report`;

    try {
      const response = await axios.post(
        URL,
        { email: myEmail, postId: postId },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
            'Authorization-Access': accessToken,
          },
        }
      );

      if (response.status === 200) {
        toast.success('해당 게시물을 신고했습니다');
      }
    } catch (error) {
      handleError(error);
    }
  };

  if (postQuery.isLoading || likedPostsQuery.isLoading) {
    return <span>Loading...</span>;
  }

  if (postQuery.isError || likedPostsQuery.isError) {
    return <span>Error occurred: {postQuery.error || likedPostsQuery.error}</span>;
  }

  return (
    <section style={{ marginBottom: '90px' }}>
      <Header reportPost={reportPost} />
      <BoardDetailMain
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
};

export default BoardDetail;
