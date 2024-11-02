export default function ErrorMessage({ message, isVisible }) {
  return (
    <p
      className={`text-red-500 text-sm pl-3 mt-1 ${isVisible ? 'visible' : 'invisible'}`}
    >
      {message || 'empty'}
    </p>
  );
}
