import xs, { Stream } from 'xstream'
import { pipe } from 'ramda'

import { Direction } from './utils/direction'
import { KeyCode } from '../utils/keys-driver'

import { Sources } from '..'

import * as actions from './actions'

function updateDirectionStack(direction: Direction, state: boolean) {
  return (directionStack: Direction[]): Direction[] => {
    return state
      ? [direction, ...directionStack]
      : directionStack.filter(dir => dir !== direction)
  }
}

function reduceDirectionStack(directionStack: Direction[], [up, down, left, right]: boolean[]) {
  return pipe(
    updateDirectionStack(Direction.Up, up),
    updateDirectionStack(Direction.Down, down),
    updateDirectionStack(Direction.Left, left),
    updateDirectionStack(Direction.Right, right),
  )(directionStack)
}

export function intent({ keys }: Sources): Stream<actions.Action> {
  const direction$ = xs
    .combine(
      keys.press(KeyCode.Up).startWith(false),
      keys.press(KeyCode.Down).startWith(false),
      keys.press(KeyCode.Left).startWith(false),
      keys.press(KeyCode.Right).startWith(false),
    )
    .fold(reduceDirectionStack, [])
    .map(directions => directions[0])
    .map(actions.changeDirection)

  const bullet$ = keys.down(KeyCode.Space).mapTo(actions.fireBullet())

  const time$ = xs.periodic(50).mapTo(actions.tick())
  return xs.merge(direction$, time$, bullet$)
}
