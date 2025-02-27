import { useNavigate } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';
import RankingList from '../components/RankingPage/RankingList';
import Footer from '../components/Global/Footer';

function Title() {
  return (
    <>
      <div className="absolute -top-10 -left-10 w-24 h-24 bg-main rounded-full opacity-50 drop-shadow-xl"></div>
      <div className="relative z-10 mb-3">
        <span className="font-jua font-bold text-4xl md:text-5xl text-shadow-xl">
          What's in your
        </span>
      </div>
      <div className="relative z-10">
        <span className="font-jua font-bold text-4xl md:text-5xl text-shadow-xl">
          refrigerator?
        </span>
      </div>
    </>
  );
}

function Description() {
  return (
    <>
      <p className="font-seoyun text-lg md:text-xl mb-4">
        재료는 있는데 뭘 해먹을지 모르겠다구요?! <br />
        고민 뚝! 내 손 안의 냉장고 연금술사가 다 알려줄 거에요!
        <br />
        그대로 만들어서 맛있게 드시기만 하세요😊
        <br />
        <br />
        참, 여러분이 만든 음식을
        <br />
        먹기 전에 예쁘게 찍어서 자랑하는 걸 깜빡하지 마세요!
      </p>
    </>
  );
}

function AlchemyButton({ event }) {
  return (
    <button
      name="냉장고 연금술"
      aria-label="냉장고 연금술 시작하기 "
      className="flex items-center justify-center space-x-4 p-5 mb-4 transition ease-in-out rounded-md bg-main hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-[#15ed79] hover:text-black duration-300"
      onClick={event}
    >
      <span className="font-bold font-jua text-2xl text-white">
        연금술 하러 가기
      </span>{' '}
      <FaReact className='className="font-bold font-jua text-2xl text-white"' />
    </button>
  );
}

export default function Main() {
  const navigate = useNavigate();
  const handleStart = () => navigate('/recipe/recommend');
  return (
    <section className="flex flex-col items-center my-20 justify-center min-h-screen">
      <header className="relative flex flex-col items-center justify-center mb-12">
        <Title />
      </header>
      <main className="flex flex-col mb-5 justify-center items-center">
        <Description />
        <AlchemyButton event={handleStart} />
        <RankingList />
      </main>
      <Footer />
    </section>
  );
}
