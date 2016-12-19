import { Position, step, updatePosition, isPositionInWall } from './position'
import { Direction } from './direction'
import { Wall } from './wall'
import * as tank from '../../view/components/tank'
import * as field from '../../view/components/field'
import { radius } from '../../view/components/bullet'

export interface Bullet {
  position: Position,
  direction: Direction,
  explosionStep: number,
}

export function getBulletByTank(position: Position, direction: Direction): Bullet {
  return {
    position: {
      x: position.x + tank.width / 2,
      y: position.y + tank.height / 2,
    },
    direction,
    explosionStep: 0,
  }
}

const bulletStep = step(updatePosition(-radius, -radius, -radius, -radius))

export function moveBullet(speed = 10) {
  return (bullet: Bullet): Bullet => {
    return {
      ...bullet,
      position: bulletStep(bullet.position, bullet.direction, speed),
    }
  }
}

export function isVisibleBullet(bullet: Bullet): boolean {
  const diameter = radius * 2
  const horizontalInStage = bullet.position.x > diameter && bullet.position.x < field.width - diameter
  const verticalInStage = bullet.position.y > diameter && bullet.position.y < field.height - diameter
  return horizontalInStage && verticalInStage
}

export function isBulletInWall(bullet: Bullet, walls: Wall[]): boolean {
  return isPositionInWall(
    bullet.position,
    { top: radius, left: radius, right: radius, bottom: radius },
    walls,
  )
}

// explosion

export const maxExplosionStep = 5

export function isBlowingUpBullet(bullet: Bullet): boolean {
  return bullet.explosionStep > 0
}

export function isBlowedUpBullet(bullet: Bullet): boolean {
  return bullet.explosionStep >= maxExplosionStep
}

export function blowUpBullet(walls: Wall[]) {
  return (bullet: Bullet): Bullet => {
    return isBlowingUpBullet(bullet) || !isVisibleBullet(bullet) || isBulletInWall(bullet, walls)
      ? { ...bullet, explosionStep: bullet.explosionStep + 1 }
      : bullet
  }
}
