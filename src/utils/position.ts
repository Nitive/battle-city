import { clamp } from 'ramda'

export type Position = {
  x: number;
  y: number;
}

export const updatePosition = (position: Position, diff: Position) => ({
  x: clamp(0, 800, position.x + diff.x),
  y: clamp(0, 600, position.y + diff.y),
})
