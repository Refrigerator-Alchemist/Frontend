import LOGO_GOOGLE from '../img/logo_google.png';

export const Google = () => {
  const googleURL = `http://localhost:8080/oauth2/authorization/google`;
  const handleLogin = () => {
    const loginWindow = window.open(
      googleURL,
      '_blank',
      'width=600,height=500'
    );
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
          src={LOGO_GOOGLE}
          alt="google"
        ></img>
      </button>
    </>
  );
};
