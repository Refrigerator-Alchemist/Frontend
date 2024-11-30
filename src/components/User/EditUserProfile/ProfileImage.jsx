export default function ProfileImage({ imageUrl }) {
  return (
    <div className="relative inline-block rounded-full bg-gray-200 h-32 w-32">
      <img
        src={imageUrl}
        alt="프로필 사진"
        className="rounded-full h-32 w-32 object-cover border-2"
      />
    </div>
  );
}
