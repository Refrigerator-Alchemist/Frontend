import { Link } from 'react-router-dom';
import Logo from '../components/Global/Logo';

export default function GetStarted() {
  const letters = ['냉', '장', '고', '　', '연', '금', '술', '사'];

  return (
    <section className="min-h-screen bg-change-color flex items-center justify-center">
      <main className="text-center flex flex-col space-y-8 items-center h-full py-10">
        <div className="flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl text-white font-bold">
            {letters.map((letter, index) => (
              <span
                key={index}
                className={`inline-block relative animate-bounce top-1 delay-300 font-jua`}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>
        <Logo page="start" width="200rem" height="200rem" />
        <Link
          className="text-3xl p-5 font-bold font-jua transition ease-in-out rounded-md bg-transparent text-white hover:-translate-y-1 hover:scale-110 hover:bg-emerald hover:text-black duration-300 ..."
          to={'/main'}
        >
          시작하기
        </Link>
      </main>
      <footer className="absolute bottom-0 text-center py-4 text-xs">
        <p>ⓒ 2024 Refrigerator-Alchemist All Copyrights Reserved.</p>
      </footer>
    </section>
  );
}
