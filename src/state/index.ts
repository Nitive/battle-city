import { Stream } from 'xstream'

import { Position } from './utils/position'
import { Direction } from './utils/direction'
import { Bullet } from './utils/bullet'
import { Wall } from './utils/wall'

import reducer from './reducer'
import { Action } from './actions'

const walls: Wall[] = [{
  position: { x: 500, y: 200 },
  size: { width: 50, height: 200 },
}]

export type State = {
  readonly position: Position,
  readonly bullets: Bullet[],
  readonly lastDirection: Direction,
  readonly direction?: Direction,
  readonly walls: Wall[],
}

const initialState: State = {
  position: { x: 0, y: 0 },
  bullets: [],
  lastDirection: Direction.Right,
  walls,
}

export function model(action$: Stream<Action>): Stream<State> {
  return action$.fold(reducer, initialState)
}
