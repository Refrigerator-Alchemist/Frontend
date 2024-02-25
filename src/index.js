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
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Mypage from './pages/Mypage';
import Profile from './pages/Profile';
import DeleteAccount from './pages/DeleteAccount';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Root
    errorElement: <NotFound />, // 에러 페이지
    children: [
      { index: true, element: <GetStarted /> }, // 자식 페이지 중 기본 페이지
      { path: '/main', element: <MainPage /> },
      { path: '/board', element: <Board /> },
      { path: '/board/:postId', element: <BoardDetail /> }, // 쿼리로 포스트 id 식별
      { path: '/board/upload/:postId', element: <UploadBoard /> }, // 쿼리로 포스트 id 식별
      { path: '/login', element: <Login /> },
      { path: '/login/signup', element: <SignUp /> },
      { path: '/login/resetpw', element: <ResetPassword /> },
      { path: '/mypage/delete', element: <DeleteAccount /> },
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
