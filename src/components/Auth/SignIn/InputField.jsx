import { GoEye, GoEyeClosed } from 'react-icons/go';

export default function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  showPassword,
  toggleShowPassword,
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 ml-3 font-score">{label}</label>
      <div className="flex">
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 mt-1 border-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-indigo font-score"
          placeholder={placeholder}
          required
        />
        {toggleShowPassword && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="inline-block whitespace-nowrap h-12 ml-5 mt-2 rounded-xl font-score text-md hover:text-red-500"
          >
            {showPassword ? <GoEye /> : <GoEyeClosed />}
          </button>
        )}
      </div>
    </div>
  );
}
