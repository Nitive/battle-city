import xs, { Stream } from 'xstream'

import { Position } from './utils/position'
import { Direction } from './utils/direction'
import { Bullet } from './utils/bullet'
import { KeyCode } from '../utils/keys-driver'

import { Sources } from '..'

import reducer from './reducer'
import * as actions from './actions'
import { Action } from './actions'

export type State = {
  position: Position,
  bullets: Bullet[],
  direction?: Direction,
  lastDirection?: Direction,
}

const initialState: State = {
  position: { x: 0, y: 0 },
  bullets: [],
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

  const bullet$ = keys.down(KeyCode.Space).mapTo(actions.fireBullet())

  const time$ = xs.periodic(50).mapTo(actions.tick())
  return xs.merge(direction$, time$, bullet$)
}

export function model(action$: Stream<Action>): Stream<State> {
  return action$.fold(reducer, initialState)
}
