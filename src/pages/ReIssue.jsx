import React from 'react';
import { useUserDispatch } from '../context/UserContext';

export default function ReIssue() {
  const { reIssue } = useUserDispatch();

  const callReIssue = async () => {
    await reIssue();
  };

  callReIssue();

  return <div>Refreshing...</div>;
}
