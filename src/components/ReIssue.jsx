import axios from 'axios';
import { IP_ADDRESS, useUserDispatch } from '../context/UserContext';

const ReIssue = async () => {
  const URI = `${IP_ADDRESS}/token/reissue`;
  const socialType = localStorage.getItem('socialType');
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const { handleError } = useUserDispatch();

  try {
    const response = await axios.post(
      URI,
      {},
      {
        headers: {
          'Authorization-Access': accessToken,
          'Authorization-Refresh': refreshToken,
        },
      }
    );

    if (response.status === 204 && socialType === 'Refrigerator-Alchemist') {
      localStorage.setItem(
        'accessToken',
        response.headers['authorization-access']
      );
      console.log(`새로운 액세스 토큰을 발급받았습니다`);
    } else if (
      response.status === 204 &&
      socialType !== 'Refrigerator-Alchemist'
    ) {
      localStorage.setItem(
        'accessToken',
        'Bearer ' + response.headers['authorization-access']
      );
      console.log(`새로운 액세스 토큰을 발급받았습니다`);
    } else {
      return;
    }
  } catch (error) {
    handleError(error);
  }
};

export default ReIssue;
