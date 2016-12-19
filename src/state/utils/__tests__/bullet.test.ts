import { isBulletInWall } from '../bullet'
import { Direction } from '../direction'

const defaultBullet = {
  position: {
    x: 0,
    y: 0,
  },
  direction: Direction.Right,
  explosionStep: 0,
}

const wall1 = {
  position: { x: 100, y: 100 },
  size: { width: 100, height: 100 },
}

const wall2 = {
  position: { x: 100, y: 100 },
  size: { width: 100, height: 100 },
}

describe('isBulletInWall', () => {
  it('should work for no walls', () => {
    expect(isBulletInWall(defaultBullet, [])).toBe(false)
  })

  it('should work with wall', () => {
    expect(isBulletInWall(defaultBullet, [wall1])).toBe(false)

    const bullet = {
      ...defaultBullet,
      position: { x: 110, y: 110 },
    }
    expect(isBulletInWall(bullet, [wall1])).toBe(true)
  })

  it('should work on top/left wall edge', () => {
    expect(
      isBulletInWall({ ...defaultBullet, position: { x: 95, y: 95 } }, [wall1]),
    ).toBe(true)
    expect(
      isBulletInWall({ ...defaultBullet, position: { x: 94, y: 96 } }, [wall1]),
    ).toBe(false)
  })

  it('should work on bottom/right wall edge', () => {
    expect(
      isBulletInWall({ ...defaultBullet, position: { x: 205, y: 205 } }, [wall1]),
    ).toBe(true)
    expect(
      isBulletInWall({ ...defaultBullet, position: { x: 206, y: 204 } }, [wall1]),
    ).toBe(false)
  })
})
