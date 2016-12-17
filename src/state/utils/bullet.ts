import { Position, bulletStep } from './position'
import { Direction } from './direction'
import * as tank from '../../view/components/tank'

export type Bullet = {
  position: Position,
  direction: Direction,
}

export function getBulletByTank(position: Position, direction: Direction): Bullet {
  return {
    position: {
      x: position.x + tank.width / 2,
      y: position.y + tank.height / 2,
    },
    direction,
  }
}

export function moveBulletInTick(bullet: Bullet): Bullet {
  return {
    ...bullet,
    position: bulletStep(bullet.position, bullet.direction, 10),
  }
}
