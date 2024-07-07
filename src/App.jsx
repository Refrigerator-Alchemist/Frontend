import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationProvider } from '../src/context/NavigationContext';
import { UserApiProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();
export default function App() {
  return (
    <section>
      <UserApiProvider>
        <NavigationProvider>
          <QueryClientProvider client={queryClient}>
            <Outlet />
            <ToastContainer
              position="top-center"
              autoClose={2000}
              newestOnTop={false}
              draggable
              theme="light"
              limit={1}
            />
          </QueryClientProvider>
        </NavigationProvider>
      </UserApiProvider>
    </section>
  );
}
