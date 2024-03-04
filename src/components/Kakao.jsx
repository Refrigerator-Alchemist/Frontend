import LOGO_KAKAO from '../img/logo_kakao.png';

export const Kakao = () => {
  const kakaoURL = `http://localhost:8080/oauth2/authorization/kakao`;
  const handleLogin = () => {
    const loginWindow = window.open(kakaoURL, '_blank', 'width=600,height=500');
    const loginChecker = setInterval(function () {
      if (loginWindow && !loginWindow.closed) {
        clearInterval(loginChecker);
        if (localStorage.getItem('access_token')) {
          loginWindow.close();
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
