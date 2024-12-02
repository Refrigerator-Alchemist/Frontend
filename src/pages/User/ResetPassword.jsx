import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { handleError } from '../../utils/common';
import { toast } from 'react-toastify';
import BackButton from '../../components/Global/BackButton';
import InputPassword from '../../components/User/Shared/InputPassword';
import FormHeader from '../../components/User/Shared/FormHeader';
import CheckedList from '../../components/User/Shared/CheckedList';
import PasswordMatch from '../../components/User/Shared/PasswordMatch';
import InputVeriNum from '../../components/User/Shared/InputVeriNum';
import SubmitButton from '../../components/User/Shared/SubmitButton';
import useThrottle from '../../hooks/useThrottle';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [inputNum, setInputNum] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const auth = useAuth();

  const [emailType, socialType] = ['reset-password', 'Refrigerator-Alchemist'];

  useEffect(() => {
    isSamePassword();
  });

  const handleEmailChange = (e) => setEmail(e.target.value);

  const isSamePassword = () => {
    if (password && checkPassword) {
      password !== checkPassword
        ? setPasswordMessage(false)
        : setPasswordMessage(true);
    } else {
      setPasswordMessage(null);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRequest = () => {
    try {
      if (!email) {
        toast.error('이메일을 입력해주세요');
        return;
      } else {
        auth.requestEmailForResetPassword(email, emailType, socialType);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleVerification = () => {
    auth.checkCodeVerification(email, emailType, inputNum, socialType);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.resetPassword(email, password, checkPassword, socialType);
  };

  const throttledHandleRequest = useThrottle(() => handleRequest(), 3000);

  const throttledHandleVerification = useThrottle(
    () => handleVerification(),
    3000
  );

  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-8 relative">
      <BackButton destination={'/login'} />
      <FormHeader
        title={'비밀번호 재설정'}
        mention={'이메일 인증 후 새로운 비밀번호를 설정하세요'}
      />
      <form onSubmit={handleSubmit}>
        <main className="mt-10 w-full px-2">
          <InputVeriNum
            email={email}
            handleEmailChange={handleEmailChange}
            handleRequest={throttledHandleRequest}
            selectOption={auth.emailExists}
            inputNum={inputNum}
            setInputNum={setInputNum}
            handleVerification={throttledHandleVerification}
          />
        </main>
        <footer className="flex flex-col mt-10 w-full p-3">
          <InputPassword
            showPassword={showPassword}
            password={password}
            setPassword={setPassword}
            toggleShowPassword={toggleShowPassword}
            checkPassword={checkPassword}
            setCheckPassword={setCheckPassword}
            isSamePassword={isSamePassword}
          />
          <PasswordMatch passwordMessage={passwordMessage} />
          <ul className="mt-4 font-score">
            <CheckedList
              props={auth.emailVerified}
              mention={'이메일 인증 완료'}
            />
            <CheckedList
              props={password.length >= 8}
              mention={'10자 이상 15자 이하의 비밀번호를 입력해주세요'}
            />
            <CheckedList
              props={auth.isPasswordValid(password)}
              mention={'영문, 숫자, 특수문자 각각 1자 이상을 포함해주세요'}
            />
          </ul>
          <SubmitButton
            disabledCondition={
              auth.verified === false ||
              password.length < 10 ||
              password.length > 15 ||
              auth.isPasswordValid(password) === false ||
              !passwordMessage
            }
            passwordMessage={passwordMessage}
            password={password}
            buttonText={'재설정하기'}
          />
        </footer>
      </form>
    </section>
  );
}
