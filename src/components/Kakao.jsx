const Kakao = () => {
  const kakaoURL = `http://localhost:8080/oauth2/authorization/kakao`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <>
      <button onClick={handleLogin}>
        <img
          className="mx-3"
          style={{ width: '45px', height: '45px' }}
          src="https://cdn.imweb.me/upload/S201803255ab755f0896c9/d59972cd95aa1.png"
          alt="kakaotalk"
        ></img>
      </button>
    </>
  );
};
export default Kakao;

// 로그인 상태 저장

// localhost:3000/main 으로 리다이렉트
