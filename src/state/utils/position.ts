import { clamp } from 'ramda'

import { Direction } from './direction'
import { Offsets } from './offsets'
import { Wall } from './wall'
import * as field from '../../view/components/field'

export interface Position {
  x: number,
  y: number,
}

export function updatePosition(objWidth = 0, objHeight = 0, minX = 0, minY = 0) {
  return (position: Position, diff: Position): Position => {
    const maxX = field.width - objWidth
    const maxY = field.height - objHeight
    return {
      x: clamp(minX, maxX, position.x + diff.x),
      y: clamp(minY, maxY, position.y + diff.y),
    }
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

export function step(update: (position: Position, diff: Position) => Position) {
  return (position: Position, direction: Direction, speed = 1): Position => {
    return update(position, getDiffByDirection(direction, speed))
  }
}

export function isPositionInWall(position: Position, offsets: Offsets, walls: Wall[]): boolean {
  return walls.some(wall => {
    const isHorizontalIn
      = position.x + offsets.right >= wall.position.x
     && position.x - offsets.left <= wall.position.x + wall.size.width
    const isVerticalIn
      = position.y + offsets.bottom >= wall.position.y
     && position.y - offsets.top <= wall.position.y + wall.size.height
    return isHorizontalIn && isVerticalIn
  })
}