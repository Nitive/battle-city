import { clamp } from 'ramda'

export interface Position {
  x: number
  y: number
}

export const enum Direction { Up, Down, Left, Right }

export function updatePosition(position: Position, diff: Position): Position {
  return {
    x: clamp(0, 800, position.x + diff.x),
    y: clamp(0, 600, position.y + diff.y),
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
