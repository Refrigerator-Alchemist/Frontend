import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProtectedRoute({ children }) {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const navigate = useNavigate();

  if (!accessToken && !refreshToken) {
    toast.error('로그인이 필요합니다');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  } else if (!accessToken && refreshToken) {
    toast.error('액세스 토큰이 만료되었습니다');
  }

  return children;
}
