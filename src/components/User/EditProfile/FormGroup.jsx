export default function FormGroup({
  label,
  htmlFor,
  type,
  value,
  onChange,
  readOnly,
  children,
}) {
  return (
    <div className="flex-grow mr-3 mb-4">
      <label
        className="font-score block text-black-300 text-lg font-bold mb-2 text-start"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {children || (
        <input
          className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={htmlFor}
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
        />
      )}
    </div>
  );
}
