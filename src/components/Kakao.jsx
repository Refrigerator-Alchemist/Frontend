const Kakao = () => {
  const Rest_api_key = 'REST API KEY'; //REST API KEY : 발급받은 REST API 키 입력
  const redirect_uri = 'http://localhost:3000/auth'; //Redirect URI : localhost:3000/auth?code=${인가코드}

  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  const code = new URL(window.location.href).searchParams.get('code');

  return (
    <>
      <button onClick={handleLogin}>카카오 로그인</button>
    </>
  );
};
export default Kakao;
