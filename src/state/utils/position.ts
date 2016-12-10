import { clamp } from 'ramda'

import { Direction } from './direction'
import * as field from '../../view/components/field'
import * as tank from '../../view/components/tank'

export type Position = {
  x: number,
  y: number,
}

export function updatePosition(position: Position, diff: Position): Position {
  const maxX = field.width - tank.width
  const maxY = field.height - tank.height
  return {
    x: clamp(0, maxX, position.x + diff.x),
    y: clamp(0, maxY, position.y + diff.y),
  }
}

const diffs: { [key: number]: Position } = {
  [Direction.Up]: { x: 0, y: -1 },
  [Direction.Down]: { x: 0, y: 1 },
  [Direction.Left]: { x: -1, y: 0 },
  [Direction.Right]: { x: 1, y: 0 },
}

export function getDiffByDirection(direction: Direction, speed: number = 1): Position {
  const diff = diffs[direction]
  return {
    x: diff.x * speed,
    y: diff.y * speed,
  }
}

export function step(position: Position, direction: Direction, speed: number = 1): Position {
  return updatePosition(position, getDiffByDirection(direction, speed))
}
