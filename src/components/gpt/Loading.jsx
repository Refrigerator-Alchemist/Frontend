import React from 'react';
import { useNavigate } from 'react-router-dom';

const Loading = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <img
        src="https://media.discordapp.net/attachments/1197868473666248844/1213305395305652264/img_profile.png?ex=660772b4&is=65f4fdb4&hm=fa07101b219d5e41c1501989503c4255d4e8aaaae60a02a1f626e326ca970493&=&format=webp&quality=lossless&width=614&height=614"
        alt="로딩 중"
        className="animate-bounce w-24 h-24 mb-4"
      />
      <h1 className="font-score text-2xl font-bold text-gray-900 mb-4">로딩 중</h1>
      <button
        onClick={() => navigate('/main')}
        className="font-score text-sm text-gray-400"
      >
        취소
      </button>
    </section>
  );
};

export default Loading;
