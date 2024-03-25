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
        <ToastContainer position="top-center" />
          <Outlet />
        </NavigationProvider>
      </UserProvider>
    </section>
  );
}
