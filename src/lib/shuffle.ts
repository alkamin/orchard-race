const shuffle = <T extends unknown>(arr: T[]) =>
  [...Array(arr.length)]
    .map((_, i) => Math.floor(Math.random() * i))
    .reduce((a, rv, i) => ([a[i], a[rv]] = [a[rv], a[i]]) && a, arr);

export default shuffle;
