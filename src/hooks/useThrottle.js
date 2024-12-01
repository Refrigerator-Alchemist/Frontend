import { useEffect, useRef, useCallback } from 'react';

function useThrottle(callback, delay) {
  const lastExecuted = useRef(0);
  const timeout = useRef(null);

  const throttledFunction = useCallback(
    (...args) => {
      const now = Date.now();
      const remainingTime = delay - (now - lastExecuted.current);

      if (remainingTime <= 0) {
        if (timeout.current) {
          clearTimeout(timeout.current);
          timeout.current = null;
        }
        callback(...args);
        lastExecuted.current = now;
      } else if (!timeout.current) {
        timeout.current = setTimeout(() => {
          callback(...args);
          lastExecuted.current = Date.now();
          timeout.current = null;
        }, remainingTime);
      }
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return throttledFunction;
}

export default useThrottle;
