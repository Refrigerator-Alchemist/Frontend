export default function ErrorMessage({ error }) {
  return (
    <p
      className={`text-red-500 text-xs italic ${error ? 'visible' : 'invisible'}`}
    >
      {error || 'nameError'}
    </p>
  );
}
