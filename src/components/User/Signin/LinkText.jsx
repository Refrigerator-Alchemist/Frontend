export default function LinkText({ onClick, children }) {
  return (
    <p
      onClick={onClick}
      className="flex justify-start ml-2 underline font-bold hover:cursor-pointer hover:text-red-500 mb-4 font-score"
    >
      {children}
    </p>
  );
}
