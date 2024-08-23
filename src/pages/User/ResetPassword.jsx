import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useUserApi } from '../../context/UserContext';
import BackButton from '../../components/Global/BackButton';
import InputPassword from '../../components/User/InputPassword';
import AccountHeader from '../../components/User/AccountHeader';
import CheckedList from '../../components/User/CheckedList';
import PasswordMatch from '../../components/User/PasswordMatch';
import InputVeriNum from '../../components/User/InputVeriNum';
import SubmitButton from '../../components/User/SubmitButton';

export default function ResetPassword() {
  const [email, setEmail] = useState(''); // 이메일
  const [inputNum, setInputNum] = useState(''); // 입력한 인증번호
  const [password, setPassword] = useState(''); // 비밀번호
  const [checkPassword, setCheckPassword] = useState(''); // 비밀번호 확인
  const [passwordMessage, setPasswordMessage] = useState(null); // 비밀번호 일치여부 안내 문구
  const [showPassword, setShowPassword] = useState(false);
  const userApi = useUserApi();
  const emailType = 'reset-password';
  const socialType = 'Refrigerator-Alchemist';

  /** 이메일 입력값 */
  const handleEmailChange = (e) => setEmail(e.target.value);

  /** 인증 요청
   * - userApi
   */
  const handleRequest = async (e) => {
    e.preventDefault();
    console.log(`입력한 이메일 : ${email}`);
    if (!email) {
      toast.error('이메일을 입력해주세요');
      return;
    }
    userApi.requestEmailForReset(email, emailType, socialType);
  };

  /** 인증 확인
   * - userApi
   */
  const isVerified = async (e) => {
    e.preventDefault();
    console.log(`입력한 인증번호 : ${inputNum}`);
    userApi.checkCodeVerification(email, emailType, inputNum, socialType);
  };

  /** 비밀번호 유효성 검사 */
  const isPasswordValid = (password) => {
    return (
      password.length >= 10 &&
      password.length <= 15 &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password) &&
      /[a-zA-Z]/.test(password)
    );
  };

  /** 비밀번호 일치 확인 */
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

  /** 비밀번호 보기 */
  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  /** 재설정하기
   * - userApi
   */
  const onReset = (e) => {
    e.preventDefault();
    userApi.resetPassword(email, password, checkPassword, socialType);
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-8 relative">
      <BackButton destination={'/login'} />
      <AccountHeader
        title={'비밀번호 재설정'}
        mention={'인증을 완료하고, 새로운 비밀번호를 설정하세요'}
      />
      <form onSubmit={onReset}>
        <main className="mt-10 w-full px-2">
          <InputVeriNum
            email={email}
            handleEmailChange={handleEmailChange}
            handleRequest={handleRequest}
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
