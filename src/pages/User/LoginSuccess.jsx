import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../../utils/customedError';

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoginData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('accessToken');
      const refreshToken = urlParams.get('refreshToken');
      const socialId = urlParams.get('socialId');
      const nickName = urlParams.get('nickName');
      const email = urlParams.get('email');

      try {
        if (accessToken && refreshToken && socialId) {
          localStorage.setItem('accessToken', 'Bearer ' + accessToken);
          localStorage.setItem('refreshToken', 'Bearer ' + refreshToken);
          localStorage.setItem('nickName', decodeURIComponent(nickName));
          localStorage.setItem('email', email);
          localStorage.setItem('socialId', socialId);
        } else {
          return;
        }
      } catch (error) {
        handleError(error);
      }
    };

    fetchLoginData().then(navigate('/main'));
  }, [navigate, handleError]);

  return null;
}
