export default function FormButton({ type, onClick, children, className }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`font-score flex-grow rounded-2xl p-2 ${className}`}
    >
      {children}
    </button>
  );
}
