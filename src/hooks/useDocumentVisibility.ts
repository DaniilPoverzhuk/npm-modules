import { useEffect, useState, useRef } from 'react';

const isVisible = () => document.visibilityState === 'visible';

type TypeCallback = (visible: boolean) => void;

export default () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const arrayCallbacks = useRef<TypeCallback[]>([]);

  const onChangeVisibility = (callback: TypeCallback) => {
    arrayCallbacks.current.push(callback);
    return () =>
      (arrayCallbacks.current = arrayCallbacks.current.filter(
        callbackItem => callbackItem !== callback
      ));
  };

  const toggleVisible = () => {
    setVisible(prev => !prev);
    if (isVisible()) {
      setCount(prev => prev + 1);
    }
    arrayCallbacks.current.forEach(callback => callback(isVisible()));
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', toggleVisible);
    return () => {
      document.removeEventListener('visibilitychange', toggleVisible);
    };
  }, []);

  return {
    count,
    visible,
    onChangeVisibility,
  };
};
