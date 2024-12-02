import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

export default function App() {
  return (
    <section className="relative">
      <AuthProvider>
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
      </AuthProvider>
    </section>
  );
}
