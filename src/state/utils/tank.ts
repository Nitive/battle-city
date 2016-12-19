import { Position, isPositionInWall, step, updatePosition } from './position'
import { Direction } from './direction'
import { Wall } from './wall'
import { width, height } from '../../view/components/tank'

export interface Tank {
  position: Position,
  lastDirection: Direction,
  direction?: Direction,
}

export function isTankInWall(position: Position, walls: Wall[]): boolean {
  return isPositionInWall(
    position,
    { top: 0, left: 0, right: width, bottom: height },
    walls,
  )
}

export const tankStep = step(updatePosition(width, height))
