import React, { PropsWithChildren, useEffect, useState } from 'react';
import getConvertStr from '../utils/getConvertStr';

export interface MediaQueryProps {
  orientation?: string;
  minResolution?: TypeResolution;
  maxResolution?: TypeResolution;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

type TypeResolution = `${string}dppx` | number;

const MediaQuery: React.FC<PropsWithChildren<MediaQueryProps>> = ({
  children,
  ...args
}) => {
  const propInfo = getConvertStr(args);
  const mediaQuery = matchMedia(propInfo);
  const getValue = () => mediaQuery.matches;
  const [value, setValue] = useState(getValue());

  useEffect(() => {
    const handlerChangeValue = () => setValue(getValue());

    mediaQuery.addEventListener('change', handlerChangeValue);
  });

  if (typeof children === 'string') {
    return value && children;
  }

  if (Array.isArray(children)) {
    return children.map(child => {
      if (typeof child === 'object') {
        return child;
      }
      return value && child;
    });
  }
};

export default MediaQuery;
