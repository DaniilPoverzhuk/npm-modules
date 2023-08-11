import { useState, useEffect } from 'react';

interface IMediaQueryProps {
  query: string;
}

const useMediaQuery = ({ query }: IMediaQueryProps) => {
  const mediaQuery = matchMedia(query);
  const getValue = () => mediaQuery.matches;
  const [value, setValue] = useState(getValue());

  useEffect(() => {
    const handlerChangeValue = () => setValue(getValue());

    mediaQuery.addEventListener('change', handlerChangeValue);

    return () => mediaQuery.removeEventListener('change', handlerChangeValue);
  }, []);

  return value;
};

export default useMediaQuery;
