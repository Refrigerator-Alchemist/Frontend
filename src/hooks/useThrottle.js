import { useRef, useCallback } from 'react';

export default function useThrottle(callback, delay) {
  const lastRun = useRef(0);

  const throttledFunction = useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now;
      }
    },
    [callback, delay]
  );

  return throttledFunction;
}
