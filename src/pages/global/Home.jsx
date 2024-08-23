import { useNavigate } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';
import Ranking from '../../components/Ranking/RankingList';
import Footer from '../../components/Global/Footer';

function HeadScript() {
  return (
    <>
      <div className="absolute -top-10 -left-10 w-24 h-24 bg-main rounded-full opacity-50 drop-shadow-xl"></div>
      <div className="relative z-10 mb-3 font-jua text-4xl md:text-5xl text-shadow-xl">
        What's in your
      </div>
      <div className="relative z-10 font-jua text-4xl md:text-5xl text-shadow-xl">
        refrigerator?
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

function Button({ event }) {
  return (
    <button
      name="냉장고 연금술"
      aria-label="냉장고 연금술 시작하기 "
      className="flex items-center justify-center text-2xl space-x-4 p-5 mb-4 font-bold font-jua transition ease-in-out rounded-md bg-main text-white hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:bg-[#15ed79] hover:text-black duration-300"
      onClick={event}
    >
      <span>냉장고 연금술 시작</span>{' '}
      <span>
        <FaReact />
      </span>
    </button>
  );
}

export default function MainPage() {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate('/recipe/recommend');
  };

  return (
    <section className="flex flex-col items-center my-20 justify-center min-h-screen">
      <header className="relative flex flex-col items-center justify-center text-4xl font-bold mb-12">
        <HeadScript />
      </header>
      <main className="flex flex-col mb-5 justify-center items-center">
        <Description />
        <Button event={handleStart} />
        <Ranking />
      </main>
      <Footer />
    </section>
  );
}
