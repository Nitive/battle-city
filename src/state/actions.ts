import { Direction } from './utils/direction'

type ChangeDirection
  = { type: 'ChangeDirection', direction?: Direction }

export function changeDirection(direction: Direction): ChangeDirection {
  return {
    type: 'ChangeDirection',
    direction,
  }
}

type Tick
  = { type: 'Tick' }

export function tick(): Tick {
  return { type: 'Tick' }
}

type FireBullet
 = { type: 'FireBullet' }

export function fireBullet(): FireBullet {
  return { type: 'FireBullet' }
}

export type Action
  = ChangeDirection
  | Tick
  | FireBullet
