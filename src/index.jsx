import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GetStarted from './pages/GetStarted';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/Global/ProtectedRoute';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import SignInSuccess from './pages/Auth/SignInSuccess';
import ResetPassword from './pages/Auth/ResetPassword';
import DeleteAccount from './pages/Auth/DeleteAccount';
import Mypage from './pages/Auth/Mypage';
import EditUserNickname from './pages/Auth/EditUserNickname';
import Board from './pages/Board/Board';
import BoardDetail from './pages/Board/BoardDetail';
import UploadPost from './pages/Board/UploadPost';
import EditPost from './pages/Board/EditPost';
import RankingPage from './pages/RankingPage/RankingPage';
import RecipeAlchemy from './pages/Recipe/RecipeAlchemy';
import RecipeResult from './pages/Recipe/RecipeResult';
import RecipeSavedList from './pages/Recipe/RecipeSavedList';
import RecipeDetail from './pages/Recipe/RecipeDetail';

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
      { path: '/main', element: <Main /> },

      // 회원정보 관리 -----------------
      { path: '/signup', element: <SignUp /> },
      { path: '/login', element: <SignIn /> },
      { path: '/login-success', element: <SignInSuccess /> },
      {
        path: '/reset-password',
        element: <ResetPassword />,
      },
      {
        path: '/delete-user',
        element: (
          <ProtectedRoute>
            <DeleteAccount />
          </ProtectedRoute>
        ),
      },
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
            <EditUserNickname />
          </ProtectedRoute>
        ),
      },

      // 게시판 ----------------------
      { path: '/ranking', element: <RankingPage /> },
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

      // 연금술 -----------------
      { path: '/recipe/recommend', element: <RecipeAlchemy /> },
      { path: '/recipe/recommend/:recommendId', element: <RecipeResult /> },
      {
        path: '/recipe/myRecipe',
        element: (
          <ProtectedRoute>
            <RecipeSavedList />
          </ProtectedRoute>
        ),
      },
      {
        path: '/recipe/myRecipe/:recipeId',
        element: (
          <ProtectedRoute>
            <RecipeDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
