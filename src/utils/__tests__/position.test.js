// @flow

import { updatePosition, Position } from '../position'

function checkUpdatePosition(start: Position, diff: Position, result: Position) {
  expect(updatePosition(start, diff)).toEqual(result)
}

test('updatePosition should work', () => {
  checkUpdatePosition({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 0 })
  checkUpdatePosition({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 1 })
  checkUpdatePosition({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 1 })
  checkUpdatePosition({ x: 30, y: 50 }, { x: 0, y: 1 }, { x: 30, y: 51 })
})

test('updatePosition should has limits', () => {
  checkUpdatePosition({ x: 0, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 0 })
  checkUpdatePosition({ x: 0, y: 0 }, { x: 1000, y: 1000 }, { x: 800, y: 600 })
})
