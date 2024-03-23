import { useState } from 'react';
import axios from 'axios';

export default function GetLikeData() {
  const [likedItems, setLikedItems] = useState([]); // 현재 계정으로 좋아요 누른 게시물들

  const fetchLikeData = async () => {
    const URL = 'http://localhost:8080/islike';
    const nickName = localStorage.getItem('nickName');

    try {
      const response = await axios.get(URL, nickName);
      if (response.data && Array.isArray(response.data.items)) {
        const items = response.data.items.map((item) => item);
        setLikedItems(items);
      } else {
        console.error('에러 내용', response.data);
      }
    } catch (error) {
      console.error('좋아요 누른 기록 받아오는 중 에러 발생');
    }
  };
}
