import { Stream } from 'xstream'

import { Position } from './utils/position'
import { Direction } from './utils/direction'
import { Bullet } from './utils/bullet'

import reducer from './reducer'
import { Action } from './actions'

export type State = {
  readonly position: Position,
  readonly bullets: Bullet[],
  readonly lastDirection: Direction,
  readonly direction?: Direction,
}

const initialState: State = {
  position: { x: 0, y: 0 },
  bullets: [],
  lastDirection: Direction.Right,
}

export function model(action$: Stream<Action>): Stream<State> {
  return action$.fold(reducer, initialState)
}
