import { useCallback, useEffect, useRef, useState } from "react";

type SetStateAction<T> = T | ((prev: T) => T);

export function useLocallyStoredState<T>(key: string, initialValue: T) {
  const isMounted = useRef(false);

  const read = () => {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null) return initialValue;
      const parsed = JSON.parse(raw);
      return parsed as T;
    } catch {
      localStorage.removeItem(key);
      return initialValue;
    }
  };

  const [state, _setState] = useState<T>(read);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (Array.isArray(state) && state.length === 0) {
      const storedState = localStorage.getItem(key);
      if (Array.isArray(storedState)) {
        _setState(storedState as T);
      }
    }
    if (Array.isArray(state) && state.length === 0) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  const setState = useCallback((value: SetStateAction<T>) => {
    _setState((prev) =>
      typeof value === "function" ? (value as (p: T) => T)(prev) : value
    );
  }, []);

  const clearStorage = useCallback(() => {
    localStorage.removeItem(key);
  }, [key]);

  return [state, setState, clearStorage] as const;
}
