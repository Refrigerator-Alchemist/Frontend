import { useState, useEffect } from 'react';
import { useUserApi } from '../../context/UserContext';
import { isPasswordValid } from '../../utils/common';
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

  const userApi = useUserApi();

  const throttle = useThrottle();

  const emailType = 'reset-password';
  const socialType = 'Refrigerator-Alchemist';

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleRequest = async (e) => {
    e.preventDefault();
    console.log('호출');
    if (!email) {
      toast.error('이메일을 입력해주세요');
      return;
    } else {
      userApi.requestEmailForReset(email, emailType, socialType);
    }
  };

  const RequestWithThrottle = throttle(handleRequest, 3000);

  const isVerified = async (e) => {
    e.preventDefault();
    userApi.checkCodeVerification(email, emailType, inputNum, socialType);
  };

  const isSamePassword = () => {
    if (password && checkPassword) {
      password !== checkPassword
        ? setPasswordMessage(false)
        : setPasswordMessage(true);
    } else {
      setPasswordMessage(null);
    }
  };

  useEffect(() => {
    isSamePassword();
  });

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const submitReset = (e) => {
    e.preventDefault();
    userApi.resetPassword(email, password, checkPassword, socialType);
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-8 relative">
      <BackButton destination={'/login'} />
      <FormHeader
        title={'비밀번호 재설정'}
        mention={'이메일 인증 후 새로운 비밀번호를 설정하세요'}
      />
      <form onSubmit={submitReset}>
        <main className="mt-10 w-full px-2">
          <InputVeriNum
            email={email}
            handleEmailChange={handleEmailChange}
            handleRequest={RequestWithThrottle}
            selectOption={userApi.emailExists}
            inputNum={inputNum}
            setInputNum={setInputNum}
            isVerified={isVerified}
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
              props={userApi.verified}
              mention={'이메일 인증 완료'}
            />
            <CheckedList
              props={password.length >= 8}
              mention={'10자 이상 15자 이하의 비밀번호를 입력해주세요'}
            />
            <CheckedList
              props={isPasswordValid(password)}
              mention={'영문, 숫자, 특수문자 각각 1자 이상을 포함해주세요'}
            />
          </ul>
          <SubmitButton
            disabledCondition={
              userApi.verified === false ||
              password.length < 10 ||
              password.length > 15 ||
              isPasswordValid(password) === false ||
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
