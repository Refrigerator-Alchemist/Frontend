import { useRef } from 'react';

export default function useThrottle(callback, delay) {
  const lastRun = useRef(Date.now());

  return (...args) => {
    const timeElapsed = Date.now() - lastRun.current;

    if (timeElapsed >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  };
}
