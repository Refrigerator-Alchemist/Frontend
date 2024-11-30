import { isPasswordValid } from '../../../utils/common';

export default function SubmitButton({
  disabledCondition,
  passwordMessage,
  password,
  buttonText,
}) {
  return (
    <button
      type="submit"
      disabled={disabledCondition}
      className={`p-3 mx-20 mt-3 rounded-3xl font-scoreExtrabold font-extrabold text-xl transition ease-in-out duration-300
      ${
        passwordMessage && isPasswordValid(password)
          ? 'text-white bg-main hover:bg-[#15ed79] hover:text-black hover:cursor-pointer hover:-translate-y-1 hover:scale-110'
          : 'bg-gray-500 text-black'
      }
      `}
    >
      {buttonText}
    </button>
  );
}
