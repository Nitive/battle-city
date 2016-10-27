// @flow

export const sum = (...args: number[]) => {
  return args.reduce((acc, x) => acc + x, 0)
}
