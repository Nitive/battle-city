import { updatePosition, getDiffByDirection, step, Position } from '../position'
import { Direction } from '../direction'

function checkUpdatePosition(start: Position, diff: Position, result: Position) {
  expect(updatePosition(start, diff)).toEqual(result)
}

describe('updatePosition', () => {
  it('updatePosition should work', () => {
    checkUpdatePosition({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 0 })
    checkUpdatePosition({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 1 })
    checkUpdatePosition({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 1 })
    checkUpdatePosition({ x: 30, y: 50 }, { x: 0, y: 1 }, { x: 30, y: 51 })
  })

  it('updatePosition should has limits', () => {
    checkUpdatePosition({ x: 0, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 0 })
    checkUpdatePosition({ x: 0, y: 0 }, { x: 1000, y: 1000 }, { x: 740, y: 540 })
  })
})

describe('getDiffByDirection', () => {
  it('should work', () => {
    expect(getDiffByDirection(Direction.Up)).toEqual({ x: 0, y: -1 })
    expect(getDiffByDirection(Direction.Down)).toEqual({ x: 0, y: 1 })
    expect(getDiffByDirection(Direction.Left)).toEqual({ x: -1, y: 0 })
    expect(getDiffByDirection(Direction.Right)).toEqual({ x: 1, y: 0 })
  })

  it('should work with custom speed', () => {
    expect(getDiffByDirection(Direction.Up, 5)).toEqual({ x: 0, y: -5 })
    expect(getDiffByDirection(Direction.Down, 5)).toEqual({ x: 0, y: 5 })
    expect(getDiffByDirection(Direction.Left, 5)).toEqual({ x: -5, y: 0 })
    expect(getDiffByDirection(Direction.Right, 5)).toEqual({ x: 5, y: 0 })
  })
})

describe('step', () => {
  it('should work', () => {
    expect(step({ x: 0, y: 0 }, Direction.Down)).toEqual({ x: 0, y: 1 })
  })

  it('should work with custom speed', () => {
    expect(step({ x: 0, y: 0 }, Direction.Right, 5)).toEqual({ x: 5, y: 0 })
  })
})
