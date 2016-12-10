import { Position } from '../../../state/utils/position'
import { Direction } from '../../../state/utils/direction'
import { toHTML } from '../../__tests__/test-helpers'

import tank from '.'

function check(position: Position, direction: Direction, expectedContent: string) {
  const positionString = `{ x: ${position.x}, y: ${position.y} }`
  test(`tank with position ${positionString} should have '${expectedContent}'`, async () => {
    const html = await toHTML(tank(position, direction))
    expect(html).toContain(expectedContent)
  })
}

check({ x: 0, y: 0 }, Direction.Up, '"rotate(0 30 30)translate(0 0)"')
check({ x: 10, y: 0 }, Direction.Down, '"rotate(180 40 30)translate(10 0)"')
check({ x: 0, y: 100 }, Direction.Right, '"rotate(90 30 130)translate(0 100)"')
check({ x: 200, y: 100 }, Direction.Left, '"rotate(-90 230 130)translate(200 100)"')

test(`default direction is right`, async () => {
  const html = await toHTML(tank({ x: 0, y: 0 }))
  expect(html).toContain('"rotate(90 30 30)translate(0 0)"')
})
