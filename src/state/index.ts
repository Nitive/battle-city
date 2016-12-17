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

export function intent({ keys }: Sources): Stream<Action> {
  const direction$ = xs
    .combine(
      keys.press(KeyCode.Up).startWith(false),
      keys.press(KeyCode.Down).startWith(false),
      keys.press(KeyCode.Left).startWith(false),
      keys.press(KeyCode.Right).startWith(false),
    )
    .fold(
      (directionStack: Direction[], [up, down, left, right]) => {
        if (up) {
          directionStack = [Direction.Up, ...directionStack]
        } else {
          directionStack = directionStack.filter(dir => dir !== Direction.Up)
        }
        if (down) {
          directionStack = [Direction.Down, ...directionStack]
        } else {
          directionStack = directionStack.filter(dir => dir !== Direction.Down)
        }
        if (left) {
          directionStack = [Direction.Left, ...directionStack]
        } else {
          directionStack = directionStack.filter(dir => dir !== Direction.Left)
        }
        if (right) {
          directionStack = [Direction.Right, ...directionStack]
        } else {
          directionStack = directionStack.filter(dir => dir !== Direction.Right)
        }
        return directionStack
      },
      [],
    )
    .map(x => x[0])
    .map(actions.changeDirection)

  const bullet$ = keys.down(KeyCode.Space).mapTo(actions.fireBullet())

  const time$ = xs.periodic(50).mapTo(actions.tick())
  return xs.merge(direction$, time$, bullet$)
}

export function model(action$: Stream<Action>): Stream<State> {
  return action$.fold(reducer, initialState)
}
