import LOGO_GOOGLE from '../img/logo_google.png';
import LOGO_KAKAO from '../img/logo_kakao.png';
import LOGO_NAVER from '../img/logo_naver.png';

// 카카오
export const Kakao = () => {
  const kakaoURL = `http://localhost:8080/oauth2/authorization/kakao`;
  const handleLogin = () => {
    const loginWindow = window.open(kakaoURL, '_blank', 'width=600,height=500');
    // 0.5초마다 로그인 확인
    const loginChecker = setInterval(function () {
      if (loginWindow.closed) {
        clearInterval(loginChecker);
        if (localStorage.getItem('access_token')) {
          window.location.href = '/main';
        }
      }
    }, 500);
  };

  return (
    <>
      <button onClick={handleLogin}>
        <img
          className="mx-3 hover:scale-110"
          style={{ width: '45px', height: '45px' }}
          src={LOGO_KAKAO}
          alt="kakaotalk"
        ></img>
      </button>
    </>
  );
};

// 구글
export const Google = () => {
  const googleURL = `http://localhost:8080/oauth2/authorization/google`;
  const handleLogin = () => {
    const loginWindow = window.open(
      googleURL,
      '_blank',
      'width=600,height=500'
    );
    // 0.5초마다 로그인 확인
    const loginChecker = setInterval(function () {
      if (loginWindow.closed) {
        clearInterval(loginChecker);
        if (localStorage.getItem('access_token')) {
          window.location.href = '/main';
        }
      }
    }, 500);
  };

  return (
    <>
      <button onClick={handleLogin}>
        <img
          className="mx-3 hover:scale-110"
          style={{ width: '45px', height: '45px' }}
          src={LOGO_GOOGLE}
          alt="google"
        ></img>
      </button>
    </>
  );
};

// 네이버
export const Naver = () => {
  const naverURL = `http://localhost:8080/oauth2/authorization/naver`;
  const handleLogin = () => {
    const loginWindow = window.open(naverURL, '_blank', 'width=600,height=500');
    // 0.5초마다 로그인 확인
    const loginChecker = setInterval(function () {
      if (loginWindow.closed) {
        clearInterval(loginChecker);
        if (localStorage.getItem('access_token')) {
          window.location.href = '/main';
        }
      }
    }, 500);
  };

  return (
    <>
      <button onClick={handleLogin}>
        <img
          className="mx-3 hover:scale-110"
          style={{ width: '45px', height: '45px' }}
          src={LOGO_NAVER}
          alt="naver"
        ></img>
      </button>
    </>
  );
};
