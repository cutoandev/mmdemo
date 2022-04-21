import * as React from 'react';
import { useCallbackRef } from './useCallBackRef';

type UseIntervalReturnType = {
  reset: () => void;
  clear: () => void;
  start: () => void;
};

type UseIntervalOptions = {
  runWhenInactive?: boolean;
};

export function useInterval<C extends () => void>(
  callback: C,
  interval: number,
  { runWhenInactive }: UseIntervalOptions = { runWhenInactive: true },
): UseIntervalReturnType {
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useCallbackRef(callback);

  const clear = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = React.useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        callbackRef.current?.();
      }, interval);
    }
  }, [interval, callbackRef]);

  const reset = React.useCallback(() => {
    clear();
    start();
  }, [clear, start]);

  React.useEffect(() => {
    start();

    return () => {
      clear();
    };
  }, [clear, start]);

  React.useEffect(() => {
    if (runWhenInactive) {
      return;
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        clear();
      } else {
        start();
      }
    }
    window.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [clear, start, runWhenInactive]);

  return { reset, clear, start };
}
