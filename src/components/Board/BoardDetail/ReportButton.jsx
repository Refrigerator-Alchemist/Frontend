import { PiSirenFill } from 'react-icons/pi';

export default function ReportButton({ reportPost }) {
  return (
    <div
      className="flex items-center justify-center top-5 right-5 border-2 w-10 h-10 transition ease-in-out delay-150 text-red-500 hover:bg-red-500 hover:scale-125 hover:cursor-pointer hover:text-white rounded-full"
      onClick={reportPost}
    >
      <PiSirenFill />
    </div>
  );
}
