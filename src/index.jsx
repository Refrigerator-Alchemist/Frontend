import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import NotFound from './pages/common/NotFound';
import GetStarted from './pages/common/GetStarted';
import Home from './pages/common/Home';
import ProtectedRoute from './pages/common/ProtectedRoute';
import SignUp from './pages/User/SignUp';
import SignIn from './pages/User/SignIn';
import LoginSuccess from './pages/User/LoginSuccess';
import ResetPassword from './pages/User/ResetPassword';
import DeleteUser from './pages/User/DeleteUser';
import Mypage from './pages/User/Mypage';
import EditProfile from './pages/User/EditProfile';
import RankingDetail from './pages/Ranking/RankingDetail';
import Board from './pages/Board/Board';
import BoardDetail from './pages/Board/BoardDetail';
import UploadPost from './pages/Board/UploadPost';
import EditPost from './pages/Board/EditPost';
import GptSearch from './pages/GPTs/GptSearch';
import GptResult from './pages/GPTs/GptResult';
import GptSavedList from './pages/GPTs/GptSavedList';
import GptSavedDetail from './pages/GPTs/GptSavedDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <GetStarted />,
      },
      { path: '/main', element: <Home /> },

      // 회원정보 관리 -----------------
      { path: '/signup', element: <SignUp /> },
      { path: '/login', element: <SignIn /> },
      { path: '/login-success', element: <LoginSuccess /> },
      {
        path: '/reset-password',
        element: <ResetPassword />,
      },
      {
        path: '/delete-user',
        element: (
          <ProtectedRoute>
            <DeleteUser />
          </ProtectedRoute>
        ),
      },

      // 프로필 관리 ------------------
      {
        path: '/mypage',
        element: (
          <ProtectedRoute>
            <Mypage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/mypage/edit/profile',
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },

      // 게시판 ----------------------
      { path: '/ranking', element: <RankingDetail /> },
      { path: '/board', element: <Board /> },
      { path: '/board/:postId', element: <BoardDetail /> },
      {
        path: '/board/upload',
        element: (
          <ProtectedRoute>
            <UploadPost />
          </ProtectedRoute>
        ),
      },
      {
        path: '/editpost/:postId',
        element: (
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        ),
      },

      // 냉장고 연금술 -----------------
      { path: '/recipe/recommend', element: <GptSearch /> },
      { path: '/recipe/recommend/:recommendId', element: <GptResult /> },
      {
        path: '/recipe/myRecipe',
        element: (
          <ProtectedRoute>
            <GptSavedList />
          </ProtectedRoute>
        ),
      },
      {
        path: '/recipe/myRecipe/:recipeId',
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
