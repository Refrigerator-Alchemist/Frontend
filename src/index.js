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
import Login from './pages/LogIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Mypage from './pages/Mypage';
import Profile from './pages/Profile';
import GptSearch from './pages/GptSearch';
import DeleteUser from './pages/DeleteUser';
import GptResult from './pages/GptResult';
import BoardRanking from './pages/BoardRanking';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Root
    errorElement: <NotFound />, // 에러 페이지
    children: [
      { index: true, element: <GetStarted /> }, // 자식 페이지 중 기본 페이지
      { path: '/main', element: <MainPage /> }, // 메인
      { path: '/board', element: <Board /> }, // 게시판
      { path: '/board/:postId', element: <BoardDetail /> }, // 쿼리로 포스트 id 식별
      { path: '/board/upload', element: <UploadBoard /> }, 
      { path: '/ranking', element: <BoardRanking /> }, // 탑 5 랭킹
      { path: '/login', element: <Login /> }, // 로그인 페이지
      { path: '/login/signup', element: <SignUp /> }, // 회원 가입
      { path: '/login/resetpw', element: <ResetPassword /> }, // 비밀번호 재설정
      { path: '/mypage/delete-user', element: <DeleteUser /> }, // 회원 탈퇴
      { path: '/mypage', element: <Mypage /> }, // 마이페이지 - 내 피드
      { path: '/profile', element: <Profile /> }, // 프로필 수정
      { path: '/gptsearch', element: <GptSearch /> }, // 냉장고 연금술사 : 재료 입력
      { path: '/gptresult', element: <GptResult /> }, // 냉장고 연금술사 : 검색 결과 출력
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
