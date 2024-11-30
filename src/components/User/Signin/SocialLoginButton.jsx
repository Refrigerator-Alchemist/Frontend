export default function SocialLoginButton({ callback, img, socialType }) {
  return (
    <button onClick={callback}>
      <img
        className="mx-3 hover:scale-110"
        style={{ width: '45px', height: '45px' }}
        src={img}
        alt={socialType}
      ></img>
    </button>
  );
}
