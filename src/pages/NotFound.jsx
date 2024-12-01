import BackButton from '../components/Global/BackButton';

export default function NotFound() {
  return (
    <section className="relative flex flex-col items-center justify-center h-screen">
      <BackButton destination={'/main'} />
      <span className="text-xl font-score">올바르지 않은 경로입니다</span>
      <span className="text-xl font-score">뒤로가기 버튼을 눌러주세요</span>
    </section>
  );
}
