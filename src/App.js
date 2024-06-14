import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationProvider } from '../src/context/NavigationContext';
import { UserApiProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <section>
      <UserApiProvider>
        <NavigationProvider>
          <Outlet />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            newestOnTop={false}
            draggable
            theme="light"
            limit={1}
          />
        </NavigationProvider>
      </UserApiProvider>
    </section>
  );
}
