import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import NotFound from './pages/common/NotFound';
import GetStarted from './pages/common/GetStarted';
import Home from './pages/common/Home';
import ProtectedRoute from './pages/common/ProtectedRoute';
import SignUp from './pages/user/SignUp';
import SignIn from './pages/user/SignIn';
import LoginSuccess from './pages/user/LoginSuccess';
import ResetPassword from './pages/user/ResetPassword';
import DeleteUser from './pages/user/DeleteUser';
import Mypage from './pages/user/Mypage';
import EditProfile from './pages/user/EditProfile';
import RankingDetail from './pages/ranking/RankingDetail';
import Board from './pages/board/Board';
import BoardDetail from './pages/board/BoardDetail';
import UploadPost from './pages/board/UploadPost';
import EditPost from './pages/board/EditPost';
import GptSearch from './pages/gpts/GptSearch';
import GptResult from './pages/gpts/GptResult';
import GptSavedList from './pages/gpts/GptSavedList';
import GptSavedDetail from './pages/gpts/GptSavedDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // 초기화면
      {
        index: true,
        element: <GetStarted />,
      },
      { path: '/main', element: <Home /> }, // 메인

      // 회원정보 관리 -----------------
      { path: '/signup', element: <SignUp /> }, // 회원가입 [로그인 상태에서 접속 불가]
      { path: '/login', element: <SignIn /> }, // 로그인 [로그인 상태에서 접속 불가]
      { path: '/login-success', element: <LoginSuccess /> }, // SNS 로그인 성공시 데이터 저장
      {
        path: '/reset-password', // 비밀번호 재설정
        element: <ResetPassword />,
      },
      {
        path: '/delete-user', // 회원탈퇴
        element: (
          <ProtectedRoute>
            <DeleteUser />
          </ProtectedRoute>
        ),
      },

      // 프로필 관리 ------------------
      {
        path: '/mypage', // 마이페이지 : 내 프로필 + 저장한 레시피, 내가 쓴 레시피
        element: (
          <ProtectedRoute>
            <Mypage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/mypage/edit/profile', // 프로필 수정
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },

      // 게시판 ----------------------
      { path: '/ranking', element: <RankingDetail /> }, // Top 3 랭킹
      { path: '/board', element: <Board /> }, // 게시판
      { path: '/board/:postId', element: <BoardDetail /> }, // 게시물 상세
      {
        path: '/board/upload', // 게시물 작성
        element: (
          <ProtectedRoute>
            <UploadPost />
          </ProtectedRoute>
        ),
      },
      {
        path: '/editpost/:postId', // 내가 쓴 레시피 수정
        element: (
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        ),
      },

      // 냉장고 연금술 -----------------
      { path: '/recipe/recommend', element: <GptSearch /> }, // 재료 입력
      { path: '/recipe/recommend/:recommendId', element: <GptResult /> }, // 결과
      {
        path: '/recipe/myRecipe', // 결과 저장 리스트
        element: (
          <ProtectedRoute>
            <GptSavedList />
          </ProtectedRoute>
        ),
      },
      {
        path: '/recipe/myRecipe/:recipeId', // 저장된 레시피 상세페이지
        element: (
          <ProtectedRoute>
            <GptSavedDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
