import { isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: any }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = object[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, [callback]);
};

export const useDebounce = <V>(value: V, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    // 上一个useEffect运行之后再运行（起到了清除定时器的作用）
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

export const useDodumentTitle = (title: string, keepOnmounted = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (keepOnmounted) {
        document.title = oldTitle;
      }
    };
  }, [keepOnmounted, oldTitle]);
};

export const useCompute = <T>(value: T) => {
  const valueRef = useRef<T | null>(null);

  if (!isEqual(value, valueRef.current)) {
    valueRef.current = value;
  }
  return valueRef.current as T;
};

/**
 * 判断组件是否在Mounted状态
 * @returns
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return mountedRef;
};

export const resetRoute = () => (window.location.href = window.location.origin);
