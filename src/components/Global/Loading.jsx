import LOGO_IMAGE from '/assets/img/logo.webp';

export default function Loading() {
  return (
    <section className="flex flex-col items-center justify-center h-60">
      <img
        src={LOGO_IMAGE}
        alt="로딩 중"
        className="animate-bounce w-24 h-24 mb-4"
      />
      <h1 className="font-score text-2xl font-bold text-gray-900 mb-4">
        로딩 중
      </h1>
    </section>
  );
}
