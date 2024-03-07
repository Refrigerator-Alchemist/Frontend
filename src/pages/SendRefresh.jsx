import React from 'react';
import { useUserDispatch } from '../context/User';

export default function SendRefresh() {
  const { sendRefresh } = useUserDispatch();

  return <div>{sendRefresh()}</div>;
}
