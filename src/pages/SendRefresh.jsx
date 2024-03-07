import React, { useEffect } from 'react';
import { useUserDispatch } from '../context/UserContext';

export default function SendRefresh() {
  const { sendRefresh } = useUserDispatch();

  useEffect(() => {
    sendRefresh();
  }, [sendRefresh]);

  return <div>Refreshing...</div>;
}
