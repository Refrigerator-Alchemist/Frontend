import React, { useEffect } from 'react';
import { useUserDispatch } from '../context/UserContext';

export default function ReIssue() {
  const { reIssue } = useUserDispatch();

  useEffect(() => {
    reIssue();
  }, [reIssue]);

  return <div>Refreshing...</div>;
}
