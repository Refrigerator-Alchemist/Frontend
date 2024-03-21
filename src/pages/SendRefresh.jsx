import React, { useEffect } from 'react';
import { useUserDispatch } from '../context/UserContext';

export default function SendRefresh() {
  const { reIssue } = useUserDispatch();

  useEffect(() => {
    reIssue();
  }, []);

  return <div>Refreshing...</div>;
}
