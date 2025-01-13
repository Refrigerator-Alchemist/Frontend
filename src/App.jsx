import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = import.meta.env.VITE_REQUEST_URI;
axios.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;
    const isLoginRequest = originalRequest.url.includes('/token/login');
    if (!isLoginRequest && error.response.data.code === 'RAT8') {
      try {
        const newAccessToken = await reissueAccessToken();
        if (newAccessToken) {
          originalRequest.headers['Authorization-Access'] = newAccessToken;
          return axios(originalRequest);
        }
      } catch (err) {
        console.error('토큰 재발급 실패: ', err);
      }
    }

    return Promise.reject(error);
  }
);

let isRefreshing = false;
let subscribers = [];

const onRAT8Error = (callback) => {
  subscribers.push(callback);
};

const notifySubscribers = (newAccessToken) => {
  subscribers.forEach((callback) => callback(newAccessToken));
  subscribers = [];
};

const reissueAccessToken = async () => {
  if (isRefreshing) return new Promise((resolve) => onRAT8Error(resolve));
  isRefreshing = true;
  const URL = `/token/reissue`;
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const socialType = localStorage.getItem('socialType');
  const socialId = localStorage.getItem('socialId');
  let newAccessToken;

  try {
    const response = await axios.post(
      URL,
      {},
      {
        headers: {
          'Authorization-Access': accessToken,
          'Authorization-Refresh': refreshToken,
          socialId,
        },
      }
    );
    if (response.status === 200 && socialType === 'Refrigerator-Alchemist') {
      newAccessToken = response.headers.get('authorization-access');
      localStorage.setItem('accessToken', newAccessToken);
      notifySubscribers(newAccessToken);
    } else if (
      response.status === 200 &&
      socialType !== 'Refrigerator-Alchemist'
    ) {
      newAccessToken = 'Bearer ' + response.headers.get('authorization-access');
      localStorage.setItem('accessToken', newAccessToken);
    } else {
      return;
    }
  } catch (error) {
    notifySubscribers(null);
    handleError(error);
  } finally {
    isRefreshing = false;
  }
  return newAccessToken;
};

const queryClient = new QueryClient();

export default function App() {
  return (
    <section className="relative">
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            newestOnTop={false}
            draggable
            theme="light"
            limit={1}
          />
        </QueryClientProvider>
      </AuthProvider>
    </section>
  );
}
