import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserApi } from '../../context/UserContext';
import InputPassword from '../../components/Account/InputPassword';
import BackButton from '../../components/global/BackButton';
import AccountHeader from '../../components/Account/AccountHeader';
import CheckedList from '../../components/Account/CheckedList';
import PasswordMatch from '../../components/Account/PasswordMatch';
import InputVeriNum from '../../components/Account/InputVeriNum';
import SubmitButton from '../../components/Account/SubmitButton';
import CheckNickname from '../../components/Account/CheckNickname';

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
  const navigate = useNavigate();
  const userApi = useUserApi();
  const emailType = 'sign-up';
  const socialType = 'Refrigerator-Alchemist';
  const location = useLocation();

  useEffect(() => {
    const socialId = localStorage.getItem('socialId');
    if (socialId) {
      toast.error('이미 로그인 상태입니다');
      navigate(-1);
    }
  }, [navigate, location]);

  /** 이메일 입력값 */
  const handleEmailChange = (e) => setEmail(e.target.value);

  /** 인증 요청 */
  const handleRequest = async (e) => {
    e.preventDefault();
    console.log(`입력한 이메일 : ${email}`);
    const pattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!email) {
      toast.error('이메일을 입력해주세요');
      return;
    }
    if (!pattern.test(email)) {
      setEmailError('이메일 형식이 올바르지 않습니다');
      setEmail('');
      return;
    }
    setEmailError('');
    userApi.requestEmailForSignUp(email, emailType, socialType);
  };

  /** 인증 확인 */
  const isVerified = (e) => {
    e.preventDefault();
    console.log(`입력한 인증번호 : ${inputNum}`);
    userApi.checkCodeVerification(email, emailType, inputNum, socialType);
  };

  /** 닉네임 중복 확인*/
  const isDuplicated = (e) => {
    e.preventDefault();
    const pattern = /^[가-힣0-9]{2,}$|^[A-Za-z0-9]{3,}$/;
    if (!pattern.test(nickName)) {
      console.log(`입력한 닉네임 : ${nickName}`);
      setNameError(
        '한글은 최소 2글자, 영문은 최소 3글자 이상 입력하세요. 숫자는 선택적으로 포함할 수 있습니다.'
      );
      setNickName('');
    } else {
      console.log(`입력한 닉네임 : ${nickName}`);
      setNameError('');
      userApi.checkNameDuplication(nickName);
    }
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

  /** 회원가입 */
  const handleSignUp = (e) => {
    e.preventDefault();
    userApi.signUp(email, password, nickName, socialType);
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen px-10 relative">
      <BackButton destination={'/login'} />
      <AccountHeader
        title={'신규 회원가입'}
        mention={'환영합니다! 냉장고 연금술과 레시피 나눔을 해보세요'}
      />
      <form onSubmit={handleSignUp}>
        <main className="mt-10 w-full px-2">
          <InputVeriNum
            email={email}
            handleEmailChange={handleEmailChange}
            handleRequest={handleRequest}
            selectOption={emailError}
            inputNum={inputNum}
            setInputNum={setInputNum}
            isVerified={isVerified}
          />
        </main>
        <footer className="flex flex-col mt-6 w-full p-3">
          <CheckNickname
            nickName={nickName}
            setNickName={setNickName}
            isDuplicated={isDuplicated}
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
