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
import EditProfile from './pages/EditProfile';
import GptSearch from './pages/GptSearch';
import DeleteUser from './pages/DeleteUser';
import GptResult from './pages/GptResult';
import BoardRanking from './pages/BoardRanking';
import LoginSuccess from './pages/LoginSuccess';
import ReIssue from './pages/ReIssue';
import GptSaved from './pages/GptSavedList';
import GptDetail from './pages/GptSavedDetail';
import EditPost from './pages/EditPost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Root
    errorElement: <NotFound />, // 에러 페이지
    children: [
      { index: true, element: <GetStarted /> }, // 초기화면
      { path: '/main', element: <MainPage /> }, // 메인

      // 회원정보 관리 -----------------
      { path: '/signup', element: <SignUp /> }, // 회원 가입
      { path: '/login', element: <Login /> }, // 로그인 관련 페이지
      { path: '/login-success', element: <LoginSuccess /> }, // SNS 로그인 성공 -> 데이터 저장
      { path: '/reset-password', element: <ResetPassword /> }, // 비밀번호 재설정
      { path: '/auth/token/reissue', element: <ReIssue /> }, // 액세스 토큰 재발급
      { path: '/delete-user', element: <DeleteUser /> }, // 회원 탈퇴

      // 프로필 관리 ------------------
      { path: '/mypage', element: <Mypage /> }, // 마이페이지 : 내 프로필 + 저장한 레시피, 내가 쓴 레시피
      { path: '/mypage/edit/profile', element: <EditProfile /> }, // 프로필 수정

      // 게시판 ----------------------
      { path: '/ranking', element: <BoardRanking /> }, // 탑 3 랭킹
      { path: '/board', element: <Board /> }, // 게시판
      { path: '/board/upload', element: <UploadBoard /> }, // 게시물 작성
      { path: '/board/:postId', element: <BoardDetail /> }, // 게시물 상세
      { path: '/editpost/:postId', element: <EditPost /> }, // 내가 쓴 레시피 수정

      // 냉장고 연금술 -----------------
      { path: '/recipe/recommend', element: <GptSearch /> }, // 냉장고 연금술사 : 재료 입력
      { path: '/recipe/recommend/:recommendId', element: <GptResult /> }, // 냉장고 연금술사 : 검색 결과 출력
      { path: '/recipe/myRecipe', element: <GptSaved /> }, // 냉장고 연금술사 : 결과 저장 리스트
      { path: '/recipe/myRecipe/:recipeId', element: <GptDetail /> }, // 냉장고 연금술사 : 결과-상세페이지
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
);
