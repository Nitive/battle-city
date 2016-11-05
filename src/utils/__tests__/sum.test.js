// @flow

import { updatePosition } from '../position'

test('updatePosition should work', () => {
  expect(updatePosition({ x: 0, y: 0 }, { x: 1, y: 0 })).toEqual({ x: 1, y: 0 })
  expect(updatePosition({ x: 0, y: 0 }, { x: 0, y: 1 })).toEqual({ x: 0, y: 1 })
  expect(updatePosition({ x: 0, y: 0 }, { x: 1, y: 1 })).toEqual({ x: 1, y: 1 })
  expect(updatePosition({ x: 30, y: 50 }, { x: 0, y: 1 })).toEqual({ x: 30, y: 51 })
})

test('updatePosition should has limits', () => {
  expect(updatePosition({ x: 0, y: 0 }, { x: -1, y: -1 })).toEqual({ x: 0, y: 0 })
  expect(updatePosition({ x: 0, y: 0 }, { x: 1000, y: 1000 })).toEqual({ x: 800, y: 600 })
})
