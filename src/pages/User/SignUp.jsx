import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserApi } from '../../context/UserContext';
import { emailPattern, isPasswordValid } from '../../utils/common';
import { toast } from 'react-toastify';
import BackButton from '../../components/Global/BackButton';
import InputPassword from '../../components/User/Shared/InputPassword';
import FormHeader from '../../components/User/Shared/FormHeader';
import CheckedList from '../../components/User/Shared/CheckedList';
import PasswordMatch from '../../components/User/Shared/PasswordMatch';
import InputVeriNum from '../../components/User/Shared/InputVeriNum';
import SubmitButton from '../../components/User/Shared/SubmitButton';
import CheckNicknameDuplication from '../../components/User/Shared/CheckNicknameDuplication';
import useThrottle from '../../hooks/useThrottle';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [inputNum, setInputNum] = useState('');
  const [nickName, setNickName] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const userApi = useUserApi();
  const navigate = useNavigate();

  const [emailType, socialType] = ['sign-up', 'Refrigerator-Alchemist'];

  useEffect(() => {
    const socialId = localStorage.getItem('socialId');
    if (socialId) {
      toast.error('이미 로그인 상태입니다');
      navigate(-1);
    }
  }, [navigate]);

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

  useEffect(() => {
    isSamePassword();
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRequest = async () => {
    if (!email) {
      toast.error('이메일을 입력해주세요');
      return;
    }

    if (!emailPattern.test(email)) {
      setEmailError('이메일 형식이 올바르지 않습니다');
      setEmail('');
      return;
    }

    setEmailError('');
    userApi.requestEmailForSignUp(email, emailType, socialType);
  };

  const handleVerification = () => {
    userApi.checkCodeVerification(email, emailType, inputNum, socialType);
  };

  const handleCheckDuplication = () => {
    const nicknamePattern = /^[가-힣0-9]{2,}$|^[A-Za-z0-9]{3,}$/;
    if (!nicknamePattern.test(nickName)) {
      setNameError('한글 2글자 이상 or 영문 3글자 이상');
      setNickName('');
    } else {
      setNameError('');
      userApi.checkNameDuplication(nickName);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userApi.signUp(email, password, nickName, socialType);
  };

  const throttledHandleRequest = useThrottle(() => handleRequest(), 3000);

  const throttledHandleVerification = useThrottle(
    () => handleVerification(),
    3000
  );

  const throttledHandleCheckDuplication = useThrottle(
    () => handleCheckDuplication(),
    3000
  );

  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-10 relative">
      <BackButton destination={'/login'} />
      <FormHeader
        title={'신규 회원가입'}
        mention={'환영합니다🤗 냉장고 연금술과 레시피 나눔을 해보세요'}
      />
      <form onSubmit={handleSubmit}>
        <main className="mt-10 w-full px-2">
          <InputVeriNum
            email={email}
            handleEmailChange={handleEmailChange}
            handleRequest={throttledHandleRequest}
            selectOption={emailError}
            inputNum={inputNum}
            setInputNum={setInputNum}
            handleVerification={throttledHandleVerification}
          />
        </main>
        <footer className="flex flex-col mt-6 w-full p-3">
          <CheckNicknameDuplication
            nickName={nickName}
            setNickName={setNickName}
            handleCheckDuplication={throttledHandleCheckDuplication}
            nameError={nameError}
          />
          <div>
            <div className="flex flex-col">
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
              <ul className="mt-4 mb-4 font-score">
                <CheckedList
                  props={userApi.emailExists === false}
                  mention={'이메일 사용 가능'}
                />
                <CheckedList
                  props={userApi.verified}
                  mention={'이메일 인증 완료'}
                />
                <CheckedList
                  props={userApi.nameAvailable}
                  mention={'닉네임 사용 가능'}
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
                  userApi.emailExists === true ||
                  userApi.verified === false ||
                  userApi.nameAvailable === false ||
                  password.length < 10 ||
                  password.length > 15 ||
                  isPasswordValid(password) === false ||
                  !passwordMessage
                }
                passwordMessage={passwordMessage}
                password={password}
                buttonText={'가입하기'}
              />
            </div>
          </div>
        </footer>
      </form>
    </section>
  );
}
