import { FaHeart } from 'react-icons/fa';

export default function RankingCard({
  rank,
  imageUrl,
  title,
  ingredients,
  likeCount,
  onClick,
}) {
  const textStyle = 'text-lg font-score font-semibold';
  return (
    <li
      className="mb-4 mt-2 px-3 transition transform hover:scale-110 ease-in-out duration-300"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <figure className="flex items-center justify-between drop-shadow-xl">
        <div className="flex items-center justify-center space-x-6">
          <div>
            <span className="ml-4 w-[1.875rem] font-undong">{rank}</span>
          </div>
          <div className="flex-none w-20 h-20 rounded-xl border-2 border-gray-300 overflow-hidden">
            <img
              src={imageUrl}
              alt="thumbnail"
              width="3.75rem"
              height="2.5rem"
              className=" w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className={textStyle}>{title}</span>
            <span className="font-score text-sm">{ingredients.join(', ')}</span>
          </div>
        </div>
        <div>
          <span className="font-score flex gap-2 text-md font-bold ml-5 mr-5">
            {likeCount}
            <FaHeart className="text-red-500 text-2xl" />
          </span>
        </div>
      </figure>
    </li>
  );
}
