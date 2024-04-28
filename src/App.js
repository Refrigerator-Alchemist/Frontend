import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationProvider } from '../src/context/NavigationContext';
import { UserProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// UserProvider : 로그인, 회원가입 정보 상태 공유
// NavigationProvider : 네비게이션바 상태 공유

export default function App() {
  return (
    <section>
      <UserProvider>
        <NavigationProvider>
          <Outlet />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            newestOnTop={false} // 새 알림이 위에 표시될지 여부
            draggable // 드래그 해서 닫기
            theme="light"
            limit={1}
          />
        </NavigationProvider>
      </UserProvider>
    </section>
  );
}
