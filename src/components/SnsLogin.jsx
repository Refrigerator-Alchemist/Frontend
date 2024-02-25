export const Kakao = () => {
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

export const Google = () => {
  const googleURL = `http://localhost:8080/oauth2/authorization/google`;
  const handleLogin = () => {
    window.location.href = googleURL;
  };

  return (
    <>
      <button onClick={handleLogin}>
        <img
          className="mx-3"
          style={{ width: '45px', height: '45px' }}
          src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
          alt="google"
        ></img>
      </button>
    </>
  );
};

export const Naver = () => {
  const naverURL = `http://localhost:8080/oauth2/authorization/naver`;
  const handleLogin = () => {
    window.location.href = naverURL;
  };

  return (
    <>
      <button onClick={handleLogin}>
        <img
          className="mx-3"
          style={{ width: '45px', height: '45px' }}
          src="https://clova-phinf.pstatic.net/MjAxODAzMjlfOTIg/MDAxNTIyMjg3MzM3OTAy.WkiZikYhauL1hnpLWmCUBJvKjr6xnkmzP99rZPFXVwgg.mNH66A47eL0Mf8G34mPlwBFKP0nZBf2ZJn5D4Rvs8Vwg.PNG/image.png"
          alt="naver"
        ></img>
      </button>
    </>
  );
};

// 로그인 상태 저장 - LoginContext
// localhost:3000/main 리다이렉트 처리
