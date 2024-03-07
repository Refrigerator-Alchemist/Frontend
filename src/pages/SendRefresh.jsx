import React from 'react';
import { useUserDispatch } from '../context/UserContext';

export default function SendRefresh() {
  const { sendRefresh } = useUserDispatch();

  return <div>{sendRefresh()}</div>;
}
