import { Direction } from '../direction'
import { tankStep } from '../tank'

describe('step', () => {
  it('should work', () => {
    expect(tankStep({ x: 0, y: 0 }, Direction.Down)).toEqual({ x: 0, y: 1 })
  })

  it('should work with custom speed', () => {
    expect(tankStep({ x: 0, y: 0 }, Direction.Right, 5)).toEqual({ x: 5, y: 0 })
  })
})
