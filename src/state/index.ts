import xs, { Stream } from 'xstream'

import { Position } from '../state/utils/position'
import { Direction } from '../state/utils/direction'
import { KeyCode } from '../utils/keys-driver'

import { Sources } from '..'

import reducer from './reducer'
import * as actions from './actions'
import { Action } from './actions'

export type State = {
  position: Position,
  direction?: Direction,
  lastDirection?: Direction,
}

const startPosition: Position = { x: 0, y: 0 }
const initialState: State = {
  position: startPosition,
}

export function intent({ keys }: Sources): Stream<Action> {
  const direction$ = xs
    .merge(
      keys.down(KeyCode.Up).mapTo(Direction.Up),
      keys.down(KeyCode.Down).mapTo(Direction.Down),
      keys.down(KeyCode.Left).mapTo(Direction.Left),
      keys.down(KeyCode.Right).mapTo(Direction.Right),
      keys.up(KeyCode.Up).mapTo(undefined),
      keys.up(KeyCode.Down).mapTo(undefined),
      keys.up(KeyCode.Left).mapTo(undefined),
      keys.up(KeyCode.Right).mapTo(undefined),
    )
    .map(actions.changeDirection)

  const time$ = xs.periodic(50).mapTo(actions.tick())
  return xs.merge(direction$, time$)
}

export function model(action$: Stream<Action>): Stream<State> {
  return action$.fold(reducer, initialState)
}
