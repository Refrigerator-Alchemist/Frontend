import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProtectedRoute({ children }) {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  if (!accessToken) {
    toast.error('로그인 후 이용할 수 있습니다');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }

  return children;
}
