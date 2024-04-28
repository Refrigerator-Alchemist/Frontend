import { useNavigate } from 'react-router-dom';
import { useUserState } from '../context/UserContext';
import { toast } from 'react-toastify';

export default function ProtectedRoute({ children }) {
  const { user } = useUserState();
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  if (!user || !accessToken) {
    toast.error('로그인 후 이용할 수 있습니다');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  }

  return children;
}
