import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import GetStarted from './pages/GetStarted';
import NotFound from './pages/NotFound';
import MainPage from './pages/MainPage';
import Board from './pages/Board';
import BoardDetail from './pages/BoardDetail';
import UploadBoard from './pages/UploadBoard';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Mypage from './pages/Mypage';
import Profile from './pages/Profile';
import ManageAccount from './pages/ManageAccount';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // 처음 페이지 = Root.js와 같은 의미
    errorElement: <NotFound />, // 에러 페이지
    children: [
      { index: true, element: <GetStarted /> }, // 자식 페이지 중 기본 페이지
      { path: '/main', element: <MainPage /> },
      { path: '/board', element: <Board /> },
      { path: '/board/:postId', element: <BoardDetail /> }, // 쿼리로 포스트 id 식별
      { path: '/board/upload/:postId', element: <UploadBoard /> }, // 쿼리로 포스트 id 식별
      { path: '/login', element: <LogIn /> },
      { path: '/login/signup', element: <SignUp /> },
      { path: '/login/resetpw', element: <ResetPassword /> },
      { path: '/manage', element: <ManageAccount /> },
      { path: '/mypage', element: <Mypage /> },
      { path: '/profile', element: <Profile /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
