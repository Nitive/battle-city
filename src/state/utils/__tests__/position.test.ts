import { updatePosition, getDiffByDirection, Position } from '../position'
import { Direction } from '../direction'

function checkUpdatePosition(start: Position, diff: Position, result: Position) {
  expect(updatePosition(0, 0)(start, diff)).toEqual(result)
}

describe('updatePosition', () => {
  it('should work', () => {
    checkUpdatePosition({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 0 })
    checkUpdatePosition({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 1 })
    checkUpdatePosition({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 1 })
    checkUpdatePosition({ x: 30, y: 50 }, { x: 0, y: 1 }, { x: 30, y: 51 })
  })

  it('should has limits', () => {
    checkUpdatePosition({ x: 0, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 0 })
    checkUpdatePosition({ x: 0, y: 0 }, { x: 1000, y: 1000 }, { x: 800, y: 600 })
  })

  it('should set custom right&down limits', () => {
    const position = updatePosition(80, 100)({ x: 0, y: 0 }, { x: 1000, y: 1000 })
    expect(position).toEqual({ x: 720, y: 500 })
  })

  it('should set custom left&up limits', () => {
    const position = updatePosition(100, 100, 50, 30)({ x: 0, y: 0 }, { x: 0, y: 0 })
    expect(position).toEqual({ x: 50, y: 30 })
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
