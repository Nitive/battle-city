import { Position } from '../../utils/position'
import { Direction } from '../../utils/direction'

import tank from '.'

function check(position: Position, direction: Direction, expectedTrasform: string) {
  const positionString = `{ x: ${position.x}, y: ${position.y} }`
  test(`tank should with position ${positionString} should have trasform '${expectedTrasform}'`, () => {
    const { data } = tank(position, direction)
    const transform = data && data.attrs && data.attrs.transform
    expect(transform).toBe(expectedTrasform)
  })
}

check({ x: 0, y: 0 }, Direction.Up, 'rotate(0 30 30)translate(0 0)')
check({ x: 10, y: 0 }, Direction.Down, 'rotate(180 40 30)translate(10 0)')
check({ x: 0, y: 100 }, Direction.Right, 'rotate(90 30 130)translate(0 100)')
check({ x: 200, y: 100 }, Direction.Left, 'rotate(-90 230 130)translate(200 100)')
