import LOGO_NAVER from '../img/logo_naver.png';

export const Naver = () => {
  const naverURL = `http://localhost:8080/oauth2/authorization/naver`;
  const handleLogin = () => {
    const loginWindow = window.open(naverURL, '_blank', 'width=600,height=500');
    const loginChecker = setInterval(function () {
      if (loginWindow && !loginWindow.closed) {
        clearInterval(loginChecker);
        if (localStorage.getItem('access_token')) {
          window.location.href = '/main';
        }
      }
    }, 500);
  };

  // window.close() 추가

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
