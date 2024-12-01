import { useState } from 'react';
import { toast } from 'react-toastify';
import BackButton from '../../components/Global/BackButton';
import useThrottle from '../../hooks/useThrottle';

export default function DeleteAccount() {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleDeleteUser = useThrottle((e) => {
    e.preventDefault();

    const confirm = window.confirm('정말 회원탈퇴를 진행할까요?');

    if (confirm) {
      toast.info('개발자에게 문의해주세요!');
      setPassword('');
    }
  }, 3000);

  return (
    <section className="relative flex flex-col justify-center items-center h-screen p-8 font-score">
      <BackButton destination={'/mypage'} />
      <h1 className="text-3xl font-scoreExtrabold mb-2">회원 탈퇴</h1>
      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleDeleteUser}
      >
        <label className="font-score text-lg text-gray-400">
          계정의 비밀번호를 입력해주세요
        </label>
        <div className="flex mt-2 space-x-3 w-full">
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
            className="px-4 py-3 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo w-full"
          />
          <button
            type="submit"
            disabled={!password}
            className={`px-3 rounded-3xl font-scoreExtrabold text-md transition ease-in-out hover:cursor-pointer hover:scale-110 duration-300 w-full ${
              password
                ? 'text-white bg-main hover:bg-emerald hover:text-black'
                : 'bg-gray-500 text-black'
            }`}
          >
            탈퇴하기
          </button>
        </div>
      </form>
    </section>
  );
}
