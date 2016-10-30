// @flow

import { sum } from '../sum'

test('sum', () => {
  expect(sum([])).toBe(0)
  expect(sum([1, 2, 3])).toBe(6)
  expect(sum([1, -2, 3])).toBe(2)
})
