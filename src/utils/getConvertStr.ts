import convertStr from './convertStr';

export default args => {
  let result = '';
  for (const key in args) {
    result = convertStr(key, args);
  }
  return result;
};
