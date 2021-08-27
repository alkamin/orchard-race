const findAndRemove = <T extends unknown>(
  arr: T[],
  predicate: (el: T) => boolean
): [T[], T | undefined] => {
  const index = arr.findIndex(predicate);
  if (index >= 0) {
    return [[...arr.slice(0, index), ...arr.slice(index + 1)], arr[index]];
  }
  return [arr, undefined];
};

export default findAndRemove;
