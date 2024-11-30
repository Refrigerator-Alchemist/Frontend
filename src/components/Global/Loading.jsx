import { useNavigate } from 'react-router-dom';
import logoImage from '/assets/img/logo.webp';

export default function Loading() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center h-60">
      <img
        src={logoImage}
        alt="로딩 중"
        className="animate-bounce w-24 h-24 mb-4"
      />
      <h1 className="font-score text-2xl font-bold text-gray-900 mb-4">
        로딩 중
      </h1>
      <button
        onClick={() => navigate('/main')}
        className="font-score text-sm text-gray-400"
      >
        취소
      </button>
    </section>
  );
}
