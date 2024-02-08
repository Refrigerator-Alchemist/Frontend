import React from 'react';
import Navigation from '../components/Navigation';
import { useNavigate, Link } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-10">
      <div className="flex flex-col mt-12 justify-center items-center">
        <title className="relative flex flex-col items-center justify-center text-4xl font-bold mb-12">
          <div className="absolute -mt-3 w-24 h-24 bg-orange-500 rounded-full opacity-50 drop-shadow-xl"></div>
          <div className="relative text-5xl z-10 mb-3 text-shadow-xl">
            What's in your
          </div>
          <div className="relative text-5xl z-10 text-shadow-xl">
            refrigerator?
          </div>
        </title>
        <div className="mb-5 flex-col justify-center items-center">
          <p>
            재료는 있는데 뭘 해먹을지 모르겠다구요?!
            <br />
            고민 뚝! 내 손 안의 냉장고 연금술사, GPT가 존.레.추 해드립니다!!
            <br />
            그대로 만들어서 맛있게 드시기만 하세요😊
            <br />
            <br />
            참, 여러분이 만든 음식을
            <br />
            먹기 전에 예브게 찍어서 자랑하는 걸 깜빡하지 마세요!
          </p>
        </div>
        <Link
          className="flex items-center text-white text-2xl p-5 font-bold font-jua transition ease-in-out delay-150 rounded-md bg-orange-300 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ..."
          onClick={() => {
            navigate('/usegpt');
            console.log('이동!');
          }}
        >
          <span>
            냉장고 연금술 시작 <FaReact />
          </span>
        </Link>
        <div>랭킹컴포넌트 + 클릭시 링크 : Link 안에 Ranking을 넣으면 됨</div>
      </div>
      <Navigation />
    </div>
  );
}
