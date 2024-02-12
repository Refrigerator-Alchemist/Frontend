import React from 'react';
import Navigation from '../components/Navigation';
import { useNavigate } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';
import Ranking from '../components/Ranking';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col justify-between min-h-screen">
      <div className="flex flex-col mt-12 justify-center items-center">
        <title className="relative flex flex-col items-center justify-center text-4xl font-bold mb-12">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-orange-500 rounded-full opacity-50 drop-shadow-xl"></div>
          <div className="relative font-undong text-5xl z-10 mb-3 text-shadow-xl">
            What's in your
          </div>
          <div className="relative font-undong text-5xl z-10 text-shadow-xl">
            refrigerator?
          </div>
        </title>
        <div className="mb-5 flex-col justify-center items-center font-dongle text-2xl">
          <p>재료는 있는데 뭘 해먹을지 모르겠다구요?!</p>
          <p>고민 뚝! 내 손 안의 냉장고 연금술사가 다 알려줄 거에요!</p>
          <p>그대로 만들어서 맛있게 드시기만 하세요😊</p>
          <br />
          <p>참, 여러분이 만든 음식을</p>
          <p>먹기 전에 예쁘게 찍어서 자랑하는 걸 깜빡하지 마세요!</p>
        </div>
        <div
          className=" text-white text-2xl p-5 mb-4 font-bold font-jua transition ease-in-out delay-150 rounded-md bg-main hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-[#15ed79] duration-300 ..."
          onClick={() => {
            navigate('/usegpt');
          }}
        >
          <div className="flex items-center justify-center space-x-4">
            <span>냉장고 연금술 시작</span>{' '}
            <span>
              <FaReact />
            </span>
          </div>
        </div>
        {/* // 클릭시 링크 : Link 안에 Ranking을 넣으면 됨 */}
        <Ranking />
      </div>
      <Navigation />
    </section>
  );
}
