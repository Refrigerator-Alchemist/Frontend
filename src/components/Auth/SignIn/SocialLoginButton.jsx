export default function SocialLoginButton({ callback, img, socialType }) {
  return (
    <button onClick={callback}>
      <img
        className="mx-3 hover:scale-110"
        width="40rem"
        height="40rem"
        src={img}
        alt={socialType}
      ></img>
    </button>
  );
}
