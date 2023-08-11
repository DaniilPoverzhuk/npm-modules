import convertStrToProp from './convertStrToProp';

export default (key: string, args) =>
  `(${convertStrToProp(key)}: ${
    typeof args[key] === 'number' ? `${args[key]}px` : args[key]
  })`;
