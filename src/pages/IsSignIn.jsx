import { useNavigate } from 'react-router-dom';

export default function IsSignIn({ children }) {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  if (accessToken) navigate('/main');

  return children;
}
